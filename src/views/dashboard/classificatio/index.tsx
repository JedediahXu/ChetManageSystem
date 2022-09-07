import { Button, message, Upload, Popconfirm, List, Skeleton, Modal, Form, Input, ConfigProvider } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { getDelete, getType } from "@/api/modules/login";
import React, { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import './index.less'
import { store } from "@/redux";

interface DataType {
	Id?: number;
	alias?: string;
	cate_photos?: string;
	is_delete?: string;
	name?: string;
	loading: boolean;
	describe: string;
}

const DataScreen = () => {
	const [fileList, setFileList] = useState<UploadFile[]>([]);
	const [initLoading, setInitLoading] = useState(true);
	const [uploading, setUploading] = useState(false);
	const [list, setList] = useState<DataType[]>([]);
	const [visible, setVisible] = useState(false);
	const [revise, setRevise] = useState(false);
	const [reviseId, setReviseId] = useState(0);
	const [form] = Form.useForm();
	const { TextArea } = Input;

	// * 加载数据
	const requestMenuList = async () => {
		const result: any = await getType();
		setList(result.data);
		setInitLoading(false);
	};

	useEffect(() => {
		requestMenuList()
	}, []);

	// * 新增文章&修改文章
	const getMenuList = async () => {

		const FromData = form.getFieldsValue()
		const formData = new FormData();
		for (var key in FromData) {
			if (!FromData[key]) {
				return message.error('请将必填项补充完整.')
			};
		}
		if (revise) {
			const token: string = store.getState().global.token;
			let myHeaders = new Headers();
			myHeaders.append("Authorization", token);
			//修改表单
			fileList.forEach(file => {
				formData.append('cate_photos', file as RcFile); //照片
				formData.append('name', FromData.title); //标题
				formData.append('describe', FromData.content); //内容
				formData.append('alias', FromData.title); //标题
				formData.append('Id', reviseId.toString()); //标题
			});

			setUploading(true);
			fetch('http://127.0.0.1:3007/my/article/updatecate', {
				method: 'POST',
				body: formData,
				headers: myHeaders,
			})
				.then(res => res.json())
				.then(json => {
					setFileList([]);
					message.success(`${json.message}`);
					form.resetFields()
					setRevise(true)
				})
				.catch(() => {
					message.error('upload failed.');
				})
				.finally(() => {
					setUploading(false);
				});
		} else {
			const token: string = store.getState().global.token;
			let myHeaders = new Headers();
			myHeaders.append("Authorization", token);
			//新增表单
			fileList.forEach(file => {
				formData.append('cate_photos', file as RcFile); //照片
				formData.append('name', FromData.title); //标题
				formData.append('describe', FromData.content); //内容
				formData.append('alias', FromData.title); //标题
			});
			setUploading(true);
			fetch('http://127.0.0.1:3007/my/article/addcates', {
				method: 'POST',
				body: formData,
				headers: myHeaders,
			})
				.then(res => res.json())
				.then(() => {
					setFileList([]);
					message.success('新增成功！');
					form.resetFields()
					setRevise(true)
				})
				.catch(() => {
					message.error('upload failed.');
				})
				.finally(() => {
					setUploading(false);
				});
		}
		setVisible(false)
		requestMenuList()
	};

	// * 修改分类
	const reviseList = (item: any) => {
		setVisible(true)
		setReviseId(item.Id)
		setRevise(true)
		form.setFieldsValue({
			title: item.name,
			content: item.describe,
			alias: item.alias,
			Id: item.Id
		});
	}

	// * 删除分类
	const deleteList = (item: any) => {
		setReviseId(item.Id)
	}
	const confirm = async () => {
		await getDelete(reviseId)
		message.success('删除成功！');
		requestMenuList()
	};

	// * 分类封面
	const articles: UploadProps = {
		onRemove: file => {
			const index = fileList.indexOf(file);
			const newFileList = fileList.slice();
			newFileList.splice(index, 1);
			setFileList(newFileList);
		},
		beforeUpload: file => {
			setFileList([...fileList, file]);
			return false;
		},
		fileList,
	};

	const setMenuList = () => {
		form.resetFields()
		setVisible(false)
	}

	return (
		<div>
			<div className='font-size'>新撰文章</div>
			<hr />
			<Button type="primary" onClick={() => setVisible(true)}>
				新增分类 😎
			</Button>
			<List
				className="demo-loadmore-list"
				loading={initLoading}
				itemLayout="horizontal"
				dataSource={list}
				renderItem={item => (
					<List.Item
						actions={[<a key="list-loadmore-edit" onClick={() => reviseList(item)}>修改</a>,
						<Popconfirm
							title="是否确定删除?"
							onConfirm={confirm}
							okText="Yes"
							cancelText="No"
						>
							<a key="list-loadmore-more" onClick={() => deleteList(item)}>删除</a>
						</Popconfirm>
						]}
					>
						<Skeleton avatar title={false} loading={item.loading} active>
							<List.Item.Meta
								title={item.name}
								description={item.describe}
							/>
						</Skeleton>
					</List.Item>
				)}
			/>
			<Modal
				title="新增类型 & 修改类型"
				centered
				visible={visible}
				onOk={getMenuList}
				onCancel={setMenuList}
				width={800}
			>
				<Form
					form={form}
					labelCol={{ span: 4 }}
					wrapperCol={{ span: 21 }}
					layout="horizontal"
				>
					<Form.Item label="分类名称" name="title" rules={[{ required: true, message: 'Please input your 分类名称!' }]} >
						<Input />
					</Form.Item>
					<Form.Item label="分类别名" name="alias" rules={[{ required: true, message: 'Please input your 分类别名!' }]} >
						<Input />
					</Form.Item>
					<Form.Item label="分类描述" name="content" rules={[{ required: true, message: 'Please input your 分类描述!' }]}>
						<TextArea rows={4} />
					</Form.Item>

					<Form.Item label="分类封面" name="xxx" rules={[{ required: true, message: 'Please input your 分类描述!' }]}>
						<Upload {...articles}>
							<Button icon={<UploadOutlined />}>上传分类照片</Button>
						</Upload>
					</Form.Item>
				</Form>
			</Modal>
		</div >
	);
};

export default DataScreen;
