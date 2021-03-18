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

    canvasObj: canvasWH

    elementArr: elementObj[]
}

interface elementObj {
    nowX: number | undefined
    nowY: number | undefined
    context: Vue
}

interface canvasWH {
    w: number | undefined
    h: number | undefined
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
    canvasObj: canvasWH = {w: 0, h: 0};

    elementArr: elementObj[] = [];


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
        context.cc.setOptions(attribute, val)
    }


    getAllComponentList(): CustomComponentsIconInterface[] {

        return this.customComponentsConfig.getComponentConfig();
    }


    loadComponent(id: number, text: string) {
        this.customComponentsContext[text] = this.customComponentsConfig.getComponentVNodeById(id)
        return this.customComponentsContext[text];

    }

    mountDone(x: number, y: number, context: Vue) {
        let obj: elementObj = {nowX: x, nowY: y, context}
        this.elementArr.push(obj);
        let dom: HTMLElement | null = document.getElementById("page-area");
        let newContainer: HTMLElement = document.createElement("div");
        newContainer.setAttribute("id", "mount-box");
        dom?.appendChild(newContainer);
        this.drawing()
    }


    drawing() {
        console.log(this.elementArr);
        let nowCtx = this.elementArr[this.elementArr.length - 1].context
        this.setComponentAttribut(nowCtx, "position", "absolute");
        this.setComponentAttribut(nowCtx, "top", this.elementArr[this.elementArr.length - 1].nowY + "px");
        this.setComponentAttribut(nowCtx, "left", this.elementArr[this.elementArr.length - 1].nowX + "px");
    }


    getMainContainerWH() {
        let dom: HTMLElement | null = document.getElementById("page-area");
        this.canvasObj.w = dom?.clientWidth;
        this.canvasObj.h = dom?.clientHeight;
    }



}

