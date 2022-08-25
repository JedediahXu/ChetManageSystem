import React from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import { LayoutIndex } from "@/routers/constant";
import { RouteObject } from "@/routers/interface";

// article 模块
const dashboardRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		meta: {
			title: "文章撰写"
		},
		children: [
			{
				path: "/article/classification",
				element: lazyLoad(React.lazy(() => import("@/views/dashboard/classificatio/index"))),
				meta: {
					requiresAuth: true,
					title: "分类管理",
					key: "classification"
				}
			},
			{
				path: "/article/newarticle",
				element: lazyLoad(React.lazy(() => import("@/views/dashboard/newarticle/index"))),
				meta: {
					requiresAuth: true,
					title: "新撰文章",
					key: "newarticle"
				}
			}
		]
	}
];

export default dashboardRouter;
