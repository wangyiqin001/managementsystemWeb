<template>
  <el-container>
    <el-header>
      <h2>XX补习中心管理系统</h2>
      <div>
        <img  @click="clickHead" 
          src="https://c-ssl.duitang.com/uploads/item/201810/18/20181018162951_kgwzm.thumb.700_0.jpeg"
          alt
        />
        <span @click="clickname">{{username}}</span>
      </div>
    </el-header>
    <el-container>
      <el-aside width="240px">
        <el-col>
          <el-menu
            default-active="/index/Student"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            unique-opened
            router
          >
            <el-submenu :index="item.path" v-for="item in menulist" :key="item.path">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.tabname}}</span>
              </template>
              <el-menu-item-group v-for="(obj) in item.tab" :key="obj.path">
                <el-menu-item :index="obj.path">{{obj.text}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-aside>
      <el-main>
        <!--右侧板块 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getToken } from "../api/api";
import tree from "../json/tree.json";
export default {
  data() {
    return {
      menulist: [],
      username: "请登录"
    };
  },
  created() {
    getToken(localStorage.token).then(res => {
      this.username = res.data == "timeout" ? "请登录" : localStorage.name;

      if (res.data != "timeout") {
        let arr = [];
        for (let obj of tree) {
          if (obj.userGroup.includes(localStorage.userGroup)) {
            arr.push(obj);
            this.menulist = arr;
          }
        }
      }
    });
  },
  methods: {
    clickname() {
      if (this.username == "请登录") {
        this.$router.history.push("/");
      }
    },
    //点击头像切换到上传文件
    clickHead(){
      this.$router.history.push('/index/upload')
    }
  }
};
</script>

<style lang="less" scoped>
.el-menu {
  border: none;
}
.el-container {
  height: 100%;
  width: 100%;
}
.el-header {
  padding: 0px 30px;
  font-weight: 400;
  color: aliceblue;
  width: 100%;
  height: 60px;
  background-color: rgb(170, 159, 159);
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }
}
.el-aside {
  width: 240px;
  height: 100%;
  background-color: #545c64;
}
</style>