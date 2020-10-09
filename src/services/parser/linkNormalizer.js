/**
 * @param {string} url
 * @param {string} baseUrl
 * 
 * @return {string} normalized url
 */
function linkNormalizer(url, baseUrl) {
    if (!url || !baseUrl) return '';
    if(url === '#' || url === '/' || url.startsWith('#') || url.startsWith('?')) return '';
    // check if url is relative
    if(url.startsWith('/')) return `${baseUrl}${url}`;
    // url already normalized
    return url;
}

module.exports.linkNormalizer = linkNormalizer;