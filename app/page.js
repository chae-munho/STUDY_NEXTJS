import Link from 'next/link';
//컴포넌트 파일 자체가 useState를 쓰는 경우 : 그 파일 맨 위에 'use Client' 추가
//자식 컴포넌트에서만 useState를 쓰는 경우 : 자식 컴포넌트 파일에만 'use Client' 추가하고 부모는 서버 컴포넌트로 둬도 됨
import classes from './page.module.css';
import ImageSlideshow from '@/components/images/image-slideshow';

export const metadata = {
  title: 'All Meals',
  description: 'Browse the delicious meals shared by our vibrant',
};

export default function Home() {
  return (
    <>
      <header className={classes.header}>
        <div className={classes.slideshow}>
          <ImageSlideshow></ImageSlideshow>
        </div>
        <div>
          <div className={classes.hero}>
            <h1>NextLevel Food for NextLevel Foodies</h1>
            <p>Taste & share food from all over the world.</p>
          </div>
          <div className={classes.cta}>
            <Link href="/community">Join the Community</Link>
            <Link href="/meals">Explore Meals</Link>
          </div>
        </div>
      </header>
      <main>
        <section className={classes.section}>
          <h2>How it works</h2>
          <p>
            NextLevel Food is a platform for foodies to share their favorite
            recipes with the world. It&apos;s a place to discover new dishes, and to
            connect with other food lovers.
          </p>
          <p>
            NextLevel Food is a place to discover new dishes, and to connect
            with other food lovers.
          </p>
        </section>

        <section className={classes.section}>
          <h2>Why NextLevel Food?</h2>
          <p>
            NextLevel Food is a platform for foodies to share their favorite
            recipes with the world. It&apos;s a place to discover new dishes, and to
            connect with other food lovers.
          </p>
          <p>
            NextLevel Food is a place to discover new dishes, and to connect
            with other food lovers.
          </p>
        </section>
      </main>
    </>
  );
}