import React from 'react'
import { useParams } from 'react-router-dom';
import BackBtn from '../../components/button/BackBtn';
import Calculator from './tools-dev/Calculator';
import Layout from '../../layout/Layout';

const TOOL_MAP = {
	calculator: <Calculator />,
	//   exchange: <Exchange />,
	//   weather: <Weather />,
};


export default function ToolsDetail() {
	const { type } = useParams();

	return (
		<div>
			<Layout>
				{TOOL_MAP[type] ?? <div>존재하지 않는 도구입니다</div>}
			</Layout>

		</div>
	);
}
