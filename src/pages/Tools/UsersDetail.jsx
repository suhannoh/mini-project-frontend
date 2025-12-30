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
  const [blockComment, setBlockComment] = useState({});
  const [role, setRole] = useState({});
  const {user} = AuthStore();
  const [hoverId, setHoverId] = useState(null);
  const [page , setPage] = useState(0);
  const [totalPages , setTotalPages] = useState(0);
  const size = 10;
  // 성별
  const gender = {
    MALE : "남자",
    FEMALE : "여자",
    NONE : "선택 없음"
  }

  const handleGetUsers = async () => {
    try {
      const res = await api.get("/admin/users", {params : {page, size}});
      setUsers(res.data.content);
      // console.log(res.data)
      const roles = {};
      const accountStatus = {};
      const blockReason = {};
      // 상태 업데이트
      res.data.content.forEach((u) => {
        roles[u.id] = u.role;
        accountStatus[u.id] = u.status;
        blockReason[u.id] = u.reason;
      })
      setBlockComment(blockReason);
      setRole(roles);
      setAccountStatus(accountStatus)
      setTotalPages(res.data.totalPages);
    } catch (e) {
      logError(e);
    }};

  // 사용자 정보 가져오기
  useEffect (() => {
    
  handleGetUsers();
  }, [page])

  // 사용자 정보 수정
  const handleUpdateUser = async (u) => {
    const userId = u.id;
    if(user.role !== "ADMIN") {
            return alert("어드민 권한이 없습니다.");
        }

    if(accountStatus[userId] === u.status) {
            return alert("변경된 상태가 없습니다.");
    }

    const conf = confirm("정말 수정하시겠습니까 ?");
    if(!conf) return;

    let blockComment = "";
    if(accountStatus[userId] === "BLOCKED") {
      blockComment = prompt("정지 사유를 작성해주세요");
    }
    setBlockComment(blockComment);
    try {
      await api.patch(`/admin/user` , 
        { 
          userId : userId,
          adminId : user.id,
          role : role[userId] ,
          status : accountStatus[userId],
          reason : blockComment
        }
      );
      if (accountStatus[userId] === "BLOCKED") {
        alert("정지사유 [" + blockComment + "] 수정 완료되었습니다.");
      } else {
        alert("정상적인 계정으로 전환되었습니다.");
      }
      handleGetUsers();
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
      <td>{(idx + 1 ) + (page * size)}</td>  
      <td>{u.id}</td>
      <td>
        <select name="" className="user__status" 

        onChange={(e) => setRole({...role , [u.id] : e.target.value})} value={role[u.id]}>
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
        <select 
                onMouseEnter={() => setHoverId(u.id)}
                onMouseLeave={() => setHoverId(null)}
                className={accountStatus[u.id] === "ACTIVE" ? "user__status" : "user__status blocked"} 
                onChange={(e) => setAccountStatus({...accountStatus , [u.id] : e.target.value})} 
                value={accountStatus[u.id]}>
          <option value="ACTIVE"> 정상 </option>
          <option value="BLOCKED"> 정지 </option>
        </select>

        {hoverId === u.id && accountStatus[u.id] === "BLOCKED" && (
          <div className="custom-tooltip">
            <div>정지 횟수: {u.blockCount}</div>
            <div>정지 사유: {blockComment[u.id]}</div>
          </div>
        )}
      </td>
      <td>
        <button title="변경사항 저장" id="table__submit" onClick={() => handleUpdateUser(u)} >
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
         <div className="pagination">
              <button
              // 이전 버튼 비활성화 조건: 현재 페이지가 첫 페이지일 때
                disabled={page === 0}
                onClick={() => setPage(page => page - 1)}
              > 이전 </button>
            {/* 페이지 번호 표시 */}
              <span>{page + 1} / {totalPages}</span>

              <button disabled={page + 1 >= totalPages}
              // 다음 버튼 비활성화 조건: 현재 페이지가 마지막 페이지일 때
                onClick={() => setPage(page => page + 1)}
              > 다음 </button>
            </div>
    </div>
  )
}
