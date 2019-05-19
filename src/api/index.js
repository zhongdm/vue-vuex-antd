import axios from '@/common/request.js'
import { LOGIN, USER_LIST, ADD_USER, EDIT_USER, DELETE_USER,
          CHANGE_STATUS, CHANGE_PASSWORD, RESET_PASSWORD,
          ROLE_LIST, ADD_ROLE, EDIT_ROLE, DELETE_ROLE, ROLE_ALL,
          MENU_LIST, ADD_MENU, EDIT_MENU, DELETE_MENU,
          ROLE_BY_USER_ID, UPDATE_ROLE_BY_USER_ID, AUTH_MENU_BY_ROLE_ID, UPDATE_AUTH_MENU_BY_ROLE_ID } from './const'

export const login = params => {
  return new Promise((resolve, reject) => {
    axios.post(LOGIN, params).then(response => {
      resolve(response.data);
    }, err => {
      // resolve(defaultValue.login);
    })
      .catch((error) => {
        // resolve(defaultValue.login)
      })
  })
}

/** 用户管理 start */
export const getUsersList = params => {
  return new Promise((resolve, reject) => {
    axios.post(USER_LIST+'?t='+new Date().getTime().toString(), params).then(response => {
      resolve(response.data);
    }, err => {
      // resolve(defaultValue.login);
    })
      .catch((error) => {
        // resolve(defaultValue.login)
      })
  })
}

export const addUser = params => {
  return new Promise((resolve, reject) => {
    axios.post(ADD_USER, params).then(response => {
      resolve(response.data);
    }, err => {
      // resolve(defaultValue.login);
    })
      .catch((error) => {
        // resolve(defaultValue.login)
      })
  })
}

export const editUser = params => {
  return new Promise((resolve, reject) => {
    axios.post(EDIT_USER, params)
      .then(response => {
        resolve(response.data);
      }, err => {
        // resolve(defaultValue.login);
      })
      .catch((error) => {
        // resolve(defaultValue.login)
      })
  })
}

export const deleteUser = params => {
  return new Promise((resolve, reject) => {
    axios.delete(`${DELETE_USER}/${params}`)
      .then(response => {
      resolve(response.data);
    }, err => {
      // resolve(defaultValue.login);
    })
      .catch((error) => {
        // resolve(defaultValue.login)
      })
  })
}

export const changeStatus = params => {
  return new Promise((resolve, reject) => {
    axios.post(`${CHANGE_STATUS}/${params.action}/${params.id}`, {})
      .then(response => {
      resolve(response.data);
    }, err => {
      // resolve(defaultValue.login);
    })
      .catch((error) => {
        // resolve(defaultValue.login)
      })
  })
}

export const changePassword = params => {
  return new Promise((resolve, reject) => {
    axios.post(`${CHANGE_PASSWORD}`, params)
      .then(response => {
      resolve(response.data);
    }, err => {
      // resolve(defaultValue.login);
    })
      .catch((error) => {
        // resolve(defaultValue.login)
      })
  })
}

export const resetPwd = params => {
  return new Promise((resolve, reject) => {
    axios.post(`${RESET_PASSWORD}`, params)
      .then(response => {
      resolve(response.data);
    }, err => {
      // resolve(defaultValue.login);
    })
      .catch((error) => {
        // resolve(defaultValue.login)
      })
  })
}

/** 用户管理 end */

/** 角色管理 start */
export const getRoleList = params => {
  return new Promise((resolve, reject) => {
    axios.post(ROLE_LIST, params).then(response => {
      resolve(response.data);
    }, err => {
      // resolve(defaultValue.login);
    })
      .catch((error) => {
        // resolve(defaultValue.login)
      })
  })
}
ROLE_ALL
export const getRoleAll = params => {
  return new Promise((resolve, reject) => {
    axios.get(ROLE_ALL, params).then(response => {
      resolve(response.data);
    }, err => {
      // resolve(defaultValue.login);
    })
      .catch((error) => {
        // resolve(defaultValue.login)
      })
  })
}

export const addRole = params => {
  return new Promise((resolve, reject) => {
    axios.post(ADD_ROLE, params).then(response => {
      resolve(response.data);
    }, err => {
      // resolve(defaultValue.login);
    })
      .catch((error) => {
        // resolve(defaultValue.login)
      })
  })
}

export const editRole = params => {
  return new Promise((resolve, reject) => {
    axios.post(EDIT_ROLE, params).then(response => {
      resolve(response.data);
    }, err => {
      // resolve(defaultValue.login);
    })
      .catch((error) => {
        // resolve(defaultValue.login)
      })
  })
}

export const deleteRole = params => {
  return new Promise((resolve, reject) => {
    axios.post(`${DELETE_ROLE}/${params.id}`).then(response => {
      resolve(response.data);
    }, err => {
      // resolve(defaultValue.login);
    })
      .catch((error) => {
        // resolve(defaultValue.login)
      })
  })
}
/** 角色管理 end */

export const deleteMenu = params => {
  return new Promise((resolve, reject) => {
    axios.post(DELETE_MENU + '/' + params, {}).then(response => {
      resolve(response.data);
    }, err => {
      // resolve(defaultValue.login);
    })
      .catch((error) => {
        // resolve(defaultValue.login)
      })
  })
}

export const addMenu = params => {
  return new Promise((resolve, reject) => {
    axios.post(ADD_MENU+'?t='+new Date().getTime().toString(), params).then(response => {
      resolve(response.data);
    }, err => {
      // resolve(defaultValue.login);
    })
      .catch((error) => {
        // resolve(defaultValue.login)
      })
  })
}

export const editMenu = params => {
  return new Promise((resolve, reject) => {
    // let searchId = params.parent ? parent
    axios.post(EDIT_MENU+'?t='+new Date().getTime().toString(), params).then(response => {
      resolve(response.data);
    }, err => {
      // resolve(defaultValue.login);
    })
      .catch((error) => {
        // resolve(defaultValue.login)
      })
  })
}

export const getMenuList = params => {
  return new Promise((resolve, reject) => {
    axios.get(MENU_LIST, params).then(response => {
      resolve(response.data);
    }, err => {
      // resolve(defaultValue.login);
    })
      .catch((error) => {
        // resolve(defaultValue.login)
      })
  })
}


/** 权限 start */
export const getRoleByUserId = params => {
  return new Promise((resolve, reject) => {
    axios.get(`${ROLE_BY_USER_ID}/${params}`).then(response => {
      resolve(response.data);
    }, err => {
      // resolve(defaultValue.login);
    })
      .catch((error) => {
        // resolve(defaultValue.login)
      })
  })
}

export const updateRoleByUserId = params => {
  return new Promise((resolve, reject) => {
    axios.post(`${UPDATE_ROLE_BY_USER_ID}/${params.id}`, params.list).then(response => {
      resolve(response.data);
    }, err => {
      // resolve(defaultValue.login);
    })
      .catch((error) => {
        // resolve(defaultValue.login)
      })
  })
}


export const getMenuByRoleId = params => {
  return new Promise((resolve, reject) => {
    axios.get(`${AUTH_MENU_BY_ROLE_ID}/${params}`).then(response => {
      resolve(response.data);
    }, err => {
      // resolve(defaultValue.login);
    })
      .catch((error) => {
        // resolve(defaultValue.login)
      })
  })
}

export const updateMenuByRoleId = params => {
  return new Promise((resolve, reject) => {
    axios.post(`${UPDATE_AUTH_MENU_BY_ROLE_ID}/${params.roleId}`, params.list).then(response => {
      resolve(response.data);
    }, err => {
      // resolve(defaultValue.login);
    })
      .catch((error) => {
        // resolve(defaultValue.login)
      })
  })
}
/** 权限 end */