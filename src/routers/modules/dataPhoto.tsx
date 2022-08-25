import React from "react";
import { LayoutIndex } from "@/routers/constant";
import { RouteObject } from "@/routers/interface";
import DataPhoto from "@/views/dataPhoto/index";
// dataPhoto 模块  dataPhoto
const formRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		children: [
			{
				path: "/dataPhoto/index",
				element: <DataPhoto />,
				meta: {
					requiresAuth: true,
					title: "照片上传",
					key: "dataPhoto"
				}
			}
		]
	}
];

export default formRouter;
