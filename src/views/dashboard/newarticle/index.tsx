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
import { getProcessor } from 'bytemd'
import zhHans from 'bytemd/locales/zh_Hans.json'
import gfmLocale from '@bytemd/plugin-gfm/locales/zh_Hans.json';
import mathLocale from '@bytemd/plugin-math/locales/zh_Hans.json';
import mermaidLocale from '@bytemd/plugin-mermaid/locales/zh_Hans.json';
import 'highlight.js/styles/vs.css'
import "./index.less";
import 'bytemd/dist/index.css'
import { Button } from "antd";
import { marked } from 'marked'
import math from "@bytemd/plugin-math";
import './juejin.scss'//阅览风格样式

const DataMd = () => {
	const plugins = [gfm({ locale: gfmLocale }), gemoji(), mermaid(), highlight(), math(), mermaid({ locale: mermaidLocale }),
	mathssr({ locale: mathLocale }), mediumZoom(), breaks(), footnotes(), frontmatter()];
	const [value, setValue] = useState('');
	let handleClick = () => {
		// let html = marked(value) // <h3>hello markdown</h3>
		console.log(value);
	};
	return (
		<div>
			<Button type="primary" onClick={handleClick} htmlType="submit" >
				输出
			</Button>
			<div className="page-wrap" >
				<Editor
					locale={zhHans}
					// 内部的值
					value={value}
					// 插件
					plugins={plugins}
					// 动态修改值
					onChange={v => setValue(v)}
				/>
				<Viewer value={value} plugins={plugins} />
			</div>
		</div>
	)
}

export default DataMd;
