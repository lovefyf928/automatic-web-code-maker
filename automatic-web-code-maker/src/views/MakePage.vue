<template>
  <div style="width: 100%; display: flex">
    <div class="icon-list">
      <div v-for="tmp in componentsList" class="icon-item">
        <img @dragend="handleEndDrag($event, tmp)"  @drag="handleDrag" class="icon-img" :src="require('../assets/' + tmp.iconPath)">
        <span>{{tmp.text}}</span>
      </div>
      <button @click="handleClick">clickTest</button>
    </div>
    <div id="page-area" >
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

  private contextObj = {};

  mounted() {
    this.listW = window.innerWidth * 0.2 + 40;
    this.makePageApplication.setSelectedType();

    this.componentsList = this.makePageApplication.getAllComponentList();
  }

  handleDrag(e: any) {
    // console.log(e);
    // if (e.clientX - this.listW >= 0) {
    //   console.log("in page area")
    // }
  }

  handleClick() {
    this.makePageApplication.setComponentAttribut("MyInput", "width", "100px")
    this.makePageApplication.setComponentAttribut("MyInput", "height", "50px")

  }

  handleEndDrag(e: any, item: any) {
    console.log(e);
    console.log(this.listW);
    if (e.clientX - this.listW >= 0) {
      this.makePageApplication.loadComponent(item.id, item.text).$mount("#page-area")


      // componentsObj[item.text] = this.makePageApplication.loadComponent(item.id)
      // console.log(componentsObj);
      // let pa = document.getElementsByClassName("page-area")[0];
      // console.log(pa);
      // let myComponent = document.createElement(item.tagName);
      // myComponent.setAttribute("ref", item.text);
      // console.log(myComponent);
      // pa.appendChild(myComponent);

      // const refs: any = this.$refs.MyInput


      // const refs: any = this.$refs.pageArea;
      // refs.appendChild(test.$el);
      // console.log(refs.);


    }
  }

}
</script>

<style scoped>

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
