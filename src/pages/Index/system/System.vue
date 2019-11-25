<template>
  <div class="system">
    <h2>管理人员信息</h2>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="account" label="账号" width="180"></el-table-column>
      <el-table-column prop="userGroup" label="级别" width="180"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="clickUpdate(scope.row)" type="text" size="small">修改</el-button>
          <el-button @click="accountdel(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { account, accountdel } from "../../../api/api";
import userGrouparr from "../../../json/userGrouparr.json";
var categoryObj = {}; //身份级别对象
export default {
  data() {
    return {
      tableData: []
    };
  },
  created() {
    this.getlist();
  },
  methods: {
    accountdel(val) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "系统提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          accountdel(val.id).then(res => {
            if (res.data == "ok") {
             this.getlist();
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              //再次请求本页数据
            }
          });
        })
        .catch(() => {
          //点击取消
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    getlist() {
      account().then(res => {
        let arr = res.data;

        function getname(index) {
          for (let c of userGrouparr) {
            if (c.index == index) return c.name;
          }
        }
        for (let item of arr) {
          item.userGroup = getname(item.userGroup);
        }
        this.tableData = arr;
      });
    }
  }
};
</script>
<style lang="less" scoped>
.system {
  padding: 30px;
}
</style>