import React, {useState} from 'react'
import './App.css'
import { getDatabase } from "firebase/database"

const App = () => {

    // const [db, setDb] = useState()
    const db = getDatabase()
    // const fetchData = () => {
    //     getDatabase(api)
    // }

    return <div>
        <div className="App">
            hey
        </div>
        {/*<button onClick={() => fetchData()}>sdfd</button>*/}
    </div>
}

export default App