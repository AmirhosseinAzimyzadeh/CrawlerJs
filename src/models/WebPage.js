class WebPage {
    /** @param {string} id  */
    /** @param {string} url  */
    constructor(id, url) {
        this.id = id;
        this.url = url;
        this.links = [];
        this.outlinkCount = 0;
    }

    /**
     * @param {Array<string>} linkArray 
     */
    setLinks(linkArray) {
        const links = [];
        linkArray.forEach(link => {
            if(link.includes(this.url)) this.outlinkCount ++;
        });
        this.links.push(...linkArray);
    }

    /**
     * @returns {number}
     */
    getNumberOfOutlinks() {
        this.outlinkCount;
    }

}

module.exports.WebPage = WebPage;