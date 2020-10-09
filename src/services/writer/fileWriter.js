const fs = require('fs');
const { logger, logTypes } = require('../../utils/logger');

/**
 * @param {string} body html content
 * @param {string} title name of file
 */
function fileWriter(body, title) {
    //normalaize title
    // const normalizedTitle = title.replace(/\s/g, '_').replace(/\:/g, '');
    const normalizedTitle = String(new Date().getTime());
    let path = `./repository/${normalizedTitle}.html`;
    logger(`trying to save ${normalizedTitle}.html ...`, logTypes.LOAD);

    if (fs.existsSync(path)) {
        const date = new Date();
        path = `./repository/${normalizedTitle}${date.getTime()}.html`
    }

    fs.appendFile(path, body, function (err) {
        if (err) {
            logger(`can't save this file:[${normalizedTitle}.html]`, logTypes.ERROR);
        } else {
            logger(`file saved successfully`, logTypes.SUCCESS);
        }
    });
}

module.exports.fileWriter = fileWriter;