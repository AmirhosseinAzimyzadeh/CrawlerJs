const { parse } = require('node-html-parser');
const { linkNormalizer } = require('./linkNormalizer');
const { logger, logTypes } = require('../../utils/logger');
const { fileWriter } = require('../../services/writer/fileWriter');
const { config } = require('../../config/config');

/**
 * @param {string} body
 * @param {string} baseUrl
 * @return {Array<string>} array of valid urls
*/
function parser(body, baseUrl) {

    logger(`parsing [${baseUrl}] ...`, logTypes.LOAD);

    const result = [];
    const root = parse(body);
    const anchorTags = root.querySelectorAll('a');

    if (config.SAVE_TO_REPO) {
        let title = root.querySelector('title');
        if (!title || title === '') title = baseUrl;
        else title = title.innerText;
        fileWriter(body, title);
    }



    anchorTags.forEach((a) => {
        if (a.rawAttributes.href) {
            const normalizedUrl = linkNormalizer(a.getAttribute('href'), baseUrl);
            if (normalizedUrl !== undefined && normalizedUrl !== '') result.push(normalizedUrl);
        }
    });

    logger(`[${baseUrl}] parsed successfully`, logTypes.LOAD);

    return result;
}

module.exports.parser = parser;
