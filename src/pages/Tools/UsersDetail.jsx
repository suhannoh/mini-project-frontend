import { useEffect, useState } from "react"
import { api } from "../../api/auth"
import { logError } from "../../components/logError";
import './Minitools.css'
import { formatDateTime } from "../../components/date/dateTime";
import AuthStore from "../../store/AuthStore";

export default function AdminPage() {
  // 전역 상태 사용자 정보 가져오기
  const [users, setUsers] = useState([]);
  const [accountStatus , setAccountStatus] = useState({});
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

      const roles = {};
      const accountStatus = {};
      // 상태 업데이트
      res.data.forEach((u) => {
        roles[u.id] = u.role;
      })
      res.data.forEach ( (u) => {
        accountStatus[u.id] = u.status;
      })
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
      return alert("admin 만 수정할 수 있습니다.");
    }
    const conf = confirm("정말 수정하시겠습니까 ?");
    if(!conf) return;
    
    try {
      await api.patch(`/admin/user/${userId}` , 
        { role : role[userId] , status : accountStatus[userId] });

      alert("수정 완료되었습니다.");

    } catch (e) {
      logError(e);
    } 
    }
  
  return (
    <div>
      <h3 style={{
        margin: "1rem",
      }}> User는 접근이 안 되지만 일부러 오픈하였습니다 , User는 수정 불가합니다 ! <br /> 게시판에 admin 요청하시면 드리겠습니다 ! </h3>
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
          <th>종료일</th>
          <th>마지막 접속일</th>
          <th>Status</th>
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
      <td>{formatDateTime(u.createdAt)}</td>
      <td>{formatDateTime(u.updatedAt)}</td>
      <td>준비중</td>
      <td> 
        <select name="" className={accountStatus[u.id] === "ACTIVE" ? "user__status" : "user__status blocked"} onChange={(e) => setAccountStatus({...accountStatus , [u.id] : e.target.value})} value={accountStatus[u.id]}>
          <option value="ACTIVE"> 정상 </option>
          <option value="BLOCKED"> 정지 </option>
        </select>
      </td>
      <td>
        <button id="table__submit" onClick={() => handleUpdateUser(u.id)} >
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
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
