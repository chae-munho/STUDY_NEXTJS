import classes from './loading.module.css';
//page.tsx안에서 await를 사용한 경우 해당 프로젝트 같은 경우 meals/page.js가 비동기 함수를 사용함
// 그러면 nextjs가 알아서 로딩 페이지를 띄어줌
// useEffect로 처리하는 클라이언트 컴포넌트에서는 loading.tsx가 적용되지 않음
// App router에서 지원

export default function MealsLoadingPage() {
    return (
        <p className={classes.loading}>Fetching meals...</p>
    )
}