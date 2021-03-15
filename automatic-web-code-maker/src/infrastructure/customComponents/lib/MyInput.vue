<template>
    <label>
      <input :style="styleString"/>
    </label>
</template>

<script lang="ts">
import {CustomComponents} from "../customComponents"
import Component from "vue-class-component";

@Component({
  name: "MyInput"
})
export default class MyInput extends CustomComponents{
  mounted() {
    console.log(this.styleString);
  }

}
</script>

<style scoped>

</style>
