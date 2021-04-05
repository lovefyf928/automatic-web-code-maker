import {TranslatorType, TranslatorTypeList} from "@/core/translator";
import {TranslatorService} from "@/service/translatorService/translatorService";
import {Cache} from "@/infrastructure/cache/cache";
import {
    CustomComponentsConfig,
    CustomComponentsIconInterface
} from "@/infrastructure/customComponents/customComponents";
import {getObjValByKey} from "@/common/myApi";
import {configObj} from "@/application/makePage/module/configPage";




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

export interface elementObj {
    nowX: number | undefined
    nowY: number | undefined
    cssObj: any
    context: Vue
    del: boolean
    zIndex: number
    componentId: number,
    configObj: configObj
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


let isTop: number = 0



export class MakePageApplication implements MakePageAppInterface {
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

    clickX: number = 0;
    clickY: number = 0;


    makeCode() {
        this.translatorService.createCode({elementList: this.elementArr, fileName: "myFirst"});
    }



    setSelectedType() {
        if (this.context.$route.params.type !== undefined) {
            this.cache.setValue("t_t", this.context.$route.params.type);
            this.translatorService.selectTranslatorType(<TranslatorType><unknown>this.context.$route.params.type)
        } else if (this.cache.getValue("t_t") !== undefined) {
            this.translatorService.selectTranslatorType(this.cache.getValue("t_t"))
        } else {
            this.context.$router.push({name: "Index"})
        }
    }

    getSelectedType(): TranslatorType | null {
        return this.translatorService.getNowSelectedType()
    }

    setComponentAttribut(context: any, attribute: string, val: any): any {
        return context.cc.setOptions(attribute, val)
    }


    getAllComponentList(): CustomComponentsIconInterface[] {

        return this.customComponentsConfig.getComponentConfig();
    }


    loadComponent(id: number, text: string) {
        this.customComponentsContext[text] = this.customComponentsConfig.getComponentVNodeById(id)
        return this.customComponentsContext[text];
    }

    mountDone(x: number, y: number, context: Vue, componentId: number) {
        let obj: elementObj = {nowX: x, nowY: y, context, cssObj: {}, del: false, zIndex: 0, componentId, configObj: {innerText: "", event: [], att: [], requestConfig: {requestPath: "", renderElementStr: "", renderName: "", callEvent: "", codeName: ""}}}
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
        this.showConfigPage(this.elementArr.length - 1);

        setInterval(() => {
            this.renderCanvas();
        }, 15)

    }


    addCanvasList(left: number, top: number, w: number, h: number) {
        for (let i = 0; i < this.canvasArr.length; i++) {
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


    handleChangeItemSize(nowMouseX: number, nowMouseY: number, elementArrKey: number, pointKey: number) {
        console.log("hit point");
        console.log(nowMouseX, nowMouseY, elementArrKey, pointKey);
        let offsetX = 0;
        let offsetY = 0;
        let w;
        let h;
        let minWidth = 50;
        let minHeight = 50;
        let nowMinW = false
        let nowMinH = false
        let top;
        let left;
        if (pointKey === 0) {
            offsetX = this.canvasArr[elementArrKey].pointArr[pointKey].pointX - nowMouseX;
            offsetY = this.canvasArr[elementArrKey].pointArr[pointKey].pointY - nowMouseY
            console.log(offsetY);
            if (this.canvasArr[elementArrKey].rW > minWidth) {
                this.canvasArr[elementArrKey].rW += offsetX;
                this.canvasArr[elementArrKey].pointArr[3].pointX -= offsetX;
                this.canvasArr[elementArrKey].rX = nowMouseX + 10;
                this.canvasArr[elementArrKey].pointArr[pointKey].pointX = nowMouseX;
            }
            else {
                if (offsetX >= 0) {
                    this.canvasArr[elementArrKey].rW += offsetX;
                    this.canvasArr[elementArrKey].pointArr[3].pointX -= offsetX;
                    this.canvasArr[elementArrKey].rX = nowMouseX + 10;
                    this.canvasArr[elementArrKey].pointArr[pointKey].pointX = nowMouseX;
                }
                else {
                    nowMinW = true;
                }
            }
            if (this.canvasArr[elementArrKey].rH > minHeight) {
                this.canvasArr[elementArrKey].rH += offsetY;
                this.canvasArr[elementArrKey].pointArr[1].pointY -= offsetY;
                this.canvasArr[elementArrKey].rY = nowMouseY + 10;
                this.canvasArr[elementArrKey].pointArr[pointKey].pointY = nowMouseY;
            }
            else {
                if (offsetY >= 0) {
                    this.canvasArr[elementArrKey].rH += offsetY;
                    this.canvasArr[elementArrKey].pointArr[1].pointY -= offsetY;
                    this.canvasArr[elementArrKey].rY = nowMouseY + 10;
                    this.canvasArr[elementArrKey].pointArr[pointKey].pointY = nowMouseY;
                }
                else {
                    nowMinH = true;
                }
            }
        } else if (pointKey === 1) {
            offsetX = nowMouseX - this.canvasArr[elementArrKey].pointArr[pointKey].pointX;
            offsetY = this.canvasArr[elementArrKey].pointArr[pointKey].pointY - nowMouseY;
            if (this.canvasArr[elementArrKey].rW > minWidth) {
                this.canvasArr[elementArrKey].rW += offsetX;
                this.canvasArr[elementArrKey].pointArr[2].pointX += offsetX;
                this.canvasArr[elementArrKey].pointArr[pointKey].pointX += offsetX
            }
            else {
                if (offsetX >= 0) {
                    this.canvasArr[elementArrKey].rW += offsetX;
                    this.canvasArr[elementArrKey].pointArr[2].pointX += offsetX;
                    this.canvasArr[elementArrKey].pointArr[pointKey].pointX += offsetX
                }
                else {
                    nowMinW = true;
                }
            }
            if (this.canvasArr[elementArrKey].rH > minHeight) {
                this.canvasArr[elementArrKey].rH += offsetY;
                this.canvasArr[elementArrKey].pointArr[0].pointY -= offsetY;
                this.canvasArr[elementArrKey].pointArr[pointKey].pointY -= offsetY
                this.canvasArr[elementArrKey].rY -= offsetY
            }
            else {
                if (offsetY >= 0) {
                    this.canvasArr[elementArrKey].rH += offsetY;
                    this.canvasArr[elementArrKey].pointArr[0].pointY -= offsetY;
                    this.canvasArr[elementArrKey].pointArr[pointKey].pointY -= offsetY
                    this.canvasArr[elementArrKey].rY -= offsetY
                }
                else {
                    nowMinH = true;
                }
            }


        } else if (pointKey === 2) {
            offsetX = nowMouseX - this.canvasArr[elementArrKey].pointArr[pointKey].pointX;
            offsetY = nowMouseY - this.canvasArr[elementArrKey].pointArr[pointKey].pointY;
            if (this.canvasArr[elementArrKey].rW > minWidth) {
                this.canvasArr[elementArrKey].rW += offsetX;
                this.canvasArr[elementArrKey].pointArr[pointKey].pointX += offsetX
                this.canvasArr[elementArrKey].pointArr[1].pointX += offsetX;
            }
            else {
                if (offsetX >= 0) {
                    this.canvasArr[elementArrKey].rW += offsetX;
                    this.canvasArr[elementArrKey].pointArr[pointKey].pointX += offsetX
                    this.canvasArr[elementArrKey].pointArr[1].pointX += offsetX;
                }
                else {
                    nowMinW = true;
                }
            }
            if (this.canvasArr[elementArrKey].rH > minHeight) {
                this.canvasArr[elementArrKey].rH += offsetY;
                this.canvasArr[elementArrKey].pointArr[pointKey].pointY += offsetY
                this.canvasArr[elementArrKey].pointArr[3].pointY += offsetY;
            }
            else {
                if (offsetY >= 0) {
                    this.canvasArr[elementArrKey].rH += offsetY;
                    this.canvasArr[elementArrKey].pointArr[pointKey].pointY += offsetY
                    this.canvasArr[elementArrKey].pointArr[3].pointY += offsetY;
                }
                else {
                    nowMinH = true;
                }
            }
        } else if (pointKey === 3) {
            offsetX = this.canvasArr[elementArrKey].pointArr[pointKey].pointX - nowMouseX;
            offsetY = nowMouseY - this.canvasArr[elementArrKey].pointArr[pointKey].pointY;
            if (this.canvasArr[elementArrKey].rW > minWidth) {
                this.canvasArr[elementArrKey].rW += offsetX;
                this.canvasArr[elementArrKey].pointArr[pointKey].pointX -= offsetX
                this.canvasArr[elementArrKey].rX -= offsetX
                this.canvasArr[elementArrKey].pointArr[0].pointX -= offsetX;
            }
            else {
                if (offsetX >= 0) {
                    this.canvasArr[elementArrKey].rW += offsetX;
                    this.canvasArr[elementArrKey].pointArr[pointKey].pointX -= offsetX
                    this.canvasArr[elementArrKey].rX -= offsetX
                    this.canvasArr[elementArrKey].pointArr[0].pointX -= offsetX;
                }
                else {
                    nowMinW = true;
                }
            }
            if (this.canvasArr[elementArrKey].rH > minHeight) {
                this.canvasArr[elementArrKey].rH += offsetY;
                this.canvasArr[elementArrKey].pointArr[pointKey].pointY += offsetY
                this.canvasArr[elementArrKey].pointArr[2].pointY += offsetY;
            }
            else {
                if (offsetY >= 0) {
                    this.canvasArr[elementArrKey].rH += offsetY;
                    this.canvasArr[elementArrKey].pointArr[pointKey].pointY += offsetY
                    this.canvasArr[elementArrKey].pointArr[2].pointY += offsetY;
                }
                else {
                    nowMinH = true;
                }
            }
        }

        let nowElement = this.elementArr[elementArrKey];
        let cssObj = nowElement.cssObj;
        if (!nowMinW) {
            w = this.canvasArr[elementArrKey].rW - 3;
            left = this.canvasArr[elementArrKey].pointArr[0].pointX + 10;
            cssObj.left = left + "px";
            cssObj.width = w + "px";
            nowElement.nowX = left;
        }
        if (!nowMinH) {
            h = this.canvasArr[elementArrKey].rH - 3;
            top = this.canvasArr[elementArrKey].pointArr[0].pointY + 10;
            cssObj.top = top + "px";
            cssObj.height = h + "px";
            nowElement.nowY = top;
        }
    }


    delElement() {
        for (let i = 0; i < this.canvasArr.length; i ++) {
            if (this.canvasArr[i].selected) {
                this.canvasArr.splice(i, 1);
                this.elementArr[i].del = true;
                return
            }
        }
    }


    handleMoveItem(nowMouseX: number, nowMouseY: number, elementArrKey: number) {
        if (this.clickX === -1 || this.clickY === -1) {
            return
        }
        let moveX = nowMouseX - this.clickX;
        let moveY = nowMouseY - this.clickY;

        this.canvasArr[elementArrKey].rX += moveX;
        this.canvasArr[elementArrKey].rY += moveY;

        // @ts-ignore
        this.elementArr[elementArrKey].nowX += moveX;
        // @ts-ignore
        this.elementArr[elementArrKey].nowY += moveY

        let cssObj: any
        cssObj = this.setComponentAttribut(this.elementArr[elementArrKey].context, "top", this.elementArr[elementArrKey].nowY + "px");
        cssObj = this.setComponentAttribut(this.elementArr[elementArrKey].context, "left", this.elementArr[elementArrKey].nowX + "px");
        this.elementArr[elementArrKey].cssObj = cssObj;

        for (let i = 0; i < this.canvasArr[elementArrKey].pointArr.length; i++) {
            this.canvasArr[elementArrKey].pointArr[i].pointX += moveX;
            this.canvasArr[elementArrKey].pointArr[i].pointY += moveY;
        }

        this.clickX = nowMouseX;
        this.clickY = nowMouseY;

    }


    handleSelect(x: number, y: number, mode: string, setTop?: boolean, setBottom?: boolean) {
        let onHitCount = 0;
        if (mode === "click") {
            isTop = 0;
        }
        for (let i = this.canvasArr.length - 1; i >= 0; i--) {
            let w = parseInt(this.canvasArr[i].elementObj.cssObj.width.replace("px", ""))
            let h = parseInt(this.canvasArr[i].elementObj.cssObj.height.replace("px", ""))
            if (mode === "move" || mode === "click") {
                if (this.canvasArr[i].selected) {
                    for (let j = 0; j < this.canvasArr[i].pointArr.length; j++) {
                        let zeroPointX = this.canvasArr[i].pointArr[j].pointX - 4;
                        let zeroPointY = this.canvasArr[i].pointArr[j].pointY - 4;
                        if ((x >= zeroPointX && x <= (zeroPointX + 8)) && (y >= zeroPointY && y <= (zeroPointY + 8))) {
                            this.handleChangeItemSize(x, y, i, j);
                            return;
                        }

                        let rZeroPointX = this.canvasArr[i].rX;
                        let rZeroPointY = this.canvasArr[i].rY;

                        if ((x >= rZeroPointX && x <= (rZeroPointX + this.canvasArr[i].rW)) && (y >= rZeroPointY && y <= (rZeroPointY + this.canvasArr[i].rH))) {
                            if (mode === "click") {
                                this.clickX = x;
                                this.clickY = y;
                            } else if (mode === "move") {
                                this.handleMoveItem(x, y, i)
                            }
                            // return;
                        }
                    }
                }
            }
            // @ts-ignore
            if ((x >= this.canvasArr[i].elementObj.nowX && x <= (this.canvasArr[i].elementObj.nowX + w)) && (y >= this.canvasArr[i].elementObj.nowY && y <= (this.canvasArr[i].elementObj.nowY + h))) {
                if (mode !== "move") {
                    if (isTop < i) {
                        isTop = i;

                    }
                }
                // console.log(isTop);
                // console.log(1);
            } else {
                if (mode === "move" || mode === "click") {
                    onHitCount++
                }
                // isSelected = false
                // this.canvasArr[i].selected = false;
            }
            if (i === 0) {


                for (let k = 0; k < this.canvasArr.length; k++) {
                    this.canvasArr[k].selected = false;
                }
                if (onHitCount !== this.canvasArr.length) {
                    this.canvasArr[isTop].selected = true;
                    if (setTop) {
                        this.setTop(isTop);
                    }
                    if (setBottom) {
                        this.setBottom(isTop)
                    }
                }
                this.clickX = x;
                this.clickY = y;

                if (this.canvasArr[isTop].selected) {
                    this.showConfigPage(isTop);
                }
                else {
                    this.hideConfigPage();
                }
            }
        }
    }


    showConfigPage(key: number) {
        const ref: any = this.context.$refs.configPage;
        ref.configPageApplication.showConfig(this.elementArr, key);

    }

    hideConfigPage() {
        const ref: any = this.context.$refs.configPage;
        ref.configPageApplication.hideConfig();
    }


    setBottom(elementArrKey: number) {

        let setMin = 0;
        for (let i = 0; i < this.elementArr.length; i ++) {
            if (setMin > this.elementArr[i].zIndex) {
                setMin = this.elementArr[i].zIndex;
            }
        }

        let cssObj: any
        this.elementArr[elementArrKey].zIndex = setMin - 1;
        cssObj = this.setComponentAttribut(this.elementArr[elementArrKey].context, "z-index", setMin - 1);
        this.elementArr[elementArrKey].cssObj = cssObj;

        let nowElement = this.elementArr[elementArrKey];
        let nowCanvas = this.canvasArr[elementArrKey];
        this.elementArr.splice(elementArrKey, 1);
        this.elementArr.unshift(nowElement)
        this.canvasArr.splice(elementArrKey, 1);
        this.canvasArr.unshift(nowCanvas);

    }


    setTop(elementArrKey: number) {
        let setMax = 0;
        for (let i = 0; i < this.elementArr.length; i ++) {
            if (setMax < this.elementArr[i].zIndex) {
                setMax = this.elementArr[i].zIndex;
            }
        }
        this.elementArr[elementArrKey].zIndex = setMax + 1;
        let cssObj: any
        cssObj = this.setComponentAttribut(this.elementArr[elementArrKey].context, "z-index", this.elementArr[elementArrKey].zIndex);
        this.elementArr[elementArrKey].cssObj = cssObj;
        let nowElement = this.elementArr[elementArrKey];
        let nowCanvas = this.canvasArr[elementArrKey];
        this.elementArr.splice(elementArrKey, 1);
        this.elementArr[this.elementArr.length] = nowElement;
        this.canvasArr.splice(elementArrKey, 1);
        this.canvasArr[this.canvasArr.length] = nowCanvas;

    }





    renderCanvas() {
        let canvas: any = document.getElementById("my-canvas");
        let canvasr: any = document.getElementById("my-canvasr");
        this.clearAll(0, 0, this.canvasObj.w, this.canvasObj.h, canvas);
        this.clearAll(0, 0, this.canvasObj.w, this.canvasObj.h, canvasr);
        for (let i = 0; i < this.canvasArr.length; i++) {
            if (this.canvasArr[i].selected) {
                this.drawRect(this.canvasArr[i].rX, this.canvasArr[i].rY, this.canvasArr[i].rW, this.canvasArr[i].rH, canvasr, this.canvasArr[i].selected);
                for (let j = 0; j < this.canvasArr[i].pointArr.length; j++) {
                    this.drawPoint(this.canvasArr[i].pointArr[j].pointX, this.canvasArr[i].pointArr[j].pointY, canvas)
                }
            }
        }
        for (let i = 0; i < this.elementArr.length; i ++) {
            if (this.elementArr[i].del) {
                this.elementArr[i].context.$data.showElement = false;
                this.elementArr.splice(i, 1);
                i --;
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
        } else {
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

