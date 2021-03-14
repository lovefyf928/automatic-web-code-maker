import {TranslatorService} from "@/service/translatorService/translatorService";


interface IndexAppInterface {
    translatorService: TranslatorService
    context: Vue
    getSelectTypes(): any[]
    enterBox(key: number, listBox: any[]): void
    outBox(key: number, listBox: any[]): void
    jumpToMakePage(typeObj: any): void
}

export class IndexApplication implements IndexAppInterface{
    constructor(context: Vue) {
        this.context = context
    }
    context: Vue

    translatorService: TranslatorService = new TranslatorService();

    jumpToMakePage(typeObj: any): void {
        this.context.$router.push({name: "MakePage", params: typeObj});
    }

    getSelectTypes(): any[] {
        let list: any[] = this.translatorService.getTranslatorType()
        for (let i = 0; i < list.length; i ++) {
            list[i].menter = false;
        }
        return list
    }

    enterBox(key: number, listBox: any[]): void {
        listBox[key].menter = true;
        this.context.$forceUpdate();
    }

    outBox(key: number, listBox: any[]): void {
        listBox[key].menter = false;
        this.context.$forceUpdate();
    }


}
