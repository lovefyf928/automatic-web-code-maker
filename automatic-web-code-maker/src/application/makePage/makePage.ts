import {TranslatorType, TranslatorTypeList} from "@/core/translator";
import {TranslatorService} from "@/service/translatorService/translatorService";
import {Cache} from "@/infrastructure/cache/cache";
import {
    CustomComponentsConfig,
    CustomComponentsIconInterface
} from "@/infrastructure/customComponents/customComponents";


interface MakePageAppInterface {
    setSelectedType(typeObj: TranslatorTypeList): void
    translatorService: TranslatorService
    cache: Cache
    context: Vue
    getSelectedType(): void
    setComponentAttribut(refs: string, attribute: string, val: any): void

    customComponentsConfig: CustomComponentsConfig


    customComponentsContext: any
}

export class MakePageApplication implements MakePageAppInterface{
    constructor(context: Vue) {
        this.context = context;
    }
    translatorService: TranslatorService = new TranslatorService();
    customComponentsConfig: CustomComponentsConfig = new CustomComponentsConfig();
    cache: Cache = new Cache();
    context: Vue
    customComponentsContext: any = {};

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

    setComponentAttribut(context: any, attribute: string, val: any): void {
        // let nowRefs: any = this.context.$refs[refs]
        // nowRefs.setOptions(attribute, val);
        // context.cc.setOptions(attribute, val);
        let componentCtx =this.customComponentsContext[context]
        componentCtx.cc.setOptions(attribute, val)
    }


    getAllComponentList(): CustomComponentsIconInterface[] {

        return this.customComponentsConfig.getComponentConfig();
    }


    loadComponent(id: number, text: string) {
        this.customComponentsContext[text] = this.customComponentsConfig.getComponentVNodeById(id)
        return this.customComponentsContext[text];

    }



}

