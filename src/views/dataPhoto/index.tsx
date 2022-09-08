import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { store } from "@/redux";
import './index.less'

import React, { useState } from 'react';

const DataScreen = () => {

	const [fileList, setFileList] = useState<UploadFile[]>([]);
	const [uploading, setUploading] = useState(false);

	const handleUpload = () => {
		if (fileList.length > 2) {
			message.error('一次只能上传,一张图片和一张缩略图！');
			return
		}
		let firstSize = fileList[0].size!
		let secondSize = fileList[1].size!
		if (firstSize > secondSize) {
			const token: string = store.getState().global.token;
			let myHeaders = new Headers();
			myHeaders.append("Authorization", token);
			const formData = new FormData();
			formData.append('photo', fileList[0] as RcFile);
			formData.append('thumbnail_photo', fileList[1] as RcFile);
			setUploading(true);
			fetch(`/abc`+`/my/article/addPhoto`, {
				method: 'POST',
				body: formData,
				headers: myHeaders,
			})
				.then(res => res.json())
				.then(() => {
					setFileList([]);
					message.success('上传成功！');
				})
				.catch(() => {
					message.error('上传失败！');
				})
				.finally(() => {
					setUploading(false);
				});
		} else {
			message.error('缩略图过大，请重新上传！');
		}
	};

	const props: UploadProps = {
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
			<div className='font-size'>照片上传</div>
			<hr />
			<div className='image-format'>
				<div className='images-extra'>第一次上传为正常图 && 第二次上传为缩略图</div>
				<Upload {...props}>
					<Button icon={<UploadOutlined />}>正常图片 & 缩略图</Button>
				</Upload>
				<Button
					type="primary"
					onClick={handleUpload}
					disabled={fileList.length === 0}
					loading={uploading}
					style={{ marginTop: 16 }}
				>
					{uploading ? '保存照片' : '请先上传'}
				</Button>
			</div>
		</div>
	);
};

export default DataScreen;
