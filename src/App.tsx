import {useState} from 'react'
import './App.css'
import {InfinityListV2} from "./InfinityListV2.tsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <div>
            {count < 1 && <InfinityListV2 /> }
        </div>

        <button onClick={() => setCount(count + 1)}>inc {count}</button>
        <button onClick={() => setCount(count - 1)}>dec {count}</button>
        {/*{count < 5 && <SecondsUseEffectEvent />}*/}

    </>
  )
}


export default App
