export function getObjValByKey(findKey: string, dataObj: any): any {
    let findArr = [];
    for (let key in dataObj) {
        if (key === findKey) {
            findArr.push(dataObj[key]);
        }
        if (Object.prototype.toString.call(dataObj[key]) === "[object Object]") {
            let arr = getObjValByKey(findKey, dataObj[key])
            for (let i = 0; i < arr.length; i ++) {
                findArr.push(arr[i]);
            }
        }
    }
    return findArr;
}
