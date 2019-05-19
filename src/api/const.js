const proxy = '/api/1.0/web'

export const LOGIN = proxy + '/login'

export const DELETE_MENU = proxy + '/menu/delete'
export const MENU_LIST = proxy + '/menu/read/list'
export const ADD_MENU = proxy + '/menu/add'
export const EDIT_MENU = proxy + '/menu/update'

export const AUTH_MENU_BY_ROLE_ID = proxy + '/auth/role/menu'
export const UPDATE_AUTH_MENU_BY_ROLE_ID = proxy + '/auth/role/menu/update'

export const USER_LIST = proxy + '/account/read/list'
export const ADD_USER = proxy + '/account/add'
export const EDIT_USER = proxy + '/account/updates'
export const DELETE_USER = proxy + '/account'
export const CHANGE_STATUS = proxy + '/account'
export const CHANGE_PASSWORD = proxy + '/account/updatePwd'
export const RESET_PASSWORD = proxy + '/account/updatePwd'

export const ROLE_ALL = proxy + '/role/read/all'
export const ROLE_LIST = proxy + '/role/read/list'
export const ADD_ROLE = proxy + '/role/update'
export const EDIT_ROLE = proxy + '/role/update'
export const DELETE_ROLE = proxy + '/role/delete'

export const ROLE_BY_USER_ID = proxy + '/auth/user/role'
export const UPDATE_ROLE_BY_USER_ID = proxy + '/auth/user/role/update'
