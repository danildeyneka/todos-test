import {Dispatch, FC, SetStateAction, useState} from 'react'
import '../../styles/Todo/Todo.css'
import '../../styles/NewTodo/NewTodo.css'
import {todoT} from "../../types/types";
import {updateDoc} from "firebase/firestore";

type propsT = {
    t: todoT
    todoRef: any
    setEditMode: Dispatch<SetStateAction<boolean>>
    deleteTodo: () => void
}
export const EditTodo: FC<propsT> = ({t, ...props}) => {
    const [title, setTitle] = useState<string>(t.title)
    const [desc, setDesc] = useState<string>(t.desc)
    const [done, setDone] = useState<boolean>(t.done)
    const [expiring, setExpiring] = useState<string>(t.expiring) // дата истечения срока

    const deleteTodoHandler = () => {
        props.deleteTodo()
        props.setEditMode(prevState => !prevState)
    }

    /**
     * Обновляет данные задачи и выходит из режима изменения
     */
    const updateTodo = () => {
        if ((title && desc) !== '') {
            updateDoc(props.todoRef, {
                title: title,
                desc: desc,
                expiring: expiring,
                done: done,
            })
                .catch((e) => {
                    alert(`Error occurred! ${e}`)
                });
            props.setEditMode(prevState => !prevState)
        } else alert('Введите заголовок и описание')
    }

    return <li className='new-todo'>
        <h3 className='todo__title'>Изменение данных</h3>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)}/>
        <textarea value={desc} onChange={e => setDesc(e.target.value)}/>
        <input type="checkbox" defaultChecked={done} onChange={() => setDone(prevState => !prevState)}/>
        <input type="date" value={expiring} onChange={e => setExpiring(e.target.value)}/>
        <button className='todo__edit-btn' onClick={() => updateTodo()}>Сохранить изменения</button>
        <button className='todo__edit-btn' onClick={() => props.setEditMode(prevState => !prevState)}>
            Отменить изменения
        </button>
        <button className='todo__delete-btn' onClick={() => deleteTodoHandler()}>Удалить</button>
    </li>
}