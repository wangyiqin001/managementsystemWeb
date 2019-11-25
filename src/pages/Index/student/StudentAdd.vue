<template>
  <div>
    <h2>添加学员</h2>
    <el-form label-position="left" label-width="80px" :model="formLabelAlign">
      <el-form-item label="姓名">
        <el-input v-model="formLabelAlign.name"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio v-model="formLabelAlign.sex" label="1">男</el-radio>
        <el-radio v-model="formLabelAlign.sex" label="0">女</el-radio>
        <!-- <el-input v-model="formLabelAlign.sex"></el-input> -->
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="formLabelAlign.age"></el-input>
      </el-form-item>
      <el-form-item label="年级">
        <el-select v-model="formLabelAlign.grade" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.clsssname"
            :label="item.classname"
            :value="item.index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学习科目">
        <el-input v-model="formLabelAlign.classname"></el-input>
      </el-form-item>
      <el-form-item label="入学成绩">
        <el-input v-model="formLabelAlign.results"></el-input>
      </el-form-item>
      <el-form-item label="基本情况">
        <el-input v-model="formLabelAlign.studentDesc"></el-input>
      </el-form-item>
      <el-form-item label="合同价格">
        <el-input v-model="formLabelAlign.contractPrice"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="studentadd">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { addstudent } from "../../../api/api";
import classname from "@/json/classname.json";
export default {
  data() {
    return {
      formLabelAlign: {
        name: "",
        sex: "1",
        age: "",
        grade: 1,
        classname: "",
        results: "",
        studentDesc: "",
        contractPrice: ""
      },
      options: []
    };
  },
  created() {
    this.options = classname;
  },
  methods: {
    studentadd() {
      addstudent(this.formLabelAlign).then(res => {
        if (res.data == "ok") {
          this.$message({
            message: "学员信息添加成功！",
            type: "success"
          });
          this.formLabelAlign.name = "";
          this.formLabelAlign.sex = "";
          this.formLabelAlign.age = "";
          this.formLabelAlign.grade = "";
          this.formLabelAlign.classname = "";
          this.formLabelAlign.results = "";
          this.formLabelAlign.studentDesc = "";
          this.formLabelAlign.contractPrice = "";
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.el-form-item {
  margin: 5px;
  .el-input {
    width: 250px;
    margin: 5px;
  }
}
</style>