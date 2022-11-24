import React, {FC, useState} from 'react'
import '../../styles/NewTodo/NewTodo.css'
import {collection, addDoc} from "firebase/firestore";
import {db, storage} from "../../api/firebase";
import {ref, uploadBytes} from 'firebase/storage'
import {todoT} from "../../types/types";
import dayjs from "dayjs";

export const NewTodo: FC = () => {
    const [title, setTitle] = useState<string>('')
    const [desc, setDesc] = useState<string>('')
    const [expiring, setExpiring] = useState<number | string>('')
    const [file, setFile] = useState<File | null>(null)

    const addTodo = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if ((title && desc) !== '') {
            try {
                const id = Date.now()
                await addDoc(collection(db, 'todos'), {
                    id: id,
                    title: title,
                    desc: desc,
                    expiring: expiring || dayjs().add(1, 'day').format('YYYY-MM-DD'),
                    done: false,
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
        }
    }

    /////////////////// сделать реф на отдельную кнопку для добавления файла + отображение его прикрепления

    return <div>
        <p>Новая задача</p>
        <form className='new-todo'>
            <input type="text" required placeholder='Введите заголовок' value={title} onChange={(e) => setTitle(e.target.value)}/>
            <textarea required placeholder='Введите описание' value={desc} onChange={(e) => setDesc(e.target.value)}/>
            <input type="date" value={expiring} onChange={(e) => setExpiring(e.target.value)}/>
            <input type="file" onChange={(e) => setFile(e.target.files![0])}/>
            <button onClick={(e) => addTodo(e)}>Добавить задачу</button>
        </form>
    </div>
}