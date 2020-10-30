class WebPage {
    /** @param id {string}
     *  @param url {string}
     * */
    constructor(id, url) {
        this.id = id;
        this.url = url;
        this.links = [];
        this.outLinkCount = 0;
    }

    /**
     * @param linkArray {Array<string>}
     */
    setLinks(linkArray) {
        linkArray.forEach(link => {
            if(!link.includes(this.url)) this.outLinkCount ++;
        });
        this.links.push(...linkArray);
    }

    /**
     * @returns {number}
     */
    getNumberOfOutLinks() {
      return this.outLinkCount;
    }

    getSimpleData() {
        return {
            id: this.id,
            url: this.url,
            outLinkCount: this.outLinkCount,
        }
    }

}

module.exports.WebPage = WebPage;
