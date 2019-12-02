<template>
  <div>
    <el-table :data="table" stripe>
      <el-table-column label="ID" width="360">
        <template slot-scope="scope">
          <span>{{ scope.row._id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建日期" width="300">
        <template slot-scope="scope">
          <span>{{ scope.row.time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.titleName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建人" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.perosn }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import eventInfoServices from "@/api/eventInfoServices";
import rxevent from "pubsub-js";
import EventKeys from "@/common/event-keys/eventKeys";

@Component({
  components: {}
})
export default class titleTable extends Vue {
  private table: any = [];
  async mounted() {
    await this.getInit();
    // 获取标题数据
    rxevent.subscribe(
      EventKeys.REFRESHTITLEEVENT,
      async (name: any, val: any) => {
        await this.getInit();
      }
    );
  }
  handleEdit() {}
  handleDelete(e: any) {
    this.$confirm("确定删除", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(async () => {
        const data = await eventInfoServices.deleteTitleById(e);
        if (data) {
          await this.getInit();
          const messageInfo: any = {
            message: "删除标题名称成功",
            type: "success",
            position: "bottom-right"
          };
          this.$notify(messageInfo);
        }
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除"
        });
      });
  }

  // 获取元数据
  async getInit() {
    this.table = await eventInfoServices.getTitleInfoList();
  }
}
</script>

<style lang="scss" scoped>
.table {
  width: 100%;
}
</style>
