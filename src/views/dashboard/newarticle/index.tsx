import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import mermaidLocale from '@bytemd/plugin-mermaid/locales/zh_Hans.json';
import mathLocale from '@bytemd/plugin-math/locales/zh_Hans.json';
import gfmLocale from '@bytemd/plugin-gfm/locales/zh_Hans.json';
import frontmatter from '@bytemd/plugin-frontmatter'
import mediumZoom from '@bytemd/plugin-medium-zoom'
import { UploadOutlined } from '@ant-design/icons';
import footnotes from '@bytemd/plugin-footnotes'
import highlight from '@bytemd/plugin-highlight'
import { Editor, Viewer } from '@bytemd/react'
import {
	Button, message, Upload, Cascader,
	DatePicker, Form, Input, InputNumber,
	Radio, Select, Switch, TreeSelect,
} from 'antd';
import { useState } from "react";
import { marked } from 'marked'
import gfm from '@bytemd/plugin-gfm'
import breaks from '@bytemd/plugin-breaks'
import math from "@bytemd/plugin-math";
import gemoji from '@bytemd/plugin-gemoji'
import mermaid from '@bytemd/plugin-mermaid'
import mathssr from '@bytemd/plugin-math-ssr'
import zhHans from 'bytemd/locales/zh_Hans.json'
import 'highlight.js/styles/vs.css'
import 'bytemd/dist/index.css'
import './index.scss'

type SizeType = Parameters<typeof Form>[0]['size'];


const DataMd = () => {
	const plugins = [gfm({ locale: gfmLocale }), gemoji(), highlight(), math(), mermaid({ locale: mermaidLocale }),
	mathssr({ locale: mathLocale }), mediumZoom(), breaks(), footnotes(), frontmatter()];

	const [value, setValue] = useState('');
	let handleClick = async () => {
		let html = marked(value)
		console.log(html);
	};

	const [textvalue, settextvalue] = useState('');
	const props: UploadProps = {
		name: 'photo',
		action: 'http://127.0.0.1:3007/api/article/mdPhoto',
		headers: {
			authorization: 'authorization-text',
		},
		showUploadList: false,
		onChange(info) {
			if (info.file.status !== 'uploading') {
				settextvalue(`![${info.file.response.name}](${info.file.response.data})`)
			}
		},
	};

	//清空html元素
	let removeClick = () => {
		settextvalue('')
	}

	const [fileList, setFileList] = useState<UploadFile[]>([]);
	const [uploading, setUploading] = useState(false);
	const handleUpload = () => {
		const formData = new FormData();
		fileList.forEach(file => {
			formData.append('cover_img', file as RcFile); //照片
			formData.append('title', 'xxx标题'); //标题
			formData.append('content', 'xxx标题'); //内容
			formData.append('state', '已发布'); //状态
			formData.append('cate_id', '2'); //分类id
			formData.append('author_id', 'RN'); //分类
			formData.append('introduce', 'xxx标题') //主题标题
		});
		setUploading(true);
		fetch('http://127.0.0.1:3007/api/article/addArticle', {
			method: 'POST',
			body: formData,
		})
			.then(res => res.json())
			.then(() => {
				setFileList([]);
				message.success('upload successfully.');
			})
			.catch(() => {
				message.error('upload failed.');
			})
			.finally(() => {
				setUploading(false);
			});
	};
	
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

	const { TextArea } = Input;

	const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');

	const onFormLayoutChange = ({ size }: { size: SizeType }) => {
		setComponentSize(size);
	};


	return (
		<div>
			<div>我是一个标题</div>
			<hr />
			<div className='outer-style'>
				<Form
					labelCol={{ span: 4 }}
					wrapperCol={{ span: 21 }}
					layout="horizontal"
					initialValues={{ size: componentSize }}
					onValuesChange={onFormLayoutChange}
					size={componentSize as SizeType}
				>
					<Form.Item label="标题">
						<Input />
					</Form.Item>
					<Form.Item label="文章描述">
						<TextArea rows={4} />
					</Form.Item>
					<Form.Item label="分类">
						<Select>
							<Select.Option value="demo">Demo</Select.Option>
						</Select>
					</Form.Item>
					<Form.Item label="封面">
						<Upload {...articles}>
							<Button icon={<UploadOutlined />}>上传文章标题照片</Button>
						</Upload>
					</Form.Item>
					<Form.Item label="文章照片">
						<Upload {...props}>
							<Button icon={<UploadOutlined />}>上传照片</Button>
						</Upload>
						<Button className='button-Center-left' type="primary" onClick={removeClick} htmlType="submit" >
							清除照片
						</Button>
					</Form.Item>
					<Form.Item label="图片链接">
						<div>{textvalue}</div>
					</Form.Item>
					<Form.Item label="文章内容">
						<Editor
							locale={zhHans}
							value={value}
							plugins={plugins}
							onChange={v => setValue(v)}
						/>
					</Form.Item>

					<Form.Item label="提交">
						<Button type="primary" onClick={handleClick} htmlType="submit" >
							打印md
						</Button>
						<Button
							className='button-Center-left'
							type="primary"
							onClick={handleUpload}
							disabled={fileList.length === 0}
							loading={uploading}
						>
							{uploading ? '点击提交' : '请转换MD'}
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div >
	)
}

export default DataMd;
