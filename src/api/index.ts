import request from "../utils/request";

export const loginMethod = (data) => {
  return request({
    url: "/api/user/login",
    method: "post",
    data: data,
  });
};

export const getUser = (userName, index, size) => {
  return request({
    //url: "./mock/user.json",
    url:
      "/api/user/getusers?userName=" +
      userName +
      "&pageIndex=" +
      index +
      "&pageSize=" +
      size,
    method: "get",
  });
};

export const saveorupdateuser = (data) => {
  return request({
    url: "/api/user/saveorupdateuser",
    method: "post",
    data: data,
  });
};

export const deluser = (id) => {
  return request({
    url: "/api/user/deluser?id=" + id,
    method: "get",
  });
};

export const getRoleOpts = () => {
  return request({
    url: "/api/user/getroleopts",
    method: "get",
  });
};

export const getRole = (roleName, account, index, size) => {
  return request({
    url:
      "/api/user/rolepermiss?roleName=" +
      roleName +
      "&account=" +
      account +
      "&pageIndex=" +
      index +
      "&pageSize=" +
      size,
    method: "get",
  });
};

export const saveorupdaterole = (data) => {
  return request({
    url: "/api/user/saveorupdaterole",
    method: "post",
    data: data,
  });
};

export const delrole = (id) => {
  return request({
    url: "/api/user/delrole?id=" + id,
    method: "get",
  });
};

export const saveorupdatepermiss = (data) => {
  return request({
    url: "/api/user/saveorupdatepermiss",
    method: "post",
    data: data,
  });
};
