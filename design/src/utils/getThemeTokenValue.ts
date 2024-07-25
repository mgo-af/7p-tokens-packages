export const getThemeTokenValue = (token: string) => {
    return getComputedStyle(document.body).getPropertyValue(token.replace("var(", "").replace(")", ""));
};
