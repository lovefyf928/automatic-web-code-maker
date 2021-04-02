import {elementObj} from "@/application/makePage/makePage";

interface ConfigPageInterface {
    showConfig(nowElement: elementObj): void
    hideConfig(): void
    display: boolean
    pageConfig: configObj
    addEvent(): void
    delEvent(key: number): void
    addAtt(): void
    delAtt(key: number): void
}


interface configObj {
    name: string
    event: event[]
    att: att[]
    requestConfig: requestConfig

}


interface requestConfig {
    requestPath: string
    codeName: string
    renderName: string
    callEvent: string
    renderElementName: string
}

interface event {
    eventName: string
    eventModifier: string
    eventType: string
}

interface att {
    attType: string
    attName: string
    attVal: string
}


export class ConfigPageApplication implements ConfigPageInterface{
    constructor(context: Vue) {
        this.context = context
    }

    private context: Vue

    pageConfig: configObj = {name: "", event: [], att: [], requestConfig: {requestPath: "", renderElementName: "", renderName: "", callEvent: "", codeName: ""}}

    display: boolean = false


    showConfig(nowElement: elementObj) {
        this.display = true;
        // console.log(nowElement);
        this.changeOption(nowElement.componentId);
    }


    changeOption(componentId: number) {
        console.log(componentId);

    }

    addEvent(): void {
        console.log(this.pageConfig.name);
        this.pageConfig.event.push({
            eventName: "",
            eventModifier: "",
            eventType: ""
        });
    }

    delEvent(key: number): void {
        this.pageConfig.event.splice(key, 1);
    }

    delAtt(key: number): void {
        this.pageConfig.att.splice(key, 1);
    }


    addAtt(): void {
        this.pageConfig.att.push({
            attType: "",
            attName: "",
            attVal: ""
        });
    }



    hideConfig(): void {
        this.display = false;
    }

}
