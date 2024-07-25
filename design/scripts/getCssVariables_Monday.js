function isSameDomain(styleSheet) {
    if (!styleSheet.href) {
        return true;
    }

    const origin = window.location.origin;

    return styleSheet.href.indexOf(origin) === 0;
}

function isStyleRule(rule) {
    return rule.type === 1;
}

function getCSSVariableNames() {
    const cssRules = [...document.styleSheets]
        .filter(isSameDomain)
        .reduce((cssRules, styleSheet) => {
            return cssRules.concat([...styleSheet.cssRules]);
        }, []);
    const styles = cssRules
        .filter(isStyleRule)
        .reduce((styles, cssRule) => {
            return styles.concat([...cssRule.style]);
        }, []);
    const variables = styles
        .map(propName => propName.trim())
        .filter(propName => propName.startsWith('--'));

    return Array.from(new Set(variables));
}

function getPropertyType(variableName, tokenTypeMap) {
    const keys = Object.keys(tokenTypeMap);
    for (const key of keys) {
        if (variableName.includes(key)) {
            return tokenTypeMap[key];
        }
    }
    return null;
}

function getTypographyVariable(match) {
    const [_, fontWeight, fontSize, lineHeight, fontFamily] = match;
    return {
        "fontFamily": fontFamily,
        "fontWeight": fontWeight,
        "lineHeight": lineHeight,
        "fontSize": fontSize
    };
}

function getBoxShadowVariable(match) {
    const [_, shadowType, x, y, blur, spread, color] = match;
    const defaultValue = "0px";
    return {
        "x": x || defaultValue,
        "y": y || defaultValue,
        "blur": blur || defaultValue,
        "spread": spread || defaultValue,
        "color": color,
        "type": shadowType === "inset" ? "innerShadow" : "dropShadow"
    };
}

function getCssVariablesAsJson() {
    const cssVariables = [];
    const styles = getComputedStyle(document.body);

    const resolveValue = (value) => {
        return value.trim();
    };

    // Monday token map
    const tokenTypeMap = {
        "background-color": "color",
        "font-family": "fontFamilies",
        "font-size": "fontSizes",
        "font-weight": "fontWeights",
        "line-height": "lineHeights",
        "letter-spacing": "letterSpacing",
        "border-width": "borderWidth",
        "border-radius": "borderRadius",
        "color": "color",
        "margin": "spacing",
        "padding": "spacing",
        "box-shadow": "boxShadow",
        "opacity": "opacity",
        "text-shadow": "boxShadow",
        "text-style": "textStyle",
        "spacing": "spacing",
        "border-style": "border",
        "font": "typography",
        "background": "color",
        "transparent": "color"
    };

    for (const property of getCSSVariableNames().filter((cur) => !cur.startsWith("--sb"))) {
        const variableName = property.replace("--", "");
        let variableValue = resolveValue(styles.getPropertyValue(property));
        let type = getPropertyType(variableName, tokenTypeMap);

        if (type === "typography") {
            // e.g. 500 24px / 32px Poppins, Roboto, Rubik, Noto Kufi Arabic, Noto Sans JP, sans-serif
            const regex = /^(\d+)\s+(\d+px)\s*\/\s*(\d+px)\s+([\w\s,-]+)$/;
            const match = variableValue.match(regex);
            if (match) {
                variableValue = getTypographyVariable(match);
            }
        }

        if (type === "boxShadow") {
            // e.g. 0px 6px 20px rgba(0, 0, 0, 0.2)
            const regex = /^(\w*)\s*(-?\d+px)\s*(-?\d+px)\s*(\d+px)\s*(-?\d+px)?\s*(.*)$/;
            const match = variableValue.match(regex);
            if (match) {
                variableValue = getBoxShadowVariable(match);
            }
        }

        cssVariables.push({
            "name": variableName,
            "value": variableValue,
            "type": type,
        });
    }

    return JSON.stringify(cssVariables);
}

const cssVariablesJson = getCssVariablesAsJson();
console.log(cssVariablesJson);
