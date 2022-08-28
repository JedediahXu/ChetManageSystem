import axios from "axios";
import { useState } from "react";
import { Editor, Viewer } from '@bytemd/react'
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'
import breaks from '@bytemd/plugin-breaks'
import footnotes from '@bytemd/plugin-footnotes'
import frontmatter from '@bytemd/plugin-frontmatter'
import gemoji from '@bytemd/plugin-gemoji'
import mediumZoom from '@bytemd/plugin-medium-zoom'
import mermaid from '@bytemd/plugin-mermaid'
import mathssr from '@bytemd/plugin-math-ssr'
import zhHans from 'bytemd/locales/zh_Hans.json'
import gfmLocale from '@bytemd/plugin-gfm/locales/zh_Hans.json';
import mathLocale from '@bytemd/plugin-math/locales/zh_Hans.json';
import mermaidLocale from '@bytemd/plugin-mermaid/locales/zh_Hans.json';
import 'highlight.js/styles/vs.css'
import "./index.less";
import 'bytemd/dist/index.css'
import { marked } from 'marked'
import math from "@bytemd/plugin-math";
import './juejin.scss'
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';


const DataMd = () => {
	const plugins = [gfm({ locale: gfmLocale }), gemoji(), highlight(), math(), mermaid({ locale: mermaidLocale }),
	mathssr({ locale: mathLocale }), mediumZoom(), breaks(), footnotes(), frontmatter()];

	const [value, setValue] = useState('');
	let handleClick = async () => {
		let html = marked(value)
	};



	interface Image {
		url: string
		title: string
		alt: string
		<T = any>(date: T): Promise<T>
	}



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
	let removeClick = () => {
		settextvalue('')
	}


	const [fileList, setFileList] = useState<UploadFile[]>([]);
	const [uploading, setUploading] = useState(false);

	const handleUpload = () => {
		const formData = new FormData();
		fileList.forEach(file => {
			formData.append('cover_img', file as RcFile);
			formData.append('title', 'xxx标题');
			formData.append('content', 'xxx标题');
			formData.append('state', '已发布');
			formData.append('cate_id', '2');
			formData.append('author_id', 'RN');
			formData.append('introduce', 'xxx标题')
		});
		setUploading(true);
		// You can use any AJAX library you like
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





	return (
		<div>
			<Upload {...articles}>
				<Button icon={<UploadOutlined />}>Select File</Button>
			</Upload>
			<Button
				type="primary"
				onClick={handleUpload}
				disabled={fileList.length === 0}
				loading={uploading}
				style={{ marginTop: 16 }}
			>
				{uploading ? 'Uploading' : 'Start Upload'}
			</Button>
			<Button type="primary" onClick={handleClick} htmlType="submit" >
				输出
			</Button>
			<Upload {...props}>
				<Button icon={<UploadOutlined />}>Click to Upload</Button>
			</Upload>
			<Button type="primary" onClick={removeClick} htmlType="submit" >
				清除照片
			</Button>
			<div>{textvalue}</div>
			<div className="page-wrap" >
				<Editor
					locale={zhHans}
					value={value}
					plugins={plugins}
					onChange={v => setValue(v)}
				/>
			</div>
		</div>
	)
}

export default DataMd;
