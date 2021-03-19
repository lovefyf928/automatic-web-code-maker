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
    setComponentAttribut(refs: string, attribute: string, val: any): any

    customComponentsConfig: CustomComponentsConfig


    customComponentsContext: any

    canvasObj: canvasWH

    elementArr: elementObj[]
}

interface elementObj {
    nowX: number | undefined
    nowY: number | undefined
    cssObj: any
    context: Vue
}


interface pointObj {
    pointX: number
    pointY: number
}

interface canvasObj {
    selected: boolean
    rX: number // 矩形的x
    rY: number // 矩形的y
    rW: number // 矩形宽
    rH: number // 矩形高
    pointArr: pointObj[]
    elementObj: elementObj
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

    canvasArr: canvasObj[] = [];


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

    setComponentAttribut(context: any, attribute: string, val: any): any {
        return  context.cc.setOptions(attribute, val)
    }


    getAllComponentList(): CustomComponentsIconInterface[] {

        return this.customComponentsConfig.getComponentConfig();
    }


    loadComponent(id: number, text: string) {
        this.customComponentsContext[text] = this.customComponentsConfig.getComponentVNodeById(id)
        return this.customComponentsContext[text];

    }

    mountDone(x: number, y: number, context: Vue) {
        let obj: elementObj = {nowX: x, nowY: y, context, cssObj: {}}
        this.elementArr.push(obj);
        let dom: HTMLElement | null = document.getElementById("page-area");
        let newContainer: HTMLElement = document.createElement("div");
        newContainer.setAttribute("id", "mount-box");
        dom?.appendChild(newContainer);
        this.drawing()
    }


    drawing() {
        let cssObj: any = {}
        let nowCtx: any = this.elementArr[this.elementArr.length - 1].context;
        let top: any = this.elementArr[this.elementArr.length - 1].nowY;
        let left: any = this.elementArr[this.elementArr.length - 1].nowX;
        this.setComponentAttribut(nowCtx, "position", "absolute");
        cssObj = this.setComponentAttribut(nowCtx, "top", this.elementArr[this.elementArr.length - 1].nowY + "px");
        cssObj = this.setComponentAttribut(nowCtx, "left", this.elementArr[this.elementArr.length - 1].nowX + "px");
        this.elementArr[this.elementArr.length - 1].cssObj = cssObj;
        let w = parseInt(cssObj.width.replace("px", ""))
        let h = parseInt(cssObj.height.replace("px", ""))
        console.log(cssObj);
        this.addCanvasList(left, top, w, h)

        setInterval(() => {
            this.renderCanvas();
        }, 15)

    }


    addCanvasList(left: number, top: number, w: number, h: number) {
        for (let i = 0; i < this.canvasArr.length; i ++) {
            this.canvasArr[i].selected = false;
        }
        this.canvasArr[this.elementArr.length - 1] = {
            selected: true,
            rX: left,
            rY: top,
            rW: w + 3,
            rH: h + 3,
            pointArr: [],
            elementObj: this.elementArr[this.elementArr.length - 1]
        }
        this.canvasArr[this.elementArr.length - 1].pointArr.push({
            pointX: left - 10,
            pointY: top - 10
        })
        this.canvasArr[this.elementArr.length - 1].pointArr.push({
            pointX: left + 13 + w,
            pointY: top - 10
        })
        this.canvasArr[this.elementArr.length - 1].pointArr.push({
            pointX: left + 13 + w,
            pointY: top + 15 + h
        })
        this.canvasArr[this.elementArr.length - 1].pointArr.push({
            pointX: left - 10,
            pointY: top + 13 + h
        })
    }


    handleChangeItem() {

    }

    handleChangeItemSize(nowMouseX: number, nowMouseY: number, canvasObj: canvasObj) {
        console.log("hit point");
        console.log(nowMouseX, nowMouseY)
    }



    handleSelect(x: number, y: number) {
        let isSelected = false
        for (let i = this.canvasArr.length - 1; i >= 0; i --) {
            let w = parseInt(this.canvasArr[i].elementObj.cssObj.width.replace("px", ""))
            let h = parseInt(this.canvasArr[i].elementObj.cssObj.height.replace("px", ""))
            if (this.canvasArr[i].selected) {
                for (let j = 0; j < this.canvasArr[i].pointArr.length; j++) {
                    let zeroPointX = this.canvasArr[i].pointArr[j].pointX - 4;
                    let zeroPointY = this.canvasArr[i].pointArr[j].pointY - 4;
                    if ((x >= zeroPointX && x <= (zeroPointX + 8)) && (y >= zeroPointY && y <= (zeroPointY + 8))) {
                        this.handleChangeItemSize(x, y, this.canvasArr[i]);
                        return;
                    }
                }
            }
            // @ts-ignore
            if ((x >= this.canvasArr[i].elementObj.nowX && x <= (this.canvasArr[i].elementObj.nowX + w)) && (y >= this.canvasArr[i].elementObj.nowY && y <= (this.canvasArr[i].elementObj.nowY + h))) {

                if (!isSelected) {
                    this.canvasArr[i].selected = true;
                    isSelected = true
                }
                else {
                    this.canvasArr[i].selected = false;
                }
            }
            else {
                this.canvasArr[i].selected = false;
            }
        }
    }



    renderCanvas() {
        let canvas: any = document.getElementById("my-canvas");
        let canvasr: any = document.getElementById("my-canvasr");
        this.clearAll(0, 0, this.canvasObj.w, this.canvasObj.h, canvas);
        this.clearAll(0, 0, this.canvasObj.w, this.canvasObj.h, canvasr);
        for (let i = 0; i < this.canvasArr.length; i ++) {
            if (this.canvasArr[i].selected) {
                this.drawRect(this.canvasArr[i].rX, this.canvasArr[i].rY, this.canvasArr[i].rW, this.canvasArr[i].rH, canvasr, this.canvasArr[i].selected);
                for (let j = 0; j < this.canvasArr[i].pointArr.length; j ++) {
                    this.drawPoint(this.canvasArr[i].pointArr[j].pointX, this.canvasArr[i].pointArr[j].pointY, canvas)
                }
            }
        }
    }


    getMainContainerWH() {
        let dom: HTMLElement | null = document.getElementById("page-area");
        this.canvasObj.w = dom?.clientWidth;
        this.canvasObj.h = dom?.clientHeight;
    }


    clearAll(x: number, y: number, w: number | undefined, h: number | undefined, canvas: HTMLCanvasElement) {
        let ctx: CanvasRenderingContext2D | any = canvas.getContext('2d');
        ctx.clearRect(x, y, w, h)
    }

    drawRect(x: number, y: number, w: number, h: number, canvas: HTMLCanvasElement, selected: boolean) {
        w += 20
        x -= 10
        h += 20
        y -= 10
        let ctx: CanvasRenderingContext2D | any = canvas.getContext('2d');
        if (selected) {
            ctx.fillStyle = "#ff0000"
        }
        else {
            ctx.fillStyle = "#000000"
        }
        ctx.fillRect(x, y, w, h);
        ctx.clearRect(x + 2, y + 2, w - 4, h - 4)
    }


    drawPoint(x: number, y: number, canvas: HTMLCanvasElement) {
        let ctx: CanvasRenderingContext2D | any = canvas.getContext('2d');
        ctx.fillStyle = "#ffaa00"
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    }




}

