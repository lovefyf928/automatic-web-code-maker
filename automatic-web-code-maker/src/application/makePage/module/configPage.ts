import {elementObj} from "@/application/makePage/makePage";

interface ConfigPageInterface {
    showConfig(nowElement: elementObj): void
    hideConfig(): void
    display: boolean
}


export class ConfigPageApplication implements ConfigPageInterface{
    constructor(context: Vue) {
        this.context = context
    }

    private context: Vue

    display: boolean = false


    showConfig(nowElement: elementObj) {
        this.display = true;
        // console.log(nowElement);
        this.changeOption(nowElement.componentId);
    }


    changeOption(componentId: number) {
        console.log(componentId);

    }




    hideConfig() {
        this.display = false;
    }

}
