/**
 * @param {string} url
 * @param {string} baseUrl
 *
 * @return {string} normalized url
 */
function linkNormalizer(url, baseUrl) {
    if (!url || !baseUrl) return '';

    // ignore inPage links and picture
    if(
        url === '#'
        || url === '/'
        || url.startsWith('#')
        || url.startsWith('?')
        || url.includes('.png')
        || url.includes('.jpg')
        || url.includes('.gif')
        || url.includes('.jpeg')
    ) return '';

    if(url.startsWith('//')) return `http://${url.slice(2)}`;


    // normalize relative urls
    if(url.startsWith('/')) return `${baseUrl}${url}`;


    // url already normalized
    return url;
}

module.exports.linkNormalizer = linkNormalizer;
