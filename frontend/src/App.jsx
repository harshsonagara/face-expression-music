import { useState } from 'react'
import FacialExpression from "./components/FacialExpression.jsx"
import MoodSongs from './components/MoodSongs.jsx'

function App() {

  const [ Songs, setSongs ] = useState([
       
    ])

  return (
    <>
      <FacialExpression setSongs={setSongs} />
      <MoodSongs Songs={Songs} />
    </>
  )
}

export default App