const fs = require('fs');

class Log {
    constructor() {
        this.logs = "";
    }

    addContent(content) {
        this.logs = content;
    }

    addAMessage(message) {
        const date = new Date();
        const dateString = date.toLocaleDateString();
        this.logs = this.logs + '\n' + `[${dateString}]: + ${message}`;
    }

    close() {
        fs.appendFile('./logs/log.json', this.logs, ()=>{});
    }
}

module.exports.Log = Log;