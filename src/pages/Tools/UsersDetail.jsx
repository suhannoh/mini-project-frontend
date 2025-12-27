import { useEffect, useState } from "react"
import { api } from "../../api/auth"
import { logError } from "../../components/logError";
import './Minitools.css'
import { formatDateTime } from "../../components/date/dateTime";
import AuthStore from "../../store/AuthStore";
import { formatDateTimeDay } from "../../components/date/dateTimeDay";

export default function AdminPage() {
  

  // 전역 상태 사용자 정보 가져오기
  const [users, setUsers] = useState([]);
  const [accountStatus , setAccountStatus] = useState({});
  // 정지사유 
  const [blockComment, setBlockComment] = useState("");
  const [role, setRole] = useState({});
  const {user} = AuthStore();

  // 성별
  const gender = {
    MALE : "남자",
    FEMALE : "여자",
    NONE : "선택 없음"
  }

  // 사용자 정보 가져오기
  useEffect (() => {
      const handleGetUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data);
      console.log(res.data)
      const roles = {};
      const accountStatus = {};
      // 상태 업데이트
      res.data.forEach((u) => {
        roles[u.id] = u.role;
      })
      res.data.forEach ( (u) => {
        accountStatus[u.id] = u.status;
      })
      // setBlockComment("TEST BLOCK COMMENT");
      setRole(roles);
      setAccountStatus(accountStatus)
    } catch (e) {
      logError(e);
    }};
  handleGetUsers();
  }, [])

  // 사용자 정보 수정
  const handleUpdateUser = async (userId) => {
    if(user.role !== "ADMIN") {
            return alert("어드민 권한이 없습니다.");
        }   
    const conf = confirm("정말 수정하시겠습니까 ?");
    if(!conf) return;

    let blockComment = "";
    if(accountStatus[userId] === "BLOCKED") {
      blockComment = prompt("정지 사유를 작성해주세요");
    }
    try {
      await api.patch(`/admin/user/${userId}` , 
        { role : role[userId] ,
          status : accountStatus[userId],
          // blockComment : blockComment
        }
      );
      setBlockComment(blockComment);
      alert("구현중 확인용 [" + blockComment + "] 수정 완료되었습니다.");

    } catch (e) {
      logError(e);
    } 
    }
  
  return (
    <div>
      <h3 className="admin-desc"> 게시판에 admin 요청하시면 드리겠습니다 ! <br></br> 🔍 <span style={{color:"red"}}>정지(status)</span> 인 경우 마우스를 올리면 정지사유를 확인할 수 있습니다.</h3>

      <table>
        <thead>
        <tr>
          <th>순서</th>
          <th>PK</th>
          <th>Role</th>
          <th>이름</th>
          <th>성별</th>
          <th>이메일</th>
          <th>생성일</th>
          <th>수정일</th>
          <th>마지막 접속일</th>
          <th>Status  
             <span className="info-icon"> ⓘ</span>
          </th>
          <th>수정</th>
        </tr>
        </thead>
        <tbody>
        
      {users.map((u ,idx) => 
      <tr key={u.id} className={idx % 2 === 0 ? "user__info-table" : "user__info-table-gray"}
> 
      <td>{idx + 1}</td>  
      <td>{u.id}</td>
      <td>
        <select name="" className="user__status" onChange={(e) => setRole({...role , [u.id] : e.target.value})} value={role[u.id]}>
          <option value="USER"> USER </option>
          <option value="ADMIN"> ADMIN </option>
        </select>
      </td>
      <td>{u.name}</td>
      <td>{gender[u.gender]}</td>
      <td>{u.email}</td> 
      <td>{formatDateTimeDay(u.createdAt)}</td>
      <td>{formatDateTimeDay(u.updatedAt)}</td>
      <td>{u.lastLoginAt ? formatDateTime(u.lastLoginAt) : "-"}</td>
      <td> 
        <select title={accountStatus[u.id] === "BLOCKED" ? blockComment : undefined} 
                className={accountStatus[u.id] === "ACTIVE" ? "user__status" : "user__status blocked"} 
                onChange={(e) => setAccountStatus({...accountStatus , [u.id] : e.target.value})} 
                value={accountStatus[u.id]}>
          <option value="ACTIVE"> 정상 </option>
          <option value="BLOCKED"> 정지 </option>
        </select>
      </td>
      <td>
        <button title="변경사항 저장" id="table__submit" onClick={() => handleUpdateUser(u.id)} >
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="M8.5 12.5l2.2 2.2L16.5 9" />
          </svg>
        </button>
        </td>
        </tr>
      )}
        </tbody>
        </table>



    </div>
  )
}
