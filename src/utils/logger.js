// log types
const logTypes = {
    LOAD: 'load',
    SUCCESS: 'success',
    ERROR: 'error',
}

const colors = {
    red: '\x1b[31m',
    green: '\x1b[32m',
    blue: '\x1b[34m',
    yellow: '\x1b[33m',
    reset: '\x1b[0m',
}

/**
 * @param {string} message 
 * @param {string} logType 
 * 
 * print logs in diffrent styles
 */
function logger(message, logType) {
    let color = '';
    switch (logType) {
        case logTypes.SUCCESS:
            color = colors.green;
            break;
        case logTypes.ERROR:
            color = colors.red;
            break;
        case logTypes.LOAD:
            color = colors.blue;
            break;
        default:
            color = colors.yellow;
    }


    console.log(color + message + colors.reset);
}

module.exports.logger = logger;
module.exports.logTypes = logTypes;
