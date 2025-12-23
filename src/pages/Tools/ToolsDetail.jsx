
import { useParams } from 'react-router-dom';
import Layout from '../../layout/Layout';


// 도구 타입과 해당 컴포넌트를 매핑하는 객체
const TOOL_MAP = {

};


export default function ToolsDetail() {
	// URL 파라미터에서 type 값을 추출
	const { type } = useParams();

	return (
		<div>
			<Layout>
				{TOOL_MAP[type] ?? <div>존재하지 않는 도구입니다</div>}
			</Layout>

		</div>
	);
}
