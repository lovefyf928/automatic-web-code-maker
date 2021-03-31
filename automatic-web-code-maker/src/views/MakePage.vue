<template>
  <div style="width: 100%; display: flex">
    <div class="icon-list">
      <div v-for="tmp in componentsList" class="icon-item">
        <img @dragend="handleEndDrag($event, tmp)" class="icon-img" :src="require('../assets/' + tmp.iconPath)">
        <span>{{tmp.text}}</span>
      </div>
    </div>
    <div style="outline: none" tabindex="1" @keydown="handleKeyDown" id="page-area" >
      <canvas id="my-canvas" style="width: 100%; height: 100%; position: absolute; left: 0; top: 0; z-index: 998" :width="makePageApplication.canvasObj.w" :height="makePageApplication.canvasObj.h"></canvas>
      <canvas @click="closeMyM" @contextmenu.prevent @click.right="handleRightClick" @mouseleave="handleML" @mousemove="handleMM" @mouseup="handleMU" @mousedown="handleMD"  id="my-canvasr" style="width: 100%; height: 100%; position: absolute; left: 0; top: 0; z-index: 999" :width="makePageApplication.canvasObj.w" :height="makePageApplication.canvasObj.h"></canvas>
      <div id="mount-box"></div>
      <div v-if="displayM" :style="mCss">
        <div @click="setTop" style="width: 100%; height: 30px; line-height: 30px; border-bottom: 1px solid #999999; text-align: center">
          <span>将当前元素置顶</span>
        </div>
        <div @click="setBottom" style="width: 100%; height: 30px; line-height: 30px; text-align: center; border-bottom: 1px solid #999999;">
          <span>将当前元素置底</span>
        </div>
        <div @click="closeMyM" style="width: 100%; height: 30px; line-height: 30px; text-align: center">
          <span>取消</span>
        </div>
      </div>
    </div>
    <a-button style="width: 100px; height: 60px; position: absolute; bottom: 10px; right: 20px; z-index: 9999" @click="doMakeCode">生成</a-button>
    <config-page ref="configPage" style="z-index: 10000"></config-page>
  </div>
</template>

<script lang="ts">
import {MakePageApplication} from "@/application/makePage/makePage";
import Vue from "vue";
import Component from "vue-class-component"
import ConfigPage from "./module/ConfigPage.vue"


@Component({
  name: "MakePage",
  components: {ConfigPage}
})
export default class MakePage extends Vue {
  private makePageApplication: MakePageApplication = new MakePageApplication(this)
  private componentsList: any[] = [];
  private listW: number = 0

  private isDrag = false

  private displayM = false

  private mCss = "width: 100px; height: 90px; font-size: 13px; position: absolute; top: 0; left: 0; z-index: 1000; border: 1px solid #999999; cursor: pointer;background: #eeeeee;"

  private nowRightClick = {x: -1, y: -1};



  mounted() {
    this.listW = document.getElementsByClassName("icon-list")[0].clientWidth;
    this.makePageApplication.setSelectedType();
    this.componentsList = this.makePageApplication.getAllComponentList();
    this.makePageApplication.getMainContainerWH()
    window.onresize = () => {
      this.makePageApplication.getMainContainerWH()
    }
    // window.addEventListener("keydown", this.handleKeyDown);
  }

  setTop() {
    this.makePageApplication.handleSelect(this.nowRightClick.x, this.nowRightClick.y, "click", true);
  }

  setBottom() {
    this.makePageApplication.handleSelect(this.nowRightClick.x, this.nowRightClick.y, "click", false, true);
  }


  handleKeyDown(e: any) {
    console.log(e);
    if (e.keyCode === 8) {
      this.makePageApplication.delElement();
    }
  }

  handleRightClick(e: any) {
    console.log(e);
    this.nowRightClick = {x: e.clientX - this.listW, y: e.clientY};
    this.showMyM(e.clientX - this.listW, e.clientY)
  }

  showMyM(x: number, y: number) {
    this.mCss = `width: 100px; height: 90px; font-size: 13px; position: absolute; top: ${y}px; left: ${x}px; z-index: 1000; border: 1px solid #999999; cursor: pointer;background: #eeeeee;`
    this.displayM = true;
  }

  closeMyM() {
    this.displayM = false;
  }



  handleEndDrag(e: any, item: any) {
    if (e.clientX - this.listW >= 0) {
      let nowComponent: Vue = this.makePageApplication.loadComponent(item.id, item.text);
      nowComponent.$mount("#mount-box")
      this.makePageApplication.mountDone(e.clientX - this.listW, e.clientY, nowComponent, item.id);
    }
  }

  handleMD(e: any) {
    console.log(e);
    this.isDrag = true
    this.makePageApplication.handleSelect(e.clientX - this.listW, e.clientY, "click")

  }

  handleMU(e: any) {
    console.log(e);
    this.isDrag = false;
    // this.makePageApplication.handleSelect(e.clientX - this.listW, e.clientY, "over")
  }


  handleMM(e: any) {
    if (this.isDrag) {
      this.makePageApplication.handleSelect(e.clientX - this.listW, e.clientY, "move")
    }
  }

  handleML() {
    this.isDrag = false;
    // this.makePageApplication.handleSelect(e.clientX - this.listW, e.clientY, "over")
  }


  doMakeCode() {
    this.makePageApplication.makeCode()
  }

}
</script>

<style scoped>

#page-area{
  position: relative;
}

.icon-list{
  width: 20%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  border-right: 1px solid #eeeeee;
  padding: 20px;
}

#page-area {
  width: 80%;
  height: 100%;
}

.icon-item{
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.icon-img{
  width: 40px;
  height: 40px;
}
</style>
