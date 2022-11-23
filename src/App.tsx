import React, {useEffect, useState} from 'react'
import './styles/App/App.css'
import {collection, onSnapshot} from 'firebase/firestore'
import {db} from './api/firebase'
import {Todo} from './components/Todo/Todo'
import {todoT} from './types/types'

const App = () => {
    const [todos, setTodos] = useState<todoT[]>([])

    useEffect(() => {
        onSnapshot(collection(db, 'todos'), (snap) => {
            setTodos(snap.docs.map(doc => doc.data() as todoT))
        })
    }, [])

    return <main className="todo">
        <h1>Todo List</h1>
        <button>Add todo? modal mb</button>
        <ul>
            {todos.length === 0
                ? <div>Loading...</div>
                : todos.map(todo => <Todo t={todo} key={todo.id}/>)}
        </ul>
    </main>
}

export default App