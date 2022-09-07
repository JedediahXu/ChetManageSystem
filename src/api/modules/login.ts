import { Login } from "@/api/interface/index";
import { PORT1, PORT3, PORT4 } from "@/api/config/servicePort";
import qs from "qs";

import http from "@/api";

/**
 * @name 登录模块
 */
// * 用户登录接口
export const loginApi = (params: Login.ReqLoginForm) => {
	return http.post<Login.ResLogin>(`/abc` + PORT3 + `/login`, qs.stringify(params));
	return http.post<Login.ResLogin>(`/api` + PORT1 + `/login`, {}, { params }); // post 请求携带 query 参数  ==>  ?username=admin&password=123456
	return http.post<Login.ResLogin>(`/abc` + PORT3 + `/login`, qs.stringify(params)); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
	return http.post<Login.ResLogin>(`/api` + PORT1 + `/login`, params, { headers: { noLoading: true } }); // 控制当前请求不显示 loading
};

// * 获取按钮权限
export const getType = () => {
	return http.get(`/abc` + PORT3 + `/article/cates`);
};

// * 删除分类
export const getDelete = (Id: any) => {
	return http.get(`/abc` + PORT4 + `/article/deletecate/${Id}`);
};


// * 友情链接
export const getLint = (params: undefined) => {
	return http.post(`/abc` + PORT4 + `/article/addLink`, qs.stringify(params));
};


// * 获取按钮权限
export const getAuthorButtons = () => {
	return http.get(`/abc` + PORT3 + `/buttons`);
};

// * 获取菜单列表
export const getMenuList = () => {
	return http.get(`/abc` + PORT3 + `/list`);
};
