class Queue {
    constructor() {
        this.data = [];
        this.visitedList = [];
        this.discoveredLinks = 0;
    }

    /**
     * @param {Object} object
     */
    push(object){
        if (this.visitedList.includes(object) || this.data.includes(object) ) {
            return;
        }
        this.discoveredLinks ++;
        this.data.push(object);
    }

    /**
     * @param {Array<Object>} objectArray
     */
    pushAll(objectArray){
        objectArray.forEach(obj => {this.push(obj)});
    }

    isEmpty() {
        return this.data.length === 0;
    }

    pop(){
        if(this.isEmpty()) return undefined;

        const result = this.data[0];
        this.visitedList.push(result);
        this.data = this.data.slice(1);

        return result;
    }

    getNumberOfVisitedLinks() {
        return this.visitedList.length;
    }

    getNumberOfAllLinks() {
        return this.discoveredLinks;
    }
}

module.exports.Queue = Queue;
