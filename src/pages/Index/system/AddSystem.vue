<template>
  <div class="system">
    <h2>添加管理人员账户</h2>
    <div>
      <p>
        姓名:
        <el-input placeholder="请输入姓名" class v-model="name" clearable></el-input>
      </p>
      <p>
        账号:
        <el-input
          :rules="[
      { required: true, message: '账号不能为空'},
      { type: 'number', message: '必须为数字'}
    ]"
          placeholder="请输入账号"
          class
          v-model="acc"
          clearable
        ></el-input>
      </p>
      <p>
        密码:
        <el-input placeholder="请输入密码" v-model="pwd" show-password></el-input>
      </p>
      <p>
        密码:
        <el-input placeholder="请再次输入密码" v-model="pwdex" show-password></el-input>
      </p>
      <div class="register">
        <el-select v-model="ug" placeholder="选择账户级别">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button type="success" @click="account">注册</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { accountadd } from "../../../api/api";
export default {
  data() {
    return {
      name: "",
      acc: "",
      pwd: "",
      pwdex: "",
      ug: "1",
      options: [
        {
          value: "0",
          label: "超级管理员"
        },
        {
          value: "1",
          label: "管理员"
        },
        {
          value: "2",
          label: "职员"
        }
      ],
      value: ""
    };
  },
  methods: {
    account() {
      accountadd(this.acc, this.pwd, this.name, this.ug).then(res => {
        if (res.data == "ok") {
          alert("注册成功");
          this.$router.push({ path: "/index/System" });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.system {
  padding: 30px;
}
.el-input {
  width: 250px;
  margin: 7px;
}
.register {
  margin: 10px 0 10px 50px;
  .el-select {
    width: 250px;
    margin-right: 20px;
  }
}
</style>