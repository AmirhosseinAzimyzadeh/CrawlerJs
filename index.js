const { config } = require('./src/config/config');
const { fetchContent } = require('./src/services/fetcher/fetcher');
const { parser } = require('./src/services/parser/parser');
const { Queue } = require('./src/services/queue/Queue');
const { Log } = require('./src/models/Log');
const { WebPage } = require('./src/models/WebPage');
const { logger, logTypes } = require('./src/utils/logger');
const { getMeanOfURLOutLinkDegree } = require('./src/utils/dataAnalyzer');

async function main() {

    const queue = new Queue();
    const webPages = [];
    let iterations = 0;
    const statusCodes = {};
    queue.pushAll(config.SEEDS);

    const worker = async () => {
        if (queue.isEmpty()) return;

        let linkInQueue = queue.pop();
        try {
            const {body:HTMLContent, statusCode} = await fetchContent(linkInQueue);
            const statusCodeProp = statusCodes[`status_${statusCode}`];
            if (statusCodeProp !== undefined){
                statusCodes[`status_${statusCode}`] = statusCodeProp + 1;
            } else {
                statusCodes[`status_${statusCode}`] = 1;
            }
            if (statusCode === 404) return;
            iterations++;
            const currentWebPage = new WebPage(`${iterations}`, linkInQueue);
            const childLinks = parser(HTMLContent, linkInQueue);
            queue.pushAll(childLinks);
            currentWebPage.setLinks(childLinks);
            webPages.push(currentWebPage);
        } catch {}
        logger(`iterations: ${iterations}`, logTypes.LOAD)
    };

    while (iterations < config.LIMIT) {
        await new Promise(resolve => setTimeout(resolve, config.FETCH_DELAY));
        await worker();
    }


    if (config.SAVE_LOGS) {
        const logFile = new Log();
        logFile.addContent(JSON.stringify({
            visitedLinks: queue.getNumberOfVisitedLinks(),
            discovered: queue.getNumberOfAllLinks(),
            statusCodes,
            ...getMeanOfURLOutLinkDegree(webPages),
            webPages: webPages.map(webPage => webPage.getSimpleData()),
        }));
        logFile.close();
    }
}
main().then(() => {});
