<template>
  <div>
    <div class="content">
      <!-- <AddConfig />
      <TitleTable />-->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="标题配置" name="first">
          <AddConfig />
          <TitleTable />
        </el-tab-pane>
        <el-tab-pane label="电影管理" name="second">
            <MovicesConfig />
        </el-tab-pane>
        <el-tab-pane label="影院地址" name="third">影院地址</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AddConfig from "./add-config.vue";
import TitleTable from "./title-table.vue";
import MovicesConfig from './movies-config/index.vue';

@Component({
  components: {
    AddConfig,
    TitleTable,
    MovicesConfig
  }
})
export default class titleConfig extends Vue {
  private activeName: any = "first";

  handleClick() {}
}
</script>
<style lang="scss" scoped>
.content {
  width: 100%;
}
</style>

