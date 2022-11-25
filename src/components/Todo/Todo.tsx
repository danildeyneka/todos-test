import {FC, useState} from 'react'
import '../../styles/Todo/Todo.css'
import {todoT} from '../../types/types'
import dayjs from 'dayjs'
import {db, storage} from "../../api/firebase";
import {doc, deleteDoc, updateDoc} from "firebase/firestore";
import {ref, getDownloadURL, deleteObject} from "firebase/storage";
import {EditTodo} from "../EditTodo/EditTodo";

type propsT = {
    t: todoT
}
export const Todo: FC<propsT> = ({t}) => {
    const [fileUrl, setFileUrl] = useState<null | string>(null)
    const [editMode, setEditMode] = useState<boolean>(false)
    const deadline = dayjs(t.expiring).format('DD-MM-YYYY')
    const doneIndicator = t.done || (dayjs().unix() >= dayjs(t.expiring).unix()) // значение чекбокса при ручном изменении или истечении времени
    const todoRef = doc(db, 'todos', `${t.id}`) // уникальная ссылка на задачу на сервере

    const deleteTodo = () => {
        if (window.confirm('Are you sure? This action cannot be undone')) {
            deleteDoc(todoRef)
                .catch(e => alert(`Something went wrong, ${e}`))
            if (t.hasFile) {
                deleteObject(ref(storage, `files/${t.id}`))
                    .catch(e => alert(`Something went wrong, ${e}`))
            }
        }
    }
    const toggleDone = () => {
        updateDoc(todoRef, {
            done: !t.done
        })
            .catch(e => alert(`Error occurred! ${e}`));
    }

    /**
     * Получает url файла с сервера и добавляет его в стейт
     */
    const getFile = () => {
        getDownloadURL(ref(storage, `files/${t.id}`))
            .then((url) => {
                setFileUrl(url)
            })
            .catch(e => alert(`Error occurred! ${e}`));
    }

    return <>
        {!editMode &&
            <li className='todo__item'>
                <h3 className='todo__title'>{t.title}</h3>
                <p className='todo__desc'>{t.desc}</p>
                {(t.hasFile && !fileUrl) && <p onClick={() => getFile()}>Кликните для получения файла</p>}
                {fileUrl && <p> Файл доступен для скачивания по <a href={fileUrl} target='_blank'
                                                                   rel='nofollow noopener noreferrer'>ссылке</a></p>}
                <span
                    className={`todo__expiring ${doneIndicator && 'todo__done'}`}>Сделать до: <strong>{deadline}</strong></span>
                <input className='todo__checkbox' type="checkbox" defaultChecked={doneIndicator}
                       onClick={() => toggleDone()}/>
                <button className='todo__edit-btn' onClick={() => setEditMode(prevState => !prevState)}>Изменить
                    данные
                </button>
                <button className='todo__delete-btn' onClick={() => deleteTodo()}>Удалить</button>
            </li>}
        {editMode && <EditTodo t={t} todoRef={todoRef} setEditMode={setEditMode} deleteTodo={deleteTodo}/>}
    </>
}