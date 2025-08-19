
'use server';

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

function isInvalidText(text) {
  return !text || text.trim() === '';

}

export async function shareMeal(prevState, formData) {
    
    const meal = {
      title: formData.get('title'),
      summary: formData.get('summary'),
      instructions: formData.get('instructions'),
      image: formData.get('image'),
      creator: formData.get('name'),
      creator_email: formData.get('email')
    }
    if (isInvalidText(meal.title) || isInvalidText(meal.summary) || isInvalidText(meal.instructions) || isInvalidText(meal.creator) || isInvalidText(meal.creator_email) || !meal.creator_email.includes('@') || !meal.image || meal.image.size === 0) {
      return {message: 'Invalid input.'}
    }

    console.log(meal);
    await saveMeal(meal)
    revalidatePath('/meals'); //이 경로의 페이지만 재검사하겠다는 의미 layout도 있는데 layout은 중첩된 모든 페이지 검사. 해당 페이지와 관련된 캐시를 모두 지우는 역할을 한다. /meals 경로에 대한 캐시를 무효화하고 다음 요청 시 최신 데이터로 다시 생성하라.
    redirect('/meals');
  }