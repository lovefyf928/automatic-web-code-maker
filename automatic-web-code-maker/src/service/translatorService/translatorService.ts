import {TranslatorConfig, TranslatorCore, TranslatorType, TranslatorTypeList} from "@/core/translator/index"


export class TranslatorService implements TranslatorCore{
    createCode(translatorConfig: TranslatorConfig): void {
        console.log(translatorConfig.context);
    }
    selectedType: TranslatorType | null = null

    typeList: TranslatorTypeList[] = [{name: "小程序", type: TranslatorType.mini}, {name: "网页", type: TranslatorType.web}, {name: "手机端网页", type: TranslatorType.phoneWeb}]

    getTranslatorType(): TranslatorTypeList[] {
        return this.typeList;
    }

    selectTranslatorType(type: TranslatorType): void {
        this.selectedType = type;
    }

    getNowSelectedType(): TranslatorType | null {
        return this.selectedType
    }
}

