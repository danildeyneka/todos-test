import React, {FC, useRef, useState} from 'react'
import '../../styles/NewTodo/NewTodo.css'
import {doc, setDoc} from "firebase/firestore";
import {db, storage} from "../../api/firebase";
import {ref, uploadBytes} from 'firebase/storage'
import {todoT} from "../../types/types";
import dayjs from "dayjs";

export const NewTodo: FC = () => {
    const [title, setTitle] = useState<string>('')
    const [desc, setDesc] = useState<string>('')
    const [expiring, setExpiring] = useState<number | string>('')
    const [file, setFile] = useState<File | null>(null)
    const fileUploadRef = useRef<any>(null)

    /**
     * Добавляет задачу и файл на сервер, если заколнены требуемые поля, и очищает стейты ввода
     */
    const addTodo = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if ((title && desc) !== '') {
            try {
                const id = Date.now()
                await setDoc(doc(db, 'todos', `${id}`), {
                    id: id,
                    title: title,
                    desc: desc,
                    expiring: expiring || dayjs().add(1, 'day').format('YYYY-MM-DD'),
                    done: dayjs().unix() >= dayjs(expiring).unix(),
                    hasFile: !!file
                } as todoT)

                if (file !== null) {
                    const fileRef = ref(storage, `files/${id}`)
                    await uploadBytes(fileRef, file)
                }

                setFile(null)
                setTitle('')
                setDesc('')
                setExpiring('')
            } catch (e: any) {
                alert(`Something went wrong, please, try again later. ${e}`)
            }
        } else alert('Введите заголовок и описание')
    }

    /**
     * Выбор файла по ссылке скрытой кнопки
     */
    const uploadFile = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        fileUploadRef.current!.click()
    }

    return <div>
        <p>Новая задача</p>
        <form className='new-todo'>
            <input type="text" placeholder='Введите заголовок' value={title}
                   onChange={(e) => setTitle(e.target.value)}/>
            <textarea placeholder='Введите описание' value={desc} onChange={(e) => setDesc(e.target.value)}/>
            <input type="date" value={expiring} onChange={(e) => setExpiring(e.target.value)}/>
            <button className='new-todo__file-upload' onClick={uploadFile}>Прикрепить файл</button>
            {file && <span>Файл прикреплен!</span>}
            <input type="file" ref={fileUploadRef} onChange={(e) => setFile(e.target.files![0])}/>
            <button onClick={(e) => addTodo(e)}>Добавить задачу</button>
        </form>
    </div>
}