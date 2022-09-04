import { Button } from "antd";
import { getAuthorButtons } from "@/api/modules/login";

const DataScreen = () => {
	const requestMenuList = async () => {
		const res = await getAuthorButtons();
		console.log(res);
	};
	return (
		<div className="content-box">
			<span className="text">后期开发！ 🍓🍇🍈🍉</span>
			<Button type="primary" onClick={requestMenuList}>
				😎😎😎
			</Button>
		</div>
	);
};

export default DataScreen;
