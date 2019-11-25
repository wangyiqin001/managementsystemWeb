import axios from 'axios'

export const ip = 'http://localhost:3000'

//login 
export function login(acc, pwd) {
   return axios.post(ip + '/login', { acc, pwd })
}

//验证Token
export function getToken(token) {
   return axios.get(ip + '/gettoken', { params: { token } })
}

//获取学生信息表
export function getstudentlist(page, pagecell, searchName, searchCategory) {
   return axios.post(ip + '/getstudentlist', { pagecell, page, searchName, searchCategory })
}

//添加学员
export function addstudent(formLabelAlign) {
   return axios.get(ip + '/addstudent', { params: formLabelAlign })
}

//删除学员
export function studentdel(id) {
   return axios.get(ip + '/studentdel', { params: { id } })
}



//accountadd    添加账户 
export function accountadd(acc, pwd, name, ug) {
   return axios.post(ip + '/accountadd', { acc, pwd, name, ug })
}


//accountadd    管理员账户列表 
export function account() {
   return axios.post(ip + '/account')
}


//accountadd    删除管理员 
export function accountdel(id) {
   return axios.get(ip + '/accountdel', { params: { id } })
}
