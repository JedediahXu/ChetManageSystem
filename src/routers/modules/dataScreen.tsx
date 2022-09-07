import React from "react";
import { LayoutIndex } from "@/routers/constant";
import { RouteObject } from "@/routers/interface";
import DataScreen from "@/views/dataScreen/index";
// 数据大屏模块
const dataScreenRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		children: [
			{
				path: "/dataScreen/index",
				element: <DataScreen />,
				meta: {
					requiresAuth: true,
					title: "友情链接",
					key: "dataScreen"
				}
			}
		]
	}
];

export default dataScreenRouter;
