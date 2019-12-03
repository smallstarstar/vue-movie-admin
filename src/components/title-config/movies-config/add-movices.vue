<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" @click="open()">添 加</el-button>
    <el-dialog
      title="添加信息"
      :visible.sync="dialogVisible"
      width="60%"
      :show-close="false"
      :before-close="handleClose"
    >
      <el-form :model="movicesInfo" ref="movicesInfo">
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="选择电影类型">
              <el-select
                v-model="movicesInfo.titleName"
                placeholder="请选择"
                @change="changeValue($event)"
              >
                <el-option
                  v-for="item in optionsList"
                  :key="item.titleName"
                  :label="item.titleName"
                  :value="item.titleName"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="名称">
              <el-input placeholder="请输入" v-model="movicesInfo.m_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="上映时间">
              <el-input placeholder="请输入" v-model="movicesInfo.m_time"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="价格">
              <el-input placeholder="请输入" v-model="movicesInfo.m_price"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="评分">
              <el-input placeholder="请输入" v-model="movicesInfo.m_evenation"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否轮播">
              <el-switch
                style="display: block"
                v-model="slides"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="是"
                inactive-text="否"
                @change="switchButtoon($event)"
              ></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="简述">
              <el-input
                type="textarea"
                placeholder="请输入"
                resize="none"
                rows="4"
                v-model="movicesInfo.m_desc"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-upload
              ref="upload"
              class="upImg"
              action
              :auto-upload="false"
              list-type="picture-card"
              :on-remove="handleRemove"
              :on-change="changeImg"
              multiple
              :limit="1"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-col>
        </el-row>
        <el-form-item>
          <div class="button_group">
            <el-button @click="cancel('movicesInfo')">取 消</el-button>
            <el-button type="primary" @click="submit('movicesInfo')">确 定</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import eventInfoServices from "@/api/eventInfoServices";
import { ValidatorName } from "@/common/enums/validator-name";
import ValidatorRules from "@/utils/validator-rules";

@Component({ components: {} })
export default class AddMovices extends Vue {
  private value: string = "";
  private dialogVisible: boolean = false;
  private slides: boolean = false;
  private optionsList: any = [];
  private movicesInfo: any = {};
  async mounted() {
    this.optionsList = await eventInfoServices.getTitleInfoList();
  }
  changeValue(e: any) {
    this.optionsList.forEach((element: any) => {
      if (e === element.titleName) {
        this.movicesInfo.title_id = element._id;
      }
    });
  }
  handleClose() {
    this.dialogVisible = true;
  }
  open() {
    this.dialogVisible = true;
  }
  cancel() {
    this.dialogVisible = false;
    this.movicesInfo = {};
    (this.$refs.upload as any).clearFiles();
  }
  changeImg(file: any) {
    const files = [];
    files.push(file.raw);
    const render = new FileReader();
    render.readAsDataURL(file.raw);
    render.onload = (e: any) => {
      const dataImg = e.target.result;
      this.movicesInfo.m_img = dataImg;
    };
  }
  handleRemove() {}
  async submit() {
    this.movicesInfo.m_swaper = this.slides;
    const data = await eventInfoServices.addMovicesInfo(this.movicesInfo);
    if (data) {
      (this.$refs.upload as any).clearFiles();
      const messageInfo: any = {
        message: "添加信息成功",
        type: "success",
        position: "bottom-right"
      };
      this.$notify(messageInfo);
      // 子组件传递值到父组件刷新数据
      this.$emit("refreshDataList", this.movicesInfo.titleName);
      this.movicesInfo = {};
      this.dialogVisible = false;
      this.slides = false;
    }
  }
  switchButtoon(e: boolean) {
    this.slides = e;
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-switch {
  margin-top: 45px;
}
</style>