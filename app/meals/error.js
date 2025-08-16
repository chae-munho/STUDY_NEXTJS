'use client';

// 루트 폴더에 넣으면 전체 에러 관련 관리 만약 meals 폴더에 두면 meals page.js나 호출한 컴포넌트에서 발생한 에러까지만 관리 error.js는 무조건 클라이언트 사이드이므로 'use client'를 추가
export default function Error() {
    return (
        <main className="error">  {/*global.css의 error을 사용 */}
            <h1>An error occurred!</h1>
            <p>Failed to fetch meal data. Please try again later.</p>
        </main>
    )
}