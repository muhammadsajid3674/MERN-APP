function getCookies() {
    const REGEXP = /([\w.]+)\s*=\s*(?:"((?:\\"|[^"])*)"|(.*?))\s*(?:[;,]|$)/g;
    let cookies = {};
    let match;
    while ((match = REGEXP.exec(document.cookie)) !== null) {
        let value = match[2] || match[3];
        cookies[match[1]] = decodeURIComponent(value);
    }
    return cookies;
}

export default getCookies;