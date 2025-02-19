// eslint-disable-next-line no-undef
const fs = require("fs");


const getAutogeneratedNote = () => {
    return `
/**
 * This file is autogenerated, do not modify directly
 * Generated on ${new Date(Date.now()).toString()} 
*/\n\n/* eslint-disable @7pace/rules/no-hard-coded-colors, @7pace/rules/no-non-system-product-color-values */\n`;
};

const kebabize = (str) => str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? "-" : "") + $.toLowerCase());
const get7pCssVarName = (baseName) => `--7p-${kebabize(baseName)}`;
const get7pCssVar = (varName) => `var(${get7pCssVarName(varName)})`;


const createThemeTsFile = (baseJsonFileName) => {
    const prepareJson = (obj = {}, extraKey = "") => {
        for (const key in obj) {
            if (obj[key]["type"] !== undefined) {
                obj[key] = get7pCssVar(`${extraKey}-${key}`);
            } else {
                prepareJson(obj[key], `${extraKey}${extraKey && "-"}${key}`);
            }
        }
        return obj;
    };

    // Read the input JSON file
    const input = JSON.parse(fs.readFileSync(`./tokens/${baseJsonFileName}`));
    const preparedJson = prepareJson(input);

    let output = getAutogeneratedNote();
    output += `const theme = ${JSON.stringify(preparedJson)};\n`;
    output += "export type Theme = typeof theme;\n";
    output += "export default theme;\n";

    fs.writeFileSync("src/autogen/theme/theme.ts", output);
};

const createThemesEnumFile = (themes) => {
    let output = getAutogeneratedNote();
    output += "enum ThemeSystem {\n";
    themes.forEach(x => {
        output += `\t${x} = "${x.toLowerCase()}",\n`;
    });
    output += "}\n";
    output += "export default ThemeSystem;\n";

    fs.writeFileSync("src/autogen/theme/ThemeSystem.ts", output);
};

const createSystemCssFile = (themedJsonFileName, referenceJsonFileName) => {
    let referenceJson = {};

    const toPx = (numberStr) => numberStr?.includes("px") ? numberStr : `${numberStr}px`;

    const unfoldValue = (value) => {
        // Tokens Studio reference to another token
        if (value.includes("{")) {
            const tokenName = value.replace("{", "").replace("}", "");
            if (value.includes(".")) {
                // Tokens Studio reference to another token in the same set
                return get7pCssVar(tokenName.replaceAll(".", "-"));
            }

            const referenceValue = referenceJson[tokenName];
            if (referenceValue?.attributes?.rawColor === "rgb") {
                // Tokens Studio reference to another token in another set,
                // but token is known to contain raw value
                return `rgba(var(--${tokenName}), 1)`;
            }

            // Tokens Studio reference to another token in another set
            return `var(--${tokenName})`;
        }

        // Raw value
        return value;
    };

    const createBoxShadow = (boxShadowProps) => {
        if (Array.isArray(boxShadowProps)) {
            return boxShadowProps.map(createBoxShadow).join(", ");
        }

        const {
            x,
            y,
            blur,
            spread,
            color,
            type
        } = boxShadowProps;

        const shadowType = type === "innerShadow" ? "inset " : "";
        return `${shadowType}${toPx(x)} ${toPx(y)} ${toPx(blur)} ${toPx(spread)} ${unfoldValue(color)}`;
    };

    const handleBoxShadowValue = (value) => {
        try {
            if (typeof value === "string") {
                return handleCommonValue(value);
            }

            if (Array.isArray(value)) {
                return value.map(createBoxShadow).join(", ");
            }

            return createBoxShadow(value);
        }
        catch (e) {
            console.log(value, Array.isArray(value));
        }
    };

    const handleTypographyValue = (value) => {
        if (typeof value === "string") {
            return handleCommonValue(value);
        }

        const {
            fontFamily,
            fontWeight,
            lineHeight,
            fontSize,
        } = value;

        return `${unfoldValue(fontWeight)} ${unfoldValue(fontSize)}/${unfoldValue(lineHeight)} ${unfoldValue(fontFamily)}`;
    };

    const handleCommonValue = (value) => unfoldValue(value);

    const handleValue = (type, value) => {
        switch (type) {
            case "typography":
                return handleTypographyValue(value);
            case "boxShadow":
                return handleBoxShadowValue(value);
            default:
                return handleCommonValue(value);
        }
    };

    const flattenJSON = (obj = {}, res = {}, extraKey = "") => {
        for (const key in obj) {
            if (obj[key]["type"] !== undefined) {
                const value = handleValue(obj[key]["type"], obj[key]["value"]);
                res[`${extraKey}-${kebabize(key)}`] = value;
            } else {
                flattenJSON(obj[key], res, `${extraKey}${extraKey && "-"}${kebabize(key)}`);
            }
        }
        return res;
    };

    const convertToCssVars = (obj = {}) => {
        let res = "";
        for (const key in obj) {
            res += `\t${get7pCssVarName(key)}: ${obj[key]};\n`;
        }
        return res;
    };

    const themeJson = JSON.parse(fs.readFileSync(`./tokens/${themedJsonFileName}`));
    referenceJson = JSON.parse(fs.readFileSync(`./tokens/${referenceJsonFileName}`));

    const flattenedJSON = flattenJSON(themeJson);
    const cssVars = convertToCssVars(flattenedJSON);

    let output = getAutogeneratedNote();
    output += "body {\n";
    output += `${cssVars}`;
    output += "}\n";

    fs.writeFileSync(`src/autogen/themes/${themedJsonFileName.toLowerCase().replace(".json", ".css")}`, output);
};

fs.readdir("tokens", (err, files) => {
    let themes = [];
    files.forEach(file => {
        if (file === "7pace-Base.json") {
            createThemeTsFile(file);
        } else if (file.startsWith("7pace-")) {
            const themeSystem = file.split("-")[1].split(".")[0];
            themes.push(themeSystem);
            const referenceThemeFile = files.find(x => x.toLocaleLowerCase().startsWith(themeSystem.toLocaleLowerCase()));
            createSystemCssFile(file, referenceThemeFile);
        }
    });

    createThemesEnumFile(themes);
});
