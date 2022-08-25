import React from "react";
import { LayoutIndex } from "@/routers/constant";
import { RouteObject } from "@/routers/interface";
import DataMaobox from "@/views/dataMaobox/index";
// dataMaobox 模块  dataMaobox
const formRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		children: [
			{
				path: "/dataMaobox/index",
				element: <DataMaobox />,
				meta: {
					requiresAuth: true,
					title: "轨迹地图",
					key: "dataMaobox"
				}
			}
		]
	}
];

export default formRouter;
