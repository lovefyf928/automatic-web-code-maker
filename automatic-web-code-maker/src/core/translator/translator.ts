import {TranslatorConfig} from "./translatorConfig"

export enum TranslatorType {
    mini,
    web,
    phoneWeb
}

export interface TranslatorTypeList {
    name: string
    type: TranslatorType
}


export interface TranslatorCore {
    selectedType: TranslatorType | null

    typeList: TranslatorTypeList[]

    htmlTemp: string

    getTranslatorType(): TranslatorTypeList[]

    selectTranslatorType(type: TranslatorType): void

    createCode(translatorConfig: TranslatorConfig): void

    getNowSelectedType(): TranslatorType | null
}

