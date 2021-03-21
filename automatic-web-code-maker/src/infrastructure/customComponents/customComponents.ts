import Vue from "vue"
import {configArr} from "@/infrastructure/customComponents/config";
import "@/infrastructure/customComponents/lib"
import {obj} from "@/infrastructure/customComponents/lib";

export interface CustomComponentsInterface {
    cssObj: any
    styleString: string
}


export interface CustomComponentsIconInterface {
    iconPath: string
    componentPath: string
    text: string
    id: number,
    tagName: string
}



export class CustomComponents extends Vue implements CustomComponentsInterface{


    public cssObj: any = {width: "300px", height: "150px"};

    public styleString: string = "width: 300px; height: 150px"



    public setOptions(cssAttribute: string, val: any): any {
        this.styleString = "";
        this.cssObj[cssAttribute] = val;
        // for (let key in this.cssObj) {
        //     this.styleString += `${key}: ${this.cssObj[key]};`
        // }
        this.$forceUpdate();
        return this.cssObj;
    }
}


export class CustomComponentsConfig {
    public getComponentConfig(): CustomComponentsIconInterface[] {
        return configArr
    }

    public getComponentVNodeById(id: number) {
        let list = this.getComponentConfig();
        for (let i = 0; i < list.length; i ++) {
            if (list[i].id === id) {
                // @ts-ignore
                let vNode = obj[list[i].text]()
                return  new vNode()
            }
        }
    }
}


