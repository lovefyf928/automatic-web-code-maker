interface CacheInterface {
    setValue(key: string, value: any): void
    getValue(key: string): any
    clearCache(): void
}

export class Cache implements CacheInterface{
    constructor() {
        this.initMyCache()
    }
    private cacheSet: any = {}

    private initMyCache() {
        for (let i = 0; i < sessionStorage.length; i ++) {
            // @ts-ignore
            this.cacheSet[sessionStorage.key(i)] = sessionStorage.getItem(sessionStorage.key(i));
        }
    }

    setValue(key: string, value: any): void {
        this.cacheSet[key] = value;
        sessionStorage.setItem(key, value);
    }

    getValue(key: string): any {
        return this.cacheSet[key]
    }

    clearCache() {
        this.cacheSet = {};
        sessionStorage.clear();
    }


}
