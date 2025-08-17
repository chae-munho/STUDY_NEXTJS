'use client'; //onClick 같은 경우는 클라이언트에서 작동하므로 use client를 선언해야만 함
import { useRef } from 'react';
import classes from './image-picker.module.css';

export default function ImagePicker({label, name}) {
    const imageInput = useRef();

    function handlePickClick() {
        imageInput.current.click();

    }
    return (
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={classes.controls}>
                 <input
                    className={classes.input}
                        type='file'
                        id={name}
                        accept='image/png, image/jpeg'
                        name={name}
                        ref={imageInput}
                ></input>
               
                <button className={classes.button} type='button' onClick={handlePickClick}>
                    Pick an Image
                </button>
            </div>
        </div>
    )
}
    