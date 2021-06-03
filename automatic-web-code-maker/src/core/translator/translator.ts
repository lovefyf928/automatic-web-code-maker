import {TranslatorConfig} from "./translatorConfig"

// 需要生成什么端的页面
export enum TranslatorType {
    mini, // 小程序
    web, // 网页
    phoneWeb ,// 手机端网页
    ddd
}

export interface TranslatorTypeList {
    name: string
    type: TranslatorType
}






export interface TranslatorCore {
    selectedType: TranslatorType | null // 用户选择的页面类型

    typeList: TranslatorTypeList[] // 所以页面类型的列表

    htmlTemp: string // html的模版字符串

    getTranslatorType(): TranslatorTypeList[] // 获取typelist方法

    selectTranslatorType(type: TranslatorType): void // 选择页面类型的方法

    createCode(translatorConfig: TranslatorConfig): void // 生成代码的方法

    getNowSelectedType(): TranslatorType | null // 获取用户选择的页面类型方法
}

