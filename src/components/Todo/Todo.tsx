import {FC, useState} from 'react'
import '../../styles/Todo/Todo.css'
import {todoT} from '../../types/types'
import dayjs from 'dayjs'
import {storage} from "../../api/firebase";
import {ref, getDownloadURL} from "firebase/storage";

type propsT = {
    t: todoT
}
export const Todo: FC<propsT> = ({t}) => {
    const [fileUrl, setFileUrl] = useState<null | string>(null)
    const deadline = dayjs(t.expiring).format('DD-MM-YYYY')
    const doneIndicator = t.done || (dayjs().unix() >= dayjs(t.expiring).unix())

    const editMode = (id: number) => {

    }
    const getFile = (id: number) => {
        getDownloadURL(ref(storage, `files/${id}`))
            .then((url) => {
                const xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.open('GET', url);
                xhr.send();
                setFileUrl(url)
            })
            .catch((e) => {
                alert(`Error occurred! ${e}`)
            });
    }

    return <li className='todo__item'>
        <h3 className='todo__title'>{t.title}</h3>
        <p className='todo__desc'>{t.desc}</p>
        {(t.hasFile && !fileUrl) && <p onClick={() => getFile(t.id)}>get file url</p>}
        {fileUrl && <p> Файл доступен для скачивания по <a href={fileUrl} target='_blank'
                                                           rel='nofollow noopener noreferrer'>ссылке</a></p>}
        <span className='todo__expiring'>Сделать до: </span><strong>{deadline}</strong>
        <input className='todo__checkbox' type="checkbox" defaultChecked={doneIndicator}/>
        <button className='todo__edit-btn' onClick={() => editMode(t.id)}>Изменить данные</button>
    </li>
}