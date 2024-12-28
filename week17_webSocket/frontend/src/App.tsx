import {useEffect} from 'react'

function App() {

  useEffect(()=>{
    const  webSocket = new WebSocket('http://localhost:8080');
    webSocket.onmessage()
    setInterval(()=>{
      
    },2000)
  },[])

  return (
   <>
   <input type="text" />
   <button>Send</button>
   </>
  )
}

export default App
