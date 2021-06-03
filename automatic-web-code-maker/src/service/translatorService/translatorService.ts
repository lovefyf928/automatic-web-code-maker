import {TranslatorConfig, TranslatorCore, TranslatorType, TranslatorTypeList} from "@/core/translator/index"


export class TranslatorService implements TranslatorCore{

    selectedType: TranslatorType | null = null

    typeList: TranslatorTypeList[] = [{name: "小程序", type: TranslatorType.mini}, {name: "网页", type: TranslatorType.web}, {name: "手机端网页", type: TranslatorType.phoneWeb}, {name: "CINS", type: TranslatorType.ddd}]

    htmlTemp: string = ""


    getTranslatorType(): TranslatorTypeList[] {
        return this.typeList;
    }


    selectTranslatorType(type: TranslatorType): void {
        this.selectedType = type;
    }

    getNowSelectedType(): TranslatorType | null {
        return this.selectedType
    }





    private createRequestStr(requestPath: string, requestMethod: string, requestData: string, codeName: string, renderName: string, renderElementStr: string, fnName: string, fnType: string): string {
        let otherElementStr = "";
        let renderElementArr = renderElementStr.split(",");
        for (let i = 0; i < renderElementArr.length; i ++) {
            otherElementStr += `this["${renderElementArr[i].split(":")[0]}"] = getObjValByKey("${renderElementArr[i].split(":")[1]}", res)[0];`
        }
        let str: string = "";
        if (fnType === "mounted") {
            str = `
            (async () => {
                let res = await request("${requestPath}", "${requestMethod}", ${requestData});
                   if (getObjValByKey("${codeName}", res)[0] === 200) {
                    this["${renderName.split(":")[0]}"] = getObjValByKey("${renderName.split(":")[1]}", res)[0];
                    ${otherElementStr}
                }
                else {
                    console.log("请求失败");
                }
            })()
        `;
        }
        else {
            str = `
              async ${fnName}(){
                let res = await request("${requestPath}", "${requestMethod}", ${requestData});
                   if (getObjValByKey("${codeName}", res)[0] === 200) {
                    this["${renderName.split(":")[0]}"] = getObjValByKey("${renderName.split(":")[1]}", res)[0];
                    ${otherElementStr}
                }
                else {
                    console.log("请求失败");
                }
            },
        `;
        }
        return str
    }


    createCode(translatorConfig: TranslatorConfig): void {
        let dataStr: string = "";
        let methodStr: string = "";
        let mountedMethodStr: string = ""
        let dataArr: string[] = [];
        let methodArr: string[] = [];
        console.log(translatorConfig);
        this.htmlTemp = "";
        for (let i = 0; i < translatorConfig.elementList.length; i ++) {
            console.log(translatorConfig.elementList[i]);
            let nowInnerHtml = translatorConfig.elementList[i].context.$el.innerHTML;
            let spInnerHtmlArr =  nowInnerHtml.split(" ");
            let nowElementHeader = spInnerHtmlArr.shift();
            console.log(nowElementHeader);
            console.log(spInnerHtmlArr);
            for (let j = 0; j < translatorConfig.elementList[i].configObj.att.length; j ++) {
                let nowAtt = translatorConfig.elementList[i].configObj.att[j];
                if (nowAtt.attName !== "") {
                    spInnerHtmlArr.unshift(nowAtt.attType + nowAtt.attName + "=" + "\"" + nowAtt.attVal + "\"");
                }
                if (nowAtt.attType !== "") {
                    dataArr.push(nowAtt.attVal);
                }
            }
            for (let j = 0; j < translatorConfig.elementList[i].configObj.event.length; j ++) {
                let nowEvent = translatorConfig.elementList[i].configObj.event[j];
                if (nowEvent.eventName !== "") {
                    spInnerHtmlArr.unshift(nowEvent.eventType + nowEvent.eventModifier + "=" + "\"" + nowEvent.eventName + "\"");
                    methodArr.push(nowEvent.eventName);
                }
            }
            if (translatorConfig.elementList[i].configObj.requestConfig.callEvent === "click") {
                spInnerHtmlArr.unshift("@click=\"" + ("requestFn" + i) + "\"");
            }
            nowInnerHtml = nowElementHeader + " ";
            for (let j = 0; j < spInnerHtmlArr.length; j ++) {
                if (j === spInnerHtmlArr.length - 1) {
                    nowInnerHtml += spInnerHtmlArr[j];
                }
                else {
                    nowInnerHtml += spInnerHtmlArr[j] + " "
                }
            }
            let matchClose = nowInnerHtml.indexOf("</" + nowElementHeader.split("<")[1] + ">");
            if (matchClose === -1) {
                nowInnerHtml += translatorConfig.elementList[i].configObj.innerText + "</" + nowElementHeader.split("<")[1] + ">";
            }
            else {
                let str = nowInnerHtml.substring(1, matchClose);
                str += translatorConfig.elementList[i].configObj.innerText + "</" + nowElementHeader.split("<")[1] + ">";
                nowInnerHtml = str
            }
            if (translatorConfig.elementList[i].configObj.innerText.indexOf("{{") !== -1) {
                let str = translatorConfig.elementList[i].configObj.innerText.replace("{{", "");
                str = str.replace("}}", "");
                dataArr.push(str)
            }
            console.log(translatorConfig.elementList);
            let reqConfig = translatorConfig.elementList[i].configObj.requestConfig;
            if (reqConfig.callEvent === "mounted") {
                mountedMethodStr += this.createRequestStr(reqConfig.requestPath, reqConfig.requestMethod, reqConfig.requestData, reqConfig.codeName, reqConfig.renderName, reqConfig.renderElementStr, "requestFn" + i, reqConfig.callEvent)
            }
            else if (reqConfig.callEvent === "click") {
                methodStr += this.createRequestStr(reqConfig.requestPath, reqConfig.requestMethod, reqConfig.requestData, reqConfig.codeName, reqConfig.renderName, reqConfig.renderElementStr, "requestFn" + i, reqConfig.callEvent);
            }
            this.htmlTemp += nowInnerHtml;
        }

        for (let i = 0; i < dataArr.length; i ++) {
            dataStr += `${dataArr[i]}: null,`
        }
        for (let i = 0; i < methodArr.length; i ++) {
            methodStr += `${methodArr[i]}() {},`
        }


        let html = `<!DOCTYPE html>
<html style="width: 100%; height: 100%" lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body style="width: 100%; height: 100%">
<div style="width: 100%; height: 100%; position: relative">
${this.htmlTemp}
</div>
</body>
</html>

<script>

function getObjValByKey(findKey, dataObj) {
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



    export default {
        name: "test",
        data() {
            return {
                ${dataStr}
            }
        },
        method: {
            ${methodStr}
        },
        mounted: async function() {
            ${mountedMethodStr}
        }
    }
</script>
`

        let vueStr = `
<template>
    <div style="width: 100%; height: 100%; position: relative">
        ${this.htmlTemp}
    </div>
</template>

<script>
function getObjValByKey(findKey, dataObj) {
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


    export default {
        name: "test",
        data() {
            return {
                ${dataStr}
            }
        },
        method: {
            ${methodStr}
        },
        mounted: async function() {
            ${mountedMethodStr}
        }
    }
</script>


<style>

</style>
        `

        let fileSaver = require('file-saver')
        let blob = new Blob([vueStr], {type: "text/plain;charset=utf-8"});
        fileSaver.saveAs(blob, translatorConfig.fileName + ".vue");
    }
}

