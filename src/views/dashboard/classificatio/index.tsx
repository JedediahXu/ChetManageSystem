import { getAuthorButtons, getType } from "@/api/modules/login";
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { Button, message, Upload, List, Skeleton, Modal, Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import './index.less'

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
	const [uploading, setUploading] = useState(false);
	const [visible, setVisible] = useState(false);
	const [form] = Form.useForm();
	const { TextArea } = Input;

	// * 新增文章请求接口
	const getMenuList = async () => {
		setVisible(false)
		const FromData = form.getFieldsValue()
		console.log(FromData);
		const formData = new FormData();
		fileList.forEach(file => {
			formData.append('cate_photos', file as RcFile); //照片
			formData.append('name', FromData.title); //标题
			formData.append('describe', FromData.content); //内容
			formData.append('alias', FromData.title); //标题
		});
		setUploading(true);
		fetch('http://127.0.0.1:3007/api/article/addcates', {
			method: 'POST',
			body: formData,
		})
			.then(res => res.json())
			.then(() => {
				setFileList([]);
				message.success('upload successfully.');
				form.resetFields()
			})
			.catch(() => {
				message.error('upload failed.');
			})
			.finally(() => {
				setUploading(false);
			});
		// 	const res = await getAuthorButtons();
		console.log('新增文章');
	};

	const [initLoading, setInitLoading] = useState(true);
	const [list, setList] = useState<DataType[]>([]);

	const requestMenuList = async () => {
		const result: any = await getType();
		setList(result.data);
		setInitLoading(false);
	};

	useEffect(() => {
		requestMenuList()
	}, []);

	let reviseList = () => {
		console.log('111');
	}

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
						actions={[<a key="list-loadmore-edit" onClick={reviseList}>修改</a>, <a key="list-loadmore-more">删除</a>]}
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
				title="新增类型"
				centered
				visible={visible}
				onOk={getMenuList}
				onCancel={() => setVisible(false)}
				width={800}
			>
				<Form
					form={form}
					labelCol={{ span: 4 }}
					wrapperCol={{ span: 21 }}
					layout="horizontal"
				>
					<Form.Item label="分类名称" name="title" >
						<Input />
					</Form.Item>
					<Form.Item label="分类别名" name="alias" >
						<Input />
					</Form.Item>
					<Form.Item label="分类描述" name="content">
						<TextArea rows={4} />
					</Form.Item>

					<Form.Item label="分类封面">
						<Upload {...articles}>
							<Button icon={<UploadOutlined />}>上传分类照片</Button>
						</Upload>
					</Form.Item>

				</Form>
			</Modal>
		</div>
	);
};

export default DataScreen;
