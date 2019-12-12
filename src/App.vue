<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({ components: {} })
export default class App extends Vue {}
</script>


<style lang="scss">
@import "./assets/style/index.scss";
// #nprogress .bar {
//   background: #f2784b !important;
//   height: 2px !important;
// }
</style>

