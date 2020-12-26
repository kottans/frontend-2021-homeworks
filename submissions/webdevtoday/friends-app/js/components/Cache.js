export default class {
    constructor() {
        this.cache = {};
    }
    set(k, v) {
        this.cache[k] = v;
    }
    check(k) {
        if (k in this.cache) return true;
        else false;
    }
    get(k) {
        if (!this.cache[k]) return false;
        return this.cache[k];
    }
}