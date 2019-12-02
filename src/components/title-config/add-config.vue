<template>
  <div>
    <el-input style="width:30%" v-model="titleName" placeholder="请输入...." @keyup.enter.native="addTitle()"></el-input>&nbsp;&nbsp;&nbsp;
    <el-button @click="submit" type="primary">提 交</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";
import TimeFormat from "@/utils/timeFormat";
import eventInfoServices from "@/api/eventInfoServices";
import rxevent from 'pubsub-js';
import EventKeys from '@/common/event-keys/eventKeys';


@Component({ components: {} })
export default class AddConfig extends Vue {
  @Getter("userInfo")
  userInfo!: any;
  private titleName: string = "";
  private timeFormat: any = TimeFormat;
 async addTitle() {
    await this.submit();
  }
  async submit() {
    const obj: any = {};
    obj.titleName = this.titleName;
    obj.time = this.timeFormat.getCurrentTime();
    obj.personId = this.userInfo._id;
    obj.perosn = this.userInfo.userName;
    const data = await eventInfoServices.saveTitelInfo(obj);
    if (data) {
      const messageInfo: any = {
        message: "添加标题名称成功",
        type: "success",
        position: "bottom-right"
      };
      this.$notify(messageInfo);
      this.titleName = "";
      // 刷新table数据
      rxevent.publish(EventKeys.REFRESHTITLEEVENT, true);
    }
  }
}
</script>