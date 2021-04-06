import {elementObj} from "@/application/makePage/makePage";

interface ConfigPageInterface {
    showConfig(nowElement: elementObj[], key: number): void
    hideConfig(): void
    display: boolean
    pageConfig: configObj
    addEvent(): void
    delEvent(key: number): void
    addAtt(): void
    delAtt(key: number): void
}


export interface configObj {
    innerText: string
    event: event[]
    att: att[]
    requestConfig: requestConfig

}


interface requestConfig {
    requestPath: string
    codeName: string
    renderName: string
    callEvent: string
    renderElementStr: string
    requestMethod: string,
    requestData: string
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
    displayAttName: boolean
}


let nowElementArr: elementObj[]
let nowKey: number


export class ConfigPageApplication implements ConfigPageInterface{
    constructor(context: Vue) {
        this.context = context
    }

    private context: Vue

    pageConfig: configObj = {innerText: "", event: [], att: [], requestConfig: {requestPath: "", renderElementStr: "", renderName: "", callEvent: "", codeName: "", requestMethod: "", requestData: ""}}

    display: boolean = false


    showConfig(elementArr: elementObj[], key: number) {
        this.display = true;
        // console.log(nowElement);
        this.pageConfig = elementArr[key].configObj
        // this.changeOption(elementArr[key].componentId);
        nowElementArr = elementArr
        nowKey = key;
    }


    changeAttDisplay(key: number, val: boolean): void {
        this.pageConfig.att[key].displayAttName = val;
    }


    changeOption(componentId: number) {
        console.log(componentId);

    }

    addEvent(): void {
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
            attVal: "",
            displayAttName: true
        });
    }



    hideConfig(): void {
        this.display = false;
    }

}
