import {useState} from 'react'
import './App.css'
import { InfinityListV4 } from "./InfinityListV4.tsx";
import { InfinityListV2 } from "./InfinityListV2.tsx";
import { InfinityListV3 } from "./InfinityListV3.tsx";
// import {RefCallbackExample} from "./RefCallbackExample.tsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        {/*<div>*/}
        {/*    {count < 1 && <RefCallbackExample /> }*/}
        {/*</div>*/}
        <div>
            {count < 1 && <InfinityListV4 /> }
        </div>

        <button onClick={() => setCount(count + 1)}>inc {count}</button>
        <button onClick={() => setCount(count - 1)}>dec {count}</button>
        {/*{count < 5 && <SecondsUseEffectEvent />}*/}

    </>
  )
}


export default App
