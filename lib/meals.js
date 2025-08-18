import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
import fs from 'node:fs';  //파일시스템 사용
import { FileEnumerator } from 'eslint/use-at-your-own-risk';
const db = sql('meals.db');

export async function getMeals() {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // throw new Error('Loading meals failed')
    return db.prepare('SELECT * FROM meals').all();
    
}

//sql 인젝션 방지 쿼리
export default function getMeal(slug) {
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

//npm install slugify xss : slugify는 한글, 특수문자 등을 url-frindly 문자열로 변한 (ex: 게시글 제목 -> 슬러그), xss : 사용자 입력의 악성 스크립트 제거
//사용자 입력 기능이 있으므로
//이미지를 데이터베이스에 저장하는 것은 좋지 않음 주로 s3 버킷이나 파일시스템에 저장. 아니면 디비에 파일경로를 저장 리액트나 nextjs에서는 public 폴더 images 폴더를 새로 만들어서 저장하기도 함
export async function saveMeal(meal) {
    meal.slug = slugify(meal.title, {lower: true});
    meal.instructions = xss(meal.instructions);

    const extension = meal.image.name.split('.').pop();
    const fileName = `${meal.slug}.${extension}`; //파일명을 생성했으니 이제 public에 저장해야됨 fs api 이용
    const stream = fs.createWriteStream(`public/images/${fileName}`);
    const bufferedImage = await meal.image.arrayBuffer();  //여기서는 arrayBuffer로 반환하니까 public/images에는 buffer 타입으로 저장해야됨
    stream.write(Buffer.from(bufferedImage), (error) => {
        if (error) {
            throw new Error('Saving image failed!');
        }
    });
    meal.image = `/images/${fileName}`  //모든 이미지에 대한 요청은 자동으로 public으로 보내지기 때문에 public을 제외해야됨

    db.prepare(`
        INSERT INTO meals
            (title, summary, instructions, creator, creator_email, image, slug)
                values (
                    @title,
                    @summary,
                    @instructions,
                    @creator,
                    @creator_email,
                    @image,
                    @slug
                )
        `).run(meal);  // @title, 문법 덕분에 meal을 넣으면 알아서 각 필드에 들어감
    
}
