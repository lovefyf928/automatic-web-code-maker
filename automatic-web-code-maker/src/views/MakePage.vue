<template>
  <div>
    <my-input ref="myInput"></my-input>
  </div>
</template>

<script lang="ts">
import {MakePageApplication} from "@/application/makePage/makePage";
import Vue from "vue";
import Component from "vue-class-component"
import {MyInput} from "@/infrastructure/customComponents"




@Component({
  name: "MakePage",
  components: {MyInput}
})
export default class MakePage extends Vue {
  private makePageApplication: MakePageApplication = new MakePageApplication(this)

  mounted() {
    this.makePageApplication.setSelectedType();
    this.makePageApplication.setComponentAttribut("myInput", "width", "100px")
    this.makePageApplication.setComponentAttribut("myInput", "height", "50px")
  }

}
</script>

<style scoped>

</style>
