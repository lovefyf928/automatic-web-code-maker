<template>
  <div>
    <button @click="getType">get type</button>
  </div>
</template>

<script lang="ts">
import {MakePageApplication} from "@/application/makePage/makePage";

export default {
  name: "MakePage",
  data() {
    return {
      makePageApplication: new MakePageApplication(this)
    }
  },
  mounted() {
    this.makePageApplication.setSelectedType();
  },
  methods: {
    getType() {
      console.log(this.makePageApplication.getSelectedType());
    }
  }
}
</script>

<style scoped>

</style>
