<template>
  <div>
    <div class="container_top">
      <div>
        <AddMovices @refreshDataList="refreshDataList" />
      </div>
      <div class="selectList">
        <el-select v-model="titleName" placeholder="请选择" @change="changeValue($event)">
          <el-option
            v-for="item in optionsList"
            :key="item.titleName"
            :label="item.titleName"
            :value="item.titleName"
          ></el-option>
        </el-select>
      </div>
    </div>
    <!-- 展示页面 -->
    <el-table :data="table" stripe height="480" v-loading="loading">
      <el-table-column label="电影名称" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.m_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上映时间" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.m_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="价格" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.m_price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="评分" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.m_evenation }}</span>
        </template>
      </el-table-column>
      <el-table-column label="描述" width="200" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.m_desc }}</span>
        </template>
      </el-table-column>
      <el-table-column label="图片" width="200" show-overflow-tooltip>
        <template slot-scope="scope">
          <div>
            <img :src="scope.row.m_img" style="width:50x;height:50px;" />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="是否显示轮播" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.m_swaper }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">添加图片</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页选择 -->
    <div class="page_size">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="currentSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalList"
      ></el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import AddMovices from "./add-movices.vue";
import eventInfoServices from "@/api/eventInfoServices";

@Component({
  components: {
    AddMovices
  }
})
export default class MovicesConfig extends Vue {
  private titleName: any = "";
  private optionsList: any = [];
  private table: any = [];
  private loading: boolean = false;
  private currentPage: number = 1;
  private totalList: number = 0;
  private currentSize: number = 5;
  private titleId: string = "";
  async mounted() {
    this.optionsList = await eventInfoServices.getTitleInfoList();
    this.titleName = this.optionsList[0].titleName;
    this.changeValue(this.titleName);
  }

  @Watch("titleName")
  titleNames(newVal: string) {
    this.currentPage = 1;
    this.currentSize = 5;
  }
  changeValue(e: string) {
    this.optionsList.forEach(async (element: any) => {
      if (e === element.titleName) {
        this.titleId = element._id;
        await this.getInit(element._id);  
      }
    });
  }
  handleEdit() {}
  handleDelete(e: any) {
    this.$confirm("确定删除", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(async () => {
        const data = await eventInfoServices.deleteMovicesInfoById(e._id);
        if (data) {
          this.changeValue(this.titleName);
          const messageInfo: any = {
            message: "删除电影" + e.m_name + "成功",
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
  refreshDataList(e: any) {
    this.titleName = e;
    this.changeValue(this.titleName);
  }

  async getInit(e: any) {
    const pageInfo: any = {};
    pageInfo.titleId = e;
    pageInfo.page = this.currentPage;
    pageInfo.size = this.currentSize;
    this.loading = true;
    const data: any = await eventInfoServices.getMovicesByTitleIdAndPageAndSize(
      pageInfo
    );
    this.table = data.val;
    this.totalList = data.total;
    this.loading = false;
  }
 async handleSizeChange(e: any) {
    this.loading = true;
    const pageInfo: any = {};
    pageInfo.titleId = this.titleId;
    pageInfo.page = this.currentPage;
    pageInfo.size = e;
    const data: any = await eventInfoServices.getMovicesByTitleIdAndPageAndSize(
      pageInfo
    );
    this.table = data.val;
    this.totalList = data.total;
    this.loading = false;
  }
  async handleCurrentChange(e: any) {
    this.loading = true;
    const pageInfo: any = {};
    pageInfo.titleId = this.titleId;
    pageInfo.page = e;
    pageInfo.size = this.currentSize;
    const data: any = await eventInfoServices.getMovicesByTitleIdAndPageAndSize(
      pageInfo
    );
    this.table = data.val;
    this.totalList = data.total;
    this.loading = false;
  }
}
</script>

<style lang="scss">
.container_top {
  display: flex;
  flex: 1;
  .selectList {
    margin-left: 10px;
  }
}
.page_size {
  float: right;
  margin-top: 10px;
}
</style>