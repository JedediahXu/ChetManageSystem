import { Button, message, Checkbox, Form, Input } from 'antd';
import { getLint } from "@/api/modules/login";

const DataScreen = () => {
	const [form] = Form.useForm();
	const onFinish = async (values: any) => {
		console.log('Success:', values);
		const res: any = await getLint(values);
		message.success(`${res.message}`)
		form.resetFields()
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};


	return (
		<div>
			<div className='font-size'>友情链接</div>
			<hr />
			<Form
				form={form}
				name="basic"
				labelCol={{ span: 1 }}
				wrapperCol={{ span: 6 }}
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				<Form.Item
					label="名称"
					name="title"
					rules={[{ required: true, message: 'Please input your title!' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="链接"
					name="link"
					rules={[{ required: true, message: 'Please input your link!' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item wrapperCol={{ offset: 1, span: 6 }}>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Form.Item>
			</Form>
		</div>

	);
};

export default DataScreen;
