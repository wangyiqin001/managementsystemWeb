<template>
    <div>
        <h1>头像上传</h1>

        <!--    
            action: 表示文件上传到哪个服务器中
            on-success: 文件上传成功的回调函数
            before-upload: 文件上传之前的回调函数
         -->
        <el-upload
        class="avatar-uploader"
        :action="ip"
        :show-file-list="false"
        :on-success="handleAvatarSuccess">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </div>
</template>

<script>
import { ip } from '../../../api/api'

export default {
  data() {
    return {
      imageUrl: "",
      uploadData: {}    //上传时携带的参数
    };
  },
  created(){
      this.uploadData = {
          id: 'xxx',
          name: 'xxx',
          a: 'xxx'
      }
      console.log(this.uploadData)
  },
  methods: {
    //文件上传成功的回调函数
    handleAvatarSuccess(res, file) {
      this.imageUrl = ip + '/' + res
      //用vuex去改变右上角的头像

      //服务器返回的图片地址
      console.log(res);
    }
  },
  computed: {
      ip(){
          //怎么在post上传文件时携带额外的参数
          return ip + '/upload?acc=' + localStorage.acc
      }
  }
};
</script>

<style lang="less" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>