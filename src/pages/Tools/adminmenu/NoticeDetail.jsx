import { useEffect, useState } from "react";
import { api } from "../../../api/auth";
import { logError } from "../../../components/logError";
import AuthStore from "../../../store/AuthStore";
import { formatDateTimeDay } from "../../../components/date/dateTimeDay";

export default function NoticeDetail() {
    const [notice,  setNotice] = useState([]);
    const [editNotice, setEditNotice] = useState("");
    const {user} = AuthStore();
    const [editStatus, setEditStatus] = useState({});
    const [editNoticeContent , setEditNoticeContent] = useState({});
     // 페이지네이션 관련 상태 
    const [page, setPage] = useState(0);
    // 전체 페이지 수 상태
    const [totalPages, setTotalPages] = useState(0);
    const size = 10;
    // 공지 목록 불러오기
    const readNotice = async () => {
        try {
            const res = await api.get(`/admin/notice`, {
                params : {
                    page,
                    size
                }
            });
            // 정상 응답 후 상태 업데이트
            setNotice(res.data.content);
            let status = {};
            let content = {};
            res.data.content.forEach((n) => {
                status[n.id] = n.status;
                content[n.id] = n.noticeContent;
            })
            setEditStatus(status);
            setEditNoticeContent(content);
            setTotalPages(res.data.totalPages);
        } catch (e) {
          // 로그 에러 처리
            logError(e);
        }
       }
    // 처음 공지 목록 불러오기
    useEffect(() => {
       readNotice();
    } , [page])
    // 공지 추가
    const handleAddNotice = async (e) => {
        e.preventDefault();
        if(user.role !== "ADMIN") {
            return alert("어드민 권한이 없습니다.");
        }   
        const isSubmit = confirm("["+ editNotice + "] 공지를 추가하시겠습니까 ? ");
        if(!isSubmit) return;
        try {
            await api.post("/admin/notice", { 
                userId : user.id,
                noticeContent : editNotice
             });
            alert("공지를 성공적으로 저장하였습니다 ");
            readNotice();
            setEditNotice("");
        } catch (e) {
            logError(e);
        }
    }

    const handleActiveNotice = async (notice) => {
        if(user.role !== "ADMIN") {
            return alert("어드민 권한이 없습니다.");
        }   
        if (editStatus[notice.id] === notice.status &&
            editNoticeContent[notice.id] === notice.noticeContent
        ) {
            return alert("변경된 상태가 없습니다.");
        }   
        const isSubmit = confirm(`[${editNoticeContent[notice.id]}] 공지를 ${editStatus[notice.id] === "ACTIVE" ? "활성" : "비활성"}하시겠습니까 ? `);   
        if(!isSubmit) return;
        try {
            await api.patch(`/admin/notice`,null, {
                params : {
                    id : notice.id,
                    status : editStatus[notice.id],
                    noticeContent : editNoticeContent[notice.id]
                }   
            });
            alert(`공지 상태를 [${editStatus[notice.id]}] 성공적으로 수정하였습니다 `);
            readNotice();
        } catch (e) {
            logError(e);
        }
    }

    const handleDeleteNotice = async (notice) => {
         if(user.role !== "ADMIN") {
            return alert("어드민 권한이 없습니다.");
        }   
        const isSubmit = confirm(`[${editNoticeContent[notice.id]}] 공지를 삭제하시겠습니까 ? `);  
        if(!isSubmit) return;

        try {
            await api.delete(`/admin/notice`, {
                params : {
                    id : notice.id
                }
            })
            alert(`[${notice.noticeContent}] 성공적으로 삭제하였습니다 `);
           readNotice();
        } catch (e) {
            logError(e);
        }
    }

  return (
    <div>
        <form onSubmit={handleAddNotice} className="notice__create">
         <div className="notice-add-ani">
         <input type="text" placeholder='' 
                value={editNotice} id="notice-input"
                onChange={(e) => setEditNotice(e.target.value)} />
         <label htmlFor="notice-input">공지를 입력해주세요</label>       
         </div>
         <button type="submit"> 추가 </button>
        </form>
        <table>
            <thead>
                <tr>
                    <th>순번</th>
                    <th>작성자</th>
                    <th>공지내용</th>
                    <th>작성일</th>
                    <th>수정일</th>
                    <th>활성상태</th>
                    <th>수정</th>
                    <th>삭제</th>
                </tr>
            </thead>
            <tbody>
                {notice.length > 0 ? notice.map((n , idx) => (
                    <tr key={n.id} className={n.status === "ACTIVE" ? "active__notice" : ""}>
                        <td>{(idx + 1 ) + (page * size)}</td>
                        <td>{n.userId}</td>
                        <td><input className="user__status" type="text" value={editNoticeContent[n.id]} onChange={(e) => setEditNoticeContent({...editNoticeContent, [n.id] : e.target.value})}/>  </td>
                        <td>{formatDateTimeDay(n.createdAt)}</td>
                        <td>{formatDateTimeDay(n.updatedAt)}</td>
                        <td>
                            <select name="" id="" value={editStatus[n.id]} className="user__status"
                                    onChange={(e) => setEditStatus({...editStatus, [n.id] : e.target.value})}>
                                <option value="ACTIVE"> 공개 </option>
                                <option value="INACTIVE"> 비공개 </option>
                            </select>

                        </td>
                        <td>
                            <button type="button" title="변경사항 저장" id="table__submit" onClick={() => handleActiveNotice(n)} >
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <circle cx="12" cy="12" r="9" />
                                <path d="M8.5 12.5l2.2 2.2L16.5 9" />
                            </svg>
                            </button>    
                        </td>
                        <td>
                        <button type="button" id="table__submit" onClick={() =>handleDeleteNotice(n)}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M3 6h18" />
                                <path d="M8 6V4h8v2" />
                                <path d="M6 6l1 16h10l1-16" />
                                <path d="M10 11v6" />
                                <path d="M14 11v6" />
                            </svg>
                        </button>    
                        </td>
                    </tr>
                )) :
                <tr>
                    <td colSpan={6}>공지가 없습니다</td>
                </tr>
                }
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
