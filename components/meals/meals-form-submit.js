'use client'
import { useFormStatus } from "react-dom";
export default function MealsFormSubmit() {
    const {pending} = useFormStatus();  // 제출전에는 pending값이 false, 제출중이면 true가 들어감
    return (
        <button disabled={pending}>
            {pending ? 'Submitting...' : 'Share Meal'}
        </button>
    )
}