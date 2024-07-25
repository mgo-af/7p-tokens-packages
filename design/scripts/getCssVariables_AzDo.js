/**
 * Use this script to retrieve all css variables from dev.azure.com css in browser console
 * Doesn't work in Chrome due to https://bugs.chromium.org/p/chromium/issues/detail?id=949807
 */

function getCssVariablesAsJson() {
    const cssVariables = [];
    const styles = getComputedStyle(document.body);

    const resolveValue = (value) => {
        if (!value.includes("rgb") && !value.includes("#")) {
            return {
                value: `rgba(${value.trim()}, 1)`,
                rawColor: "rgb"
            };
        }

        return { value: value.trim() };
    };

    for (const property of styles.filter((cur) => cur.startsWith("--"))) {
        const variableName = property.replace("--", "");
        const { value, rawColor } = resolveValue(styles.getPropertyValue(property));
        const variable = {
            "name": variableName,
            "value": value,
            "type": "color"
        };

        if (rawColor) {
            variable["attributes"] = {
                rawColor
            };
        }

        cssVariables.push(variable);
    }

    return JSON.stringify(cssVariables);
}

const cssVariablesJson = getCssVariablesAsJson();
console.log(cssVariablesJson);
