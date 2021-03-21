<template>
  <div style="width: 100%; display: flex">
    <div class="icon-list">
      <div v-for="tmp in componentsList" class="icon-item">
        <img @dragend="handleEndDrag($event, tmp)" class="icon-img" :src="require('../assets/' + tmp.iconPath)">
        <span>{{tmp.text}}</span>
      </div>
    </div>
    <div id="page-area" >
      <canvas id="my-canvas" style="width: 100%; height: 100%; position: absolute; left: 0; top: 0; z-index: 998" :width="makePageApplication.canvasObj.w" :height="makePageApplication.canvasObj.h"></canvas>
      <canvas @mouseleave="handleML" @mousemove="handleMM" @mouseup="handleMU" @mousedown="handleMD"  id="my-canvasr" style="width: 100%; height: 100%; position: absolute; left: 0; top: 0; z-index: 999" :width="makePageApplication.canvasObj.w" :height="makePageApplication.canvasObj.h"></canvas>
      <div id="mount-box"></div>
    </div>
  </div>
</template>

<script lang="ts">
import {MakePageApplication} from "@/application/makePage/makePage";
import Vue from "vue";
import Component from "vue-class-component"


@Component({
  name: "MakePage",
})
export default class MakePage extends Vue {
  private makePageApplication: MakePageApplication = new MakePageApplication(this)
  private componentsList: any[] = [];
  private listW: number = 0

  private isDrag = false



  mounted() {
    this.listW = document.getElementsByClassName("icon-list")[0].clientWidth;
    this.makePageApplication.setSelectedType();
    this.componentsList = this.makePageApplication.getAllComponentList();
    this.makePageApplication.getMainContainerWH()
    window.onresize = () => {
      this.makePageApplication.getMainContainerWH()
    }
  }



  handleEndDrag(e: any, item: any) {
    if (e.clientX - this.listW >= 0) {
      let nowComponent: Vue = this.makePageApplication.loadComponent(item.id, item.text);
      nowComponent.$mount("#mount-box")
      this.makePageApplication.mountDone(e.clientX - this.listW, e.clientY, nowComponent)
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
