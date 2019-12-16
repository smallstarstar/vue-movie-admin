<template>
  <div>
    <div>
      <el-dialog
        title="更改角色"
        :visible.sync="openRoleChange"
        width="30%"
        :show-close="false"
        :before-close="handleClose"
      >
        <div class="userMessage">
          <label>用户姓名</label>
          <div class="userName">{{chooseUserInfo.userName}}</div>
          <label>角色</label>
          <div class="userName">{{utilServices.getRoleInfo(+chooseUserInfo.userRole)}}</div>
          <label>更改的角色</label>
          <div class="changeRole">
            <el-radio-group
              v-for="(item,index) in roleIdArray"
              :key="index"
              v-model="chooseRole"
              @change="changeUserRole($event)"
            >
              <el-radio
                v-if="item !== +chooseUserInfo.userRole"
                :label="item"
              >{{utilServices.getRoleInfo(item)}}</el-radio>
            </el-radio-group>
          </div>
          <div class="button_group">
            <el-button @click="cancel">取 消</el-button>
            <el-button @click="submit" type="primary">提 交</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import utilServices from "@/utils/utils-services";
import configBase from "../../../public/config";

@Component({})
export default class RoleChange extends Vue {
  @Prop({ default: Boolean })
  openRoleChange: any;
  @Prop()
  chooseUserInfo!: any;
  private utilServices: any = utilServices;
  private roleIdArray: Number[] = configBase.roleId;
  private chooseRole: any = "";
  handleClose() {}
  submit() {
    // 组装数据
    const changeInfo: any = {};
    this.chooseRole = "";
    this.$emit("closeDialog", true);
  }
  cancel() {
    this.chooseRole = "";
    this.$emit("closeDialog", true);
  }
  changeUserRole(e: any) {
    console.log(e);
  }
}
</script>

<style lang="scss" scoped>
.userMessage {
  width: 300px;
  height: auto;
  margin: auto;
  label {
    font-size: 17px;
  }
  .userName {
    width: 100%;
    height: 40px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    line-height: 40px;
    text-indent: 10px;
  }
  .button_group {
    margin-top: 10px;
  }
  .changeRole {
      width: 100%;
      padding: 10px;
      /deep/ .el-radio {
          margin-left: 10px;
      }
  }
}
</style>