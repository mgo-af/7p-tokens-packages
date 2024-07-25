/**
 * @description Default font sizes, font weights and line heights are added to the list of CSS variables. That's
 * because they are not defined in the CSS variables of the Atlassian Design System. The only way to get them is to
 * change typography variable inside debugger on their page. So we decided to copy them and hardcode with fallback
 * @author Illia Mishkin
 */

function getDefaultFontSizes() {
    return [
        {
            name: "ds-font-size-050",
            type: "fontSizes",
            value: "0.6875rem"
        },
        {
            name: "ds-font-size-075",
            type: "fontSizes",
            value: "0.75rem"
        },
        {
            name: "ds-font-size-100",
            type: "fontSizes",
            value: "0.875rem"
        },
        {
            name: "ds-font-size-200",
            type: "fontSizes",
            value: "1rem"
        },
        {
            name: "ds-font-size-300",
            type: "fontSizes",
            value: "1.25rem"
        },
        {
            name: "ds-font-size-400",
            type: "fontSizes",
            value: "1.5rem"
        },
        {
            name: "ds-font-size-500",
            type: "fontSizes",
            value: "1.8125rem"
        },
        {
            name: "ds-font-size-600",
            type: "fontSizes",
            value: "2.1875rem"
        }
    ];
}

function getDefaultFontWeights() {
    return [
        {
            name: "ds-font-weight-regular",
            type: "fontWeights",
            value: "400"
        },
        {
            name: "ds-font-weight-medium",
            type: "fontWeights",
            value: "500"
        },
        {
            name: "ds-font-weight-semibold",
            type: "fontWeights",
            value: "600"
        },
        {
            name: "ds-font-weight-bold",
            type: "fontWeights",
            value: "700"
        }
    ];
}

function getDefaultLineHeights() {
    return [
        {
            name: "ds-font-lineHeight-1",
            type: "lineHeights",
            value: "1"
        },
        {
            name: "ds-font-lineHeight-100",
            type: "lineHeights",
            value: "1rem"
        },
        {
            name: "ds-font-lineHeight-200",
            type: "lineHeights",
            value: "1.25rem"
        },
        {
            name: "ds-font-lineHeight-300",
            type: "lineHeights",
            value: "1.5rem"
        },
        {
            name: "ds-font-lineHeight-400",
            type: "lineHeights",
            value: "1.75rem"
        },
        {
            name: "ds-font-lineHeight-500",
            type: "lineHeights",
            value: "2rem"
        },
        {
            name: "ds-font-lineHeight-600",
            type: "lineHeights",
            value: "2.5rem"
        }
    ];
}

function getOverriddenFontFamilies() {
    return [
        {
            name: "ds-font-family-body",
            type: "fontFamilies",
            // @Illia SF Pro only used inside figma. In application Atlassian automatically detects apple fonts
            value: "\"SF Pro\", ui-sans-serif, \"Segoe UI\", Ubuntu, system-ui, \"Helvetica Neue\", sans-serif"
        },
        {
            name: "ds-font-family-sans",
            type: "fontFamilies",
            // @Illia SF Pro only used inside figma. In application Atlassian automatically detects apple fonts
            value: "\"SF Pro\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", \"Roboto\", \"Oxygen\", \"Ubuntu\", \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif"
        }
    ];
}

function getOverriddenBorderRadius() {
    return [
        {
            name: "ds-border-radius-050",
            type: "borderRadius",
            value: "3px"
        },
        {
            name: "ds-border-radius-100",
            type: "borderRadius",
            value: "4px"
        },
        {
            name: "ds-border-radius-200",
            type: "borderRadius",
            value: "6px"
        },
        {
            name: "ds-border-radius-300",
            type: "borderRadius",
            value: "8px"
        },
        {
            name: "ds-border-radius-400",
            type: "borderRadius",
            value: "16px"
        }
    ];
}

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
        .filter(propName => propName.startsWith("--"));

    return Array.from(new Set(variables));
}

function isVariableColor(variableValue) {
    return variableValue.startsWith("#");
}

function getPropertyType(variableName, variableValue, tokenTypeMap) {
    if (isVariableColor(variableValue)) {
        return "color";
    }

    const keys = Object.keys(tokenTypeMap);

    for (const key of keys) {
        if (variableName.includes(key)) {
            return tokenTypeMap[key];
        }
    }

    return null;
}

function parseShadow(shadowValue) {
    const shadowRegex = /(-?\d+px)\s+(-?\d+px)\s+(-?\d+px)(\s+(-?\d+px))?\s+(#[0-9a-fA-F]{6}(?:[0-9a-fA-F]{2})?)/;
    const match = shadowValue.match(shadowRegex);

    if (!match) {
        return null;
    }

    return {
        offsetX: match[1],
        offsetY: match[2],
        blurRadius: match[3],
        spreadRadius: match[5] || "0px",
        color: match[6]
    };
}

function parseTypographyValue(value) {
    const typographyRegExp = /^(normal|italic|oblique)?\s*(\d+)\s+(\d*\.?\d+\w*)\/(\d*\.?\d+\w*)\s+(.+)$/;
    const match = value.match(typographyRegExp);

    if (!match) {
        return null;
    }

    const lineHeight = match[4].includes("rem")
        ? match[4]
        : match[4].concat("rem");

    return {
        fontStyle: match[1],
        fontWeight: match[2],
        fontSize: match[3],
        lineHeight: lineHeight,
        fontFamily: match[5]
    };
}

function getCssVariablesWithData() {
    const cssVariables = new Map();
    const styles = getComputedStyle(document.body);
    const cssVariableNames = getCSSVariableNames();
    const tokenTypeMap = {
        "shadow": "boxShadow",
        "letterSpacing": "letterSpacing",
        "font-family": "fontFamilies",
        "font-size": "fontSizes",
        "font-weight": "fontWeights",
        "lineHeight": "lineHeights",
        "font": "typography",
        "space": "spacing",
        "border-width": "borderWidth",
        "border-radius": "borderRadius",
        "opacity": "opacity"
    };
    let isFontSizeDefined = false;
    let isFontWeightDefined = false;
    let isLineHeightDefined = false;

    for (const cssVariableName of cssVariableNames) {
        const variableName = cssVariableName.replace("--", "");
        const variableValue = styles.getPropertyValue(cssVariableName).trim();
        const type = getPropertyType(variableName, variableValue, tokenTypeMap);
        let convertedVariableValue = variableValue;

        if (!type) {
            continue;
        }

        if (type === "boxShadow") {
            const individualShadows = variableValue.split(/,\s*/);

            convertedVariableValue = individualShadows
                .map(shadow => parseShadow(shadow))
                .filter(Boolean)
                .map(({ offsetX, offsetY, blurRadius, spreadRadius, color }) => {
                    return {
                        x: offsetX,
                        y: offsetY,
                        blur: blurRadius,
                        spread: spreadRadius,
                        color: color,
                        type: "dropShadow"
                    };
                });
        }

        if (type === "typography") {
            const {
                fontStyle,
                fontWeight,
                fontSize,
                lineHeight,
                fontFamily
            } = parseTypographyValue(variableValue);

            convertedVariableValue = {
                fontStyle: fontStyle,
                fontWeight: fontWeight,
                fontSize: fontSize,
                lineHeight: lineHeight,
                fontFamily: fontFamily
            };
        }

        if (type === "fontSizes") {
            isFontSizeDefined = true;
        }

        if (type === "fontWeights") {
            isFontWeightDefined = true;
        }

        if (type === "lineHeights") {
            isLineHeightDefined = true;
        }

        cssVariables.set(
            variableName,
            {
                name: variableName,
                value: convertedVariableValue,
                type: type
            }
        );
    }

    if (!isFontSizeDefined) {
        for (const defaultFontSize of getDefaultFontSizes()) {
            cssVariables.set(defaultFontSize.name, defaultFontSize);
        }
    }

    if (!isFontWeightDefined) {
        for (const defaultFontWeight of getDefaultFontWeights()) {
            cssVariables.set(defaultFontWeight.name, defaultFontWeight);
        }
    }

    if (!isLineHeightDefined) {
        for (const defaultLineHeight of getDefaultLineHeights()) {
            cssVariables.set(defaultLineHeight.name, defaultLineHeight);
        }
    }

    for (const defaultRestToken of [...getOverriddenFontFamilies(), ...getOverriddenBorderRadius()]) {
        cssVariables.set(defaultRestToken.name, defaultRestToken);
    }

    return Array.from(cssVariables.values());
}

const cssVariablesWithData = getCssVariablesWithData();
console.log(JSON.stringify(cssVariablesWithData));
