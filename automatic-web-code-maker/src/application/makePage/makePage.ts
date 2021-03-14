import {TranslatorType, TranslatorTypeList} from "@/core/translator";
import {TranslatorService} from "@/service/translatorService/translatorService";
import {Cache} from "@/infrastructure/cache/cache";


interface MakePageAppInterface {
    setSelectedType(typeObj: TranslatorTypeList): void
    translatorService: TranslatorService
    cache: Cache
    context: Vue
    getSelectedType(): TranslatorType | null
}

export class MakePageApplication implements MakePageAppInterface{
    constructor(context: Vue) {
        this.context = context;
    }
    translatorService: TranslatorService = new TranslatorService();
    cache: Cache = new Cache();
    context: Vue

    setSelectedType() {
        if (this.context.$route.params.type !== undefined) {
            this.cache.setValue("t_t", this.context.$route.params.type);
            this.translatorService.selectTranslatorType(<TranslatorType><unknown>this.context.$route.params.type)
        }
        else if (this.cache.getValue("t_t") !== undefined) {
            this.translatorService.selectTranslatorType(this.cache.getValue("t_t"))
        }
        else {
            this.context.$router.push({name: "Index"})
        }
    }

    getSelectedType(): TranslatorType | null {
        return this.translatorService.getNowSelectedType()
    }

}

