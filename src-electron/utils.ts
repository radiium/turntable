

// Sanitize string
export function sanitize(input, replacement) {
    const illegalRe = /[\/\?<>\\:\*\|":]/g;
    const controlRe = /[\x00-\x1f\x80-\x9f]/g;
    const reservedRe = /^\.+$/;
    const windowsReservedRe = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i;
    const windowsTrailingRe = /[\. ]+$/;

    const sanitized = input
        .replace(illegalRe, replacement)
        .replace(controlRe, replacement)
        .replace(reservedRe, replacement)
        .replace(windowsReservedRe, replacement)
        .replace(windowsTrailingRe, replacement);
    return sanitized;
}


// Try to parse json data
export function resolveData(jsonStr) {
    let data = {};
    if (jsonStr) {
        if (typeof jsonStr === 'string') {
            try {
                data = JSON.parse(jsonStr);
            } catch (error) {
                console.error(error);
            }
        } else if (typeof jsonStr === 'object') {
            data = jsonStr;
        }
    }
    return data;
}
