'use client'; //onClick 같은 경우는 클라이언트에서 작동하므로 use client를 선언해야만 함
import { useRef, useState } from 'react';
import classes from './image-picker.module.css';
import Image from 'next/image';

export default function ImagePicker({label, name}) {
    const [pickedImage, setPickedImage] = useState();
    const imageInput = useRef();

    function handlePickClick() {
        imageInput.current.click();
    }
    function HandleImageChange(event) {
        const file = event.target.files[0];

        if (!file) {
            setPickedImage(null);
            return;
        }
        const fileReader = new FileReader();

        fileReader.onload = () => {
            setPickedImage(fileReader.result);
        };

        fileReader.readAsDataURL(file);
    }
    return (
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {!pickedImage && <p>No image picked yet.</p>}
                    {pickedImage && <Image src={pickedImage} alt='The Image selected by the user.' fill></Image>}  {/*선택된 파일의 크기를 알 수 없으므로 fill 속성을 추가한다. */}
                </div>
                 <input
                    className={classes.input}
                        type='file'
                        id={name}
                        accept='image/png, image/jpeg'
                        name={name}
                        ref={imageInput}
                       
                        onChange={HandleImageChange}
                        required //이렇게 하면 이미지가 선택되지 않을 경우 form을 제출할 수 없음
                ></input>
               
                <button className={classes.button} type='button' onClick={handlePickClick}>
                    Pick an Image
                </button>
            </div>
        </div>
    )
}
    