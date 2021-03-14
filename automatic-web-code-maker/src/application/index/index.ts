import {TranslatorService} from "@/service/translatorService/translatorService";

interface IndexAppInterface {
    makeCode(): void
    context: Vue
}

export class IndexApplication implements IndexAppInterface{
    constructor(context: Vue) {
        this.context = context
    }
    context: Vue

    makeCode() {
        let translatorService = new TranslatorService("wodj");
        translatorService.createCode({context: this.context});
    }
}
