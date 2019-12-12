<template>
  <div>
    <el-table :data="userInfoData" class="table" v-loading="loading">
      <el-table-column label="姓名" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="密码" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.password }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮箱" width="140">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="地址" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色" width="180">
        <template slot-scope="scope">
          <span  :class="{superRole:scope.row.userRole === '0'}">{{ utilServices.getRoleInfo(+scope.row.userRole) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope" width="200">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import userLoginServices from "@/api/userLoginServices";
import { PageInfo } from "@/models/page-info";
import { Getter } from "vuex-class";
import utilServices from "@/utils/utils-services";

@Component({ components: {} })
export default class UserInfoDate extends Vue {
  @Getter("userInfo")
  userInfo: any;
  private utilServices: any  = utilServices;
  private userInfoData: any = [];
  private loading: any = true;
  private pageInfo: PageInfo = new PageInfo();
  private currentPage: number = 1;
  private currentSize: number = 5;
  async created() {
    await this.getInit();
  }
  // 获取元数据
  async getInit() {
    const result: any = await userLoginServices.getUserInfoByPageAndSize(
      this.pageInfo
    );
    if (result) {
      this.userInfoData = result.result;
      this.loading = false;
    }
  }
  async handleDelete(e: any) {
    if (this.userInfo.userRole === e.userRole.toString()) {
      // 说明是平级不可以删除
      const message: any = {
        message: "平级不可以互相删除",
        type: "warning",
        duration: 3000,
        position: "bottom-right"
      };
      this.$notify(message);
    } else {
      const result = await userLoginServices.deleteUserInfoByUserId(
        e._id,
        this.userInfo.userRole
      );
      if (result) {
        await this.getInit();
        const message: any = {
          message: "删除成功",
          type: "success",
          duration: 3000,
          position: "bottom-right"
        };
        this.$notify(message);
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./user-info.scss";
</style>