import {TranslatorConfig} from "./translatorConfig"

export interface TranslatorCore {
    createCode(translatorConfig: TranslatorConfig): void
    codeName: string
}


