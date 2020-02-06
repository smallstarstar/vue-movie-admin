<template>
  <div>
    <!-- 待审的商品列表 -->
    <el-table :data="tableData" style="width: 100%" class="table" v-loading="loading">
      <el-table-column label="名称" width="120" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类型" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.subName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="等级" width="100">
        <template slot-scope="scope">
          <span :style="utilServices.getColor(+(scope.row.level))">
            <span style="padding: 10px 20px; color:white">{{scope.row.level}}</span>
          </span>
        </template>
      </el-table-column>

      <el-table-column label="时间" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.time }}</span>
        </template>
      </el-table-column>

      <el-table-column label="地址" width="180" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.address }}</span>
        </template>
      </el-table-column>

      <el-table-column label="描述" width="180" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.desc }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="500">
        <template slot-scope="scope">
          <el-button size="mini" type="warning" @click="handleEdit(scope.$index, scope.row)">查看报告</el-button>
          <el-button
            size="mini"
            type="danger"
            v-if="scope.row.status"
            @click="handleBackInfo(scope.row)"
          >驳回</el-button>
          <el-button size="mini" type="danger" v-if="!scope.row.status">已驳回</el-button>
          <el-button size="mini" type="info" @click="renewOpen(scope.row)">重新打开</el-button>
          <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">流程</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="getInfoDisposal(scope.row)"
            v-if="scope.row.status"
          >进入</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      class="page"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import eventInfoServices from "@/api/eventInfoServices";
import timeFormat from "@/utils/timeFormat";
import { Action, Getter } from "vuex-class";
import rxevent from "pubsub-js";
import EventKeys from "@/common/event-keys/eventKeys";
import { EventStatus } from "@/common/enums/event-status";
import utilServices from "@/utils/utils-services";
import { PageInfo } from "@/models/page-info";

@Component({
  components: {}
})
export default class ShopInfoData extends Vue {
  @Getter("userInfo")
  userInfo!: any;
  @Action("saveEventInfo")
  saveEventInfo!: any;
  private tableData: Array<[]> = [];
  private pageInfo: PageInfo = new PageInfo();
  private page: number = 1;
  private current: number = 7;
  private total: number = 0;
  private timeChange: any = timeFormat;
  private loading: boolean = true;
  private DisposalStatus: any = EventStatus;
  private utilServices: any = utilServices;

  async mounted() {
    await this.getInit();
    rxevent.subscribe(
      EventKeys.REFRESH_GETDATE,
      async (name: any, data: any) => {
        if (data) {
          await this.getInit();
        }
      }
    );
  }

  handleEdit() {}
  handleDelete() {}
  handleSizeChange() {}
  handleCurrentChange() {}
  // 驳回处置
  async handleBackInfo(e: any) {
    await this.changeEvnentInfo(e, false);
  }
  // 重新打开
  async renewOpen(e: any) {
    await this.changeEvnentInfo(e, true);
  }
  getInfoDisposal(e: any) {
    e.router = "/home/homelist/shopInfo";
    this.saveEventInfo(e);
    // 进入主流程
    this.$router.push("/home/disposal/reviewInfo");
    // 将头部导航置灰
    rxevent.publish(EventKeys.DISABLE_MENU_COLOR, true);
  }

  // 获取数据
  async getInit() {
    this.loading = true;
    const result: any = await eventInfoServices.getEventInfoByPage(
      this.pageInfo
    );
    if (result) {
      this.loading = false;
      this.tableData = result.result;
      this.total = result.total;
    }
  }
  async changeEvnentInfo(e: any, type: any) {
    let info: any = {};
    info.perId = this.userInfo._id;
    info.person = this.userInfo.userName;
    info.perRole = +this.userInfo.userRole;
    info.eventId = e._id;
    info.status = type;
    let messagKey = "";
    if (type) {
      messagKey = "重新打开事务成功";
    } else {
      messagKey = "驳回事务成功";
    }
    const result = await eventInfoServices.backEventInfo(info);
    if (result) {
      const messageInfo: any = {
        message: messagKey,
        position: "bottom-right",
        type: "success"
      };
      this.$notify(messageInfo);
      await this.getInit();
    }
  }
}
</script>

<style lang="scss" scoped>
.table {
  height: 450px;
  /deep/ .el-table__empty-text {
    height: 450px;
    line-height: 450px;
  }
}
.page {
  float: right;
  margin-right: 10px;
  margin-top: 3px;
}
</style>