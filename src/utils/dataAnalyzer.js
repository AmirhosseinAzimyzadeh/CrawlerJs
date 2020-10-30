/**
 * @param webPages {Array<WebPage>}
 * @return {{
 * outDegreeMean: number,
 * URLMean: number,
 * maxOutDegree: number,
 * minOutDegree: number,
 * }}
 * */
function getMeanOfURLOutLinkDegree(webPages) {
    let sumOfURL = 0;
    let sumOfOutDegree = 0;
    let maxOutDegree = -1;
    let minOutDegree = Infinity;

    webPages.forEach(webPage => {
       sumOfURL += webPage.url.length * 2;
       const outLikDegree = webPage.getNumberOfOutLinks();

       if (outLikDegree > maxOutDegree)
           maxOutDegree = outLikDegree;
       if (outLikDegree < minOutDegree)
           minOutDegree = outLikDegree;

       sumOfOutDegree += outLikDegree;
    });

    return {
        outDegreeMean: sumOfOutDegree/webPages.length,
        URLMean: sumOfURL/webPages.length,
        minOutDegree,
        maxOutDegree,
    }
}

module.exports.getMeanOfURLOutLinkDegree = getMeanOfURLOutLinkDegree;
