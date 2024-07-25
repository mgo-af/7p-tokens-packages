/**
 * Use this script to retrieve all css variables from app.7pace.com css in browser console
 * Doesn't work in Chrome due to https://bugs.chromium.org/p/chromium/issues/detail?id=949807
 */

function getCssVariablesAsJson() {
    const cssVariables = [];
    const styles = getComputedStyle(document.body);

    for (const property of styles.filter((cur) => cur.startsWith("--"))) {
        const variableName = property.replace("--", "");
        const variableValue = styles.getPropertyValue(property).trim();

        // skip icons
        if (variableValue.includes("url") || variableName.includes("gh-") || !variableName.includes("tt-palette")) {
            continue;
        }

        cssVariables.push({
            "name": variableName,
            "value": variableValue,
            "type": "color"
        });
    }

    return JSON.stringify(cssVariables.sort(function (a, b) {
        const textA = a.name.toUpperCase();
        const textB = b.name.toUpperCase();
        if (textA < textB) {
            return -1;
        }

        return Number(textA > textB);
    }));
}

const cssVariablesJson = getCssVariablesAsJson();
console.log(cssVariablesJson);
