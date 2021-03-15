<template>
  <div class="main-box">
    <div @click="handleClick(tmp)" @mouseover="handleMEnter(index)" @mouseout="handleMOut(index)" :class="tmp.menter ? 'select-type-box-selected' : 'select-type-box'" v-for="(tmp, index) in typeList">
      <h1>{{tmp.name}}</h1>
    </div>
  </div>
</template>

<script lang="ts">

import {IndexApplication} from "@/application/index";
import Vue from "vue";
import Component from "vue-class-component"


@Component({
  name: "Index",
})
export default class Index extends Vue {
  private indexApplication: IndexApplication = new IndexApplication(this);
  private typeList: any[] = [];



  mounted() {
    this.typeList = this.indexApplication.getSelectTypes()
  }
  private handleClick(item: object) {
    this.indexApplication.jumpToMakePage(item);
  }
  private handleMEnter(key: number) {
    this.indexApplication.enterBox(key, this.typeList)
  }
  private handleMOut(key: number) {
    this.indexApplication.outBox(key, this.typeList)
  }
}
</script>

<style scoped>
.main-box{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
}

.select-type-box{
  width: 33%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.select-type-box-selected {
  width: 33%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #eeeeee;
  cursor: pointer;
}



</style>
