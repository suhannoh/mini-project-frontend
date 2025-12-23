import React, { useState } from 'react'
import Layout from '../../../layout/Layout'
import { logError } from '../../../components/logError';
import BackBtn from '../../../components/button/BackBtn';
import { api } from '../../../api/auth';

export default function FindAccountPage() {
	const [findEmail , setFindEmail] = useState("");
	const [findName , setFindName] = useState("");
	const handleFindPassword = async () => {
		try {
			const {data} = await api.post("/user/find/password", { email : findEmail , name : findName });
			console.log(data);
			alert ("비밀번호는 " + data.password + " 입니다.");
		} catch (e) {
			logError(e);
		}
	}
	return (
		<div>
			<BackBtn navi={"/"}/>
			<div className='link__add-wrap'>
				<div>
					<div className='link__add-card'>
						<form onSubmit={handleFindPassword}>
							<ul className='link__add-ul' >
								<li>이메일 : <input type="email" value={findEmail} placeholder='이메일을 입력하세요' name="findEmail"
									onChange={(e) => setFindEmail(e.target.value)} /></li>
								<li>이름 : <input type="text" value={findName} placeholder='이름을 입력하세요' name="findName"
									onChange={(e) => setFindName(e.target.value)} /></li>
							</ul>
							<button className="link__edit-btn" type='submit'>찾기</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}
