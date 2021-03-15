import Vue from "vue"

export interface CustomComponentsInterface {
    cssObj: any
    styleString: string
}


export class CustomComponents extends Vue implements CustomComponentsInterface{
    public cssObj: any = {width: "300px", height: "150px"};

    public styleString: string = "width: 300px; height: 150px"


    public setOptions(cssAttribute: string, val: any) {
        this.styleString = "";
        this.cssObj[cssAttribute] = val;
        for (let key in this.cssObj) {
            this.styleString += `${key}: ${this.cssObj[key]};`
        }
        console.log(this.styleString);
    }
}


