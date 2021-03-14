<template>
  <button @click="handleClick">生成</button>
</template>

<script>

import {IndexApplication} from "@/application/index";

export default {
  name: "Index",
  data() {
    return {
      indexApplication: new IndexApplication(this)
    }
  },
  methods: {
    handleClick() {
      this.indexApplication.makeCode();
    }
  }
}
</script>

<style scoped>

</style>
