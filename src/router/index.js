import Vue from 'vue'
import VueRouter from 'vue-router'
import Log from '../pages/Log.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',//登录
    name: 'Log',
    component: Log
  },
  {
    path: '/index',//首页
    name: 'index',
    component: () => import('../pages/Index'),
    children: [{ path: '/index/student', component: () => import('../pages/Index/student/Student.vue') },//学生管理
    { path: '/index/StudentAdd', component: () => import('../pages/Index/student/StudentAdd.vue') },//添加学员

    { path: '/index/Staff', component: () => import('../pages/Index/staff/Staff.vue') },//在职人员
    { path: '/index/StaffAdd', component: () => import('../pages/Index/staff/StaffAdd.vue') },//添加职员

    { path: '/index/Capital', component: () => import('../pages/Index/capital/Capital.vue') },//收支详情
    { path: '/index/Addcapital', component: () => import('../pages/Index/capital/Addcapital.vue') },//添加款项

    { path: '/index/Facility', component: () => import('../pages/Index/facility/Facility.vue') },//现有设备
    { path: '/index/AddFacility', component: () => import('../pages/Index/facility/AddFacility.vue') },//采购设备

    { path: '/index/System', component: () => import('../pages/Index/system/System.vue') },//管理人员
    { path: '/index/AddSystem', component: () => import('../pages/Index/system/AddSystem.vue') },//添加管理人员

    { path: '/index/upload', component: () => import('../pages/Index/upload/Upload.vue') }]  //文件上传
    
  }
]

const router = new VueRouter({
  routes
})

export default router
