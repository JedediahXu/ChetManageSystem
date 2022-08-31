import { Button } from "antd";
import { getAuthorButtons } from "@/api/modules/login";

const DataScreen = () => {
	const requestMenuList = async () => {
		const res = await getAuthorButtons();
		console.log(res);
	};
	return (
		<div>
			<div className='font-size'>新撰文章</div>
			<hr />
			<span className="text">超级看板内容填充 🍓🍇🍈🍉</span>
			<Button type="primary" onClick={requestMenuList}>
				点我发起网络请求 😎
			</Button>
		</div>
	);
};

export default DataScreen;
