import Link from 'next/link';
import classes from './page.module.css';
import MealGrid from '@/components/meals/meal-grid';
import { getMeals } from '@/lib/meals';
import { Suspense } from 'react';

async function Meals() {
    console.log("fetching meals...");
    const meals = await getMeals();
    return (<MealGrid meals={meals}></MealGrid>)
}


export default async function MealsPage() {
    const meals = await getMeals();
    return (
        <>
            <header className={classes.header}>
                <h1>
                    Delicious meals, created{' '}
                    <span className={classes.highlight}>by you</span>
                </h1>
                <p>
                    Choose your favorite recipe and cook it yourself, It is easy and fun
                </p>
                <p className={classes.cta}>
                    <Link href="/meals/share">
                        Share Your Favorite Recipe
                    </Link>
                </p>
            </header>
            <main className={classes.main}>
                <Suspense fallback={<p className={classes.loading}>Fetching meals...</p>}>
                    <Meals></Meals>
                </Suspense>
            </main>
        </>
    )
}