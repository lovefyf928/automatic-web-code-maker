import {TranslatorCore, TranslatorConfig} from "@/core/translator/index"


export class TranslatorService implements TranslatorCore{
    constructor(codeName: string) {
        this.codeName = codeName;
    }
    codeName: string

    createCode(translatorConfig: TranslatorConfig) {
        console.log(translatorConfig.context);
    }
}
