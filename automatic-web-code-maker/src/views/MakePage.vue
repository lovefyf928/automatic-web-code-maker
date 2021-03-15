<template>
  <div>
    <button @click="getType">get type</button>
  </div>
</template>

<script lang="ts">
import {MakePageApplication} from "@/application/makePage/makePage";
import Vue from "vue";
import Component from "vue-class-component"




@Component({
  name: "MakePage"
})
export default class MakePage extends Vue {
  private makePageApplication: MakePageApplication = new MakePageApplication(this)

  mounted() {
    this.makePageApplication.setSelectedType();
  }
  private getType() {
    console.log(this.makePageApplication.getSelectedType());
  }
}
</script>

<style scoped>

</style>
