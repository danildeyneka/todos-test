import React, {memo, useEffect, useState} from 'react'
import './styles/App/App.css'
import {collection, onSnapshot} from 'firebase/firestore'
import {db} from './api/firebase'
import {Todo} from './components/Todo/Todo'
import {todoT} from './types/types'
import {NewTodo} from "./components/NewTodo/NewTodo";

const App = memo(() => {
    const [todos, setTodos] = useState<todoT[]>([])

    useEffect(() => {
        onSnapshot(collection(db, 'todos'), (snap) => {
            setTodos(snap.docs.map(doc => doc.data() as todoT))
        })
    }, [])

    return <main className="wrapper">
        <h1>Todo List</h1>
        <NewTodo/>
        <ul>
            {todos.length === 0
                ? <div className='wrapper__error'>Нет активных задач</div>
                : todos.map(todo => <Todo t={todo} key={todo.id}/>)}
        </ul>
    </main>
})

export default App