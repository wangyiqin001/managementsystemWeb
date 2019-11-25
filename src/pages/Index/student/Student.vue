<template>
  <div class="wrapper">
    <p class="title">查看和管理学员</p>
    <el-card class="box-card">
      <el-select v-model="searchCategory" placeholder="请选择年级">
        <el-option
          v-for="item in options"
          :key="item.clsssname"
          :label="item.classname"
          :value="item.index"
        ></el-option>
      </el-select>&emsp;
      <el-input v-model="input" class="inp" placeholder="请输入查询关键字"></el-input>&emsp; &emsp; &emsp;
      <el-button type="success" size="mini" @click="clickSearchBtn">查询</el-button>

      <!-- 表格 -->
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column prop="id" label="学号" width="120"></el-table-column>
        <el-table-column prop="sex" label="性别" width="120"></el-table-column>
        <el-table-column prop="age" label="年龄" width="120"></el-table-column>
        <el-table-column prop="grade" label="班级" width="120"></el-table-column>
        <el-table-column prop="results" label="入学成绩" width="120"></el-table-column>
        <el-table-column prop="operation" label="操作" width="250">
          <template slot-scope="scope">
            <el-button @click="clickUpdate(scope.row)" type="text" size="small">修改</el-button>
            <el-button @click="clickRemove(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="changePage"
        :page-size="pageSize"
        :total="total"
      ></el-pagination>

    </el-card>
  </div>
</template>

<script>
import classname from "@/json/classname.json";
import { getstudentlist, studentdel } from "../../../api/api";
export default {
  data() {
    return {
      options: [],

      // dialogTableVisible: false,

      tableData: [], //表格数据
      pageSize: 5, //每页显示的条数
      total: 0, //数据的总条数
      input: "", //关键字
      searchCategory: -1, //要查询的分类信息

      options: [],
      currentpage: 1, //当前选中的页数

      Data: {
        name: "", //姓名
        id: 0, //ID
        sex: 0, //性别
        age: 0, //年龄
        grade: -1, //班级
        results: "" //入学成绩
      }
    };
  },

  created() {
    this.options = [{ classname: "全年级", index: -1 }, ...classname];
    this.getTableData(1);
  },
  methods: {
    changePage(pager) {
      //保存页码
      this.currentpage = pager;
      console.log(pager)
      //页数
      this.getTableData(pager);
    },

    getTableData(page, input = "", searchCategory = "") {
      getstudentlist(page, this.pageSize, input, searchCategory).then(res => {
        //数据数组
        let arr = res.data.data;
        //总条数
        this.total = res.data.total;

        function getCateGoryName(index) {
          for (let c of classname) {
            if (c.index == index) return c.classname;
          }
        }
        for (let obj of arr) {
          obj.grade = getCateGoryName(obj.grade);
          obj.sex = obj.sex == "1" ? "男" : "女";
        }
        this.tableData = arr;
      });
    },

    //点击搜索按钮
    clickSearchBtn() {
      this.getTableData(1, this.input, this.searchCategory);
    },

    //删除
    clickRemove(val) {
      console.log(val.id);

      this.$confirm("此操作将永久删除该数据, 是否继续?", "系统提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          studentdel(val.id).then(res => {
            if (res.data == "ok") {
              //数据删除成功
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              //再次请求本页数据
              this.getTableData(this.currentpage);
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
    }
  }
};
</script>

<style lang="less" scoped>
.el-table-column {
  display: flex;
}
.el-pagination {
  text-align: center;
}
.el-select {
  width: 150px;
}

.wrapper {
  .title {
    color: #999;
  }
  .box-card {
    .inp {
      width: 20%;
    }
  }
}
</style>