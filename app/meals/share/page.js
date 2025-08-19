
'use client'
import ImagePicker from '@/components/meals/image-picker';
import classes from './page.module.css';
import { shareMeal } from '@/lib/action';  //같은 파일에 client component, server component가 같이 있으면 안되므로 server component 파일을 분리시켰다.
import MealsFormSubmit from '@/components/meals/meals-form-submit';
import { useActionState } from 'react';
//배포환경에서는 이미지가 보이지 않는 현상이 있음 public 폴더 안의 images 폴더에 저장하고 있기 때문에 이미지가 보이지 않는 것 배포폴더 .next 폴더에는 images 폴더가 없음. 공식문서에도 s3 버킷을 활용하라고 추천함
export default function ShareMealPage() {
  const [state, formAction] = useActionState(shareMeal, {message: null});
  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} action={formAction}>
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" name="name" required />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="email" required />
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" required />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows="10"
              required
            ></textarea>
          </p>
          <ImagePicker label="Your image" name="image"></ImagePicker>
          {state.message && <p>{state.message}</p>}
          <p className={classes.actions}>
            <MealsFormSubmit></MealsFormSubmit>
          </p>
        </form>
      </main>
    </>
  );
}