const request = require('request');
const { config } = require('../../config/config');
const { logger, logTypes } = require('../../utils/logger');

/** @param {string} url */
function fetchContent(url) {
    return new Promise((resolve, reject) => {
        logger(`fetching [${url}] ...`, logTypes.LOAD);
        const options = {url, headers: { "User-Agent": config.USER_AGENT }};

        request(options, function (error, response, body) {
            if (error) {
                logger(`CAN'T FETCH [${url}] !!`, logTypes.ERROR);
                reject();
                return;
            }
            if (!error) logger(`[${url}] has been fetched successfully`, logTypes.SUCCESS);
            logger(`statusCode: ${response && response.statusCode}`);
            resolve(body);
        });
    });
}

module.exports.fetchContent = fetchContent;