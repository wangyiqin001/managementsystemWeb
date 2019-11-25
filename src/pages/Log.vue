<template>
  <div class="banner">
    <div class="logbox">
      <h2>登录</h2>
      <p>
        账号:
        <el-input placeholder="请输入账号" class v-model="input" clearable></el-input>
      </p>
      <p>
        密码:
        <el-input placeholder="请输入密码" v-model="pwd" show-password></el-input>
      </p>
      <p class="show-p" v-show="show">账号或密码错误！请重新输入！</p>
      <el-button type="success" @click="clicklog">登录</el-button>
    </div>
  </div>
</template>

<script>
import { login } from "../api/api";
export default {
  data() {
    return {
      input: "",
      pwd: "",
      show: false,
      flang: true
    };
  },
  methods: {
    clicklog() {
      if (this.flang == true) {
        login(this.input, this.pwd).then(res => {
          if (res.data.msg == "ok") {
            localStorage.token = res.data.token;
            localStorage.name = res.data.name;
            localStorage.userGroup = res.data.userGroup;
            this.$router.push({ path: "/index/Student" });
          } else {
            this.show = true;
          }
          this.flang=false
          setTimeout(()=>{this.flang=true},3000)
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.el-input {
  width: 250px;
  margin: 10px 0;
}
.banner {
  width: 100%;
  height: 100%;
  background: url("../assets/imgs/banner.jpg");
  background-size: 100% 100%;
  height: 100%;
  position: fixed;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .logbox {
    margin-right: 80px;
    width: 340px;
    height: 300px;
    background-color: aliceblue;
    text-align: center;
    padding: 10px;
    .show-p {
      font-size: 12px;
      color: red;
    }
  }
}
</style>