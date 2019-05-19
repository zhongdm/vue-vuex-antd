const Mock = require('mockjs')

let loginInfo = [{
  id:1,
  name: 'miya',
  password: '123456'
}]
let menuList = [
  {
    id: '1',
    name: '信息详情',
    value: 'info',
    selected: true,
    url: '/info',
    icon: 'el-icon-plus',
    sort: 0,
    parent: ''
  },
  {
    id: '2',
    name: '系统设置',
    value: 'settings',
    url: '/settings',
    icon: "el-icon-plus",
    parent: '',
    children: [
      {
        id: '3',
        name: '用户管理',
        value: 'user',
        url: '/user',
        icon: "el-icon-plus",
      },
      {
        id: '4',
        name: '角色管理',
        value: 'role',
        url: '/role',
        icon: "el-icon-plus",
      },
      {
        id: '5',
        name: '菜单管理',
        value: 'menu',
        url: '/menu',
        icon: "el-icon-plus",
      },
      {
        id: '6',
        name: '权限管理',
        value: 'auth',
        url: '/auth',
        icon: "el-icon-plus",
      }
    ]
  }
]

let userPermission = [
  "settings:list",
  "settings:add"
]
let roleList = [{
  id: 1,
  name: '管理员',
  enName: 'Super_Admin'
},{
  id: 2,
  name: '主任',
  enName: 'Direc'
}]
let role = [{
  id: 1,
  name: '管理员',
  enName: 'Super_Admin'
},{
  id: 2,
  name: '主任',
  enName: 'Direc'
}]
let userList = [{
  id: 1,
  name: 'jack',
  loginName: 'SPER',
  pwd: '12',
  roleId: 1,
  isActive: true,
  cmId: 'api'
}, {
  id: 2,
  name: 'sam',
  loginName: 'sam',
  pwd: '12',
  roleListId: 2,
  cmId: 'api',
  isActive: true
}]
module.exports = function() {
  let data = Mock.mock({
    "loginInfo": loginInfo,
    "getMenuList": menuList,
    "getRoleList": roleList,
    "getUserList": userList
  })
  return data
}