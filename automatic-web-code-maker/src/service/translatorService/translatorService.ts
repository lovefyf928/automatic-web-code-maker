import {TranslatorConfig, TranslatorCore, TranslatorType, TranslatorTypeList} from "@/core/translator/index"


export class TranslatorService implements TranslatorCore{

    selectedType: TranslatorType | null = null

    typeList: TranslatorTypeList[] = [{name: "小程序", type: TranslatorType.mini}, {name: "网页", type: TranslatorType.web}, {name: "手机端网页", type: TranslatorType.phoneWeb}]

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




    createCode(translatorConfig: TranslatorConfig): void {
        this.htmlTemp = "";
        for (let i = 0; i < translatorConfig.elementList.length; i ++) {
            console.log(translatorConfig.elementList[i]);
            this.htmlTemp += translatorConfig.elementList[i].context.$el.outerHTML;
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
</html>`
        let fileSaver = require('file-saver')
        let blob = new Blob([html], {type: "text/plain;charset=utf-8"});
        fileSaver.saveAs(blob, translatorConfig.fileName + ".html");
    }
}

