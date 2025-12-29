import React from 'react'

export default function Loading({text}) {
  return (
     <>
      <h2 className='loading'>
        <span className='loading-text'>Loading </span>
          <br /><br />
            <span>
                첫 {text} 시 최대 1~2분 정도<br />
                소요될 수 있습니다.
            </span></h2>
        <br /><br />
			<p className='loading-desc'> 원인 ✅ 서버가 일정 시간 미접속 시 절전 상태로 전환됩니다. </p>
    </>
  )
}
