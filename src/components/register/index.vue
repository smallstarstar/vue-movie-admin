<template>
  <div>
    <el-button type="success" class="buttonSub" @click="openDialog()">注 册</el-button>
    <el-dialog
      title="注册信息"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      :show-close="false"
    >
      <el-form :model="userRegisterInfo" ref="userRegisterInfo" :rules="validatorRules">
        <el-form-item label="用户名" :prop="validatorName.userName">
          <el-input placeholder="请输入..." v-model="userRegisterInfo.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" :prop="validatorName.password">
          <el-input placeholder="请输入..." v-model="userRegisterInfo.password"></el-input>
        </el-form-item>
        <el-form-item label="角色" :prop="validatorName.userRole">
          <el-input placeholder="请输入..." v-model="userRegisterInfo.userRole"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="cancel('userRegisterInfo')">取 消</el-button>
          <el-button type="primary" @click="submit('userRegisterInfo')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { UserRegisterInfo } from "@/models/user-register-info";
import { ValidatorName } from "@/common/enums/validator-name";
import ValidatorRules from "@/utils/validator-rules";
import userLoginServices from "@/api/userLoginServices";

@Component({ components: {} })
export default class Register extends Vue {
  private dialogVisible: boolean = false;
  private userRegisterInfo: UserRegisterInfo = new UserRegisterInfo();
  private validatorName: any = ValidatorName;
  private validatorRules: any = ValidatorRules;

  handleClose() {
    this.dialogVisible = true;
  }
  openDialog() {
    this.dialogVisible = true;
  }
  cancel(userRegisterInfo: any) {
    this.dialogVisible = false;
    this.userRegisterInfo.userName = "";
    this.userRegisterInfo.password = "";
    this.userRegisterInfo.userRole = "";
    (this.$refs[userRegisterInfo] as any).resetFields();
  }
  submit(userRegisterInfo: any) {
    (this.$refs[userRegisterInfo] as any).validate(async (valid: any) => {
      if (!valid) {
        return;
      } else {
        const data = await userLoginServices.UserRegisterInfo(
          this.userRegisterInfo
        );
        this.dialogVisible = false;
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.buttonSub {
  width: 100%;
  height: 40px;
}
</style>