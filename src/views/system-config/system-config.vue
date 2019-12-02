<template>
  <div>
    <div class="container_body">
      <div>
        <SideMenu :listDataMenu="listDataMenu" />
      </div>
      <div class="container">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SideMenu from "@/components/home/sideMenu.vue";

@Component({
  components: {
    SideMenu
  }
})
export default class SystemConfig extends Vue {
  private listDataMenu: Array<Object> = [];
  created() {
    this.listDataMenu = [
      {
        routerName: "资源配置",
        path: "/home/systemConfig/resourceConfig",
        icon: "el-icon-platform-eleme"
      },
      {
        routerName: "路由配置",
        path: "/home/systemConfig/routerConfig",
        icon: "el-icon-setting"
      },
      {
        routerName: "电影配置",
        path: "/home/systemConfig/titleConfig",
        icon: "el-icon-edit"
      }
    ];
  }
}
</script>

<style lang="scss" scoped>
.container_body {
  flex: 1;
  display: flex;
  flex-direction: row;
  width: 100%;
  .container {
    padding: 10px;
    width: 100%;

  }
}
</style>