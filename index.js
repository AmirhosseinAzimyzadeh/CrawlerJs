const { config } = require('./src/config/config');
const { fetchContent } = require('./src/services/fetcher/fetcher');
const { parser } = require('./src/services/parser/parser');
const { Queue } = require('./src/services/queue/Queue');
const { Log } = require('./src/models/Log');
const { WebPage } = require('./src/models/WebPage');

async function main() {

    const queue = new Queue();
    const webPages = [];
    let iterations = 0;
    queue.pushAll(config.SEEDS);

    const worker = async () => {
        if (queue.isEmpty()) return;

        let linkInQueue = queue.pop();
        try {

            const HTMLContent = await fetchContent(linkInQueue);
            iterations++;
            const currentWebPage = new WebPage(iterations, linkInQueue);
            const childLinks = parser(HTMLContent, linkInQueue);
            queue.pushAll(childLinks);
            currentWebPage.setLinks(childLinks);
            webPages.push(currentWebPage);
            linkInQueue = queue.pop();

        } catch {
            linkInQueue = queue.pop();
        }

        console.log(`iterations: ${iterations}`);
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
            webpages: webPages,
         }));
        logFile.close();
    }

    // intervalId = setInterval(worker, config.FETCH_DELAY);
};


main();