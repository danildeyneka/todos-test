import {FC} from 'react'
import '../../styles/Todo/Todo.css'
import {todoT} from '../../types/types'
import dayjs from 'dayjs'

type propsT = {
    t: todoT
}
export const Todo: FC<propsT> = ({t}) => {

    const deadline = dayjs(t.expiring).format('HH:mm DD-MM-YYYY')
    const doneIndicator = t.done || (Date.now() >= t.expiring)
    const editMode = (id: number) => {

    }

    return <li className='todo__item'>
        <h3 className='todo__title'>{t.title}</h3>
        <p className='todo__desc'>{t.desc}</p>
        <p>file</p>
        <span className='todo__expiring'>Сделать до: </span><strong>{deadline}</strong>
        <input className='todo__checkbox' type="checkbox" defaultChecked={doneIndicator}/>
        <button className='todo__edit-btn' onClick={() => editMode(t.id)}>Изменить данные</button>
    </li>
}