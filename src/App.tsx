import {useState, useSyncExternalStore} from "react";
import {getState, subscribe} from "./store.ts";
import {getStateOnline, subscribeOnline} from "./online-store.ts";



export function App() {
    const [show, setShow] = useState(true);
    console.log('App')
    //button.addEventListener(listener);
    //button.removeEventListener(listener);

    // const unsubscribe = store.subscribe(listener);

    return (
        <div>
            <Online />
            <button onClick={() => setShow(!show)}>
                {show ? 'Destroy' : 'Mount'}
            </button>
            {show && <TodosApp2/>}
        </div>
    )
}




function Online() {
    const isOnline = useSyncExternalStore(
        subscribeOnline,
        getStateOnline
    );

    return <div>{isOnline ? 'online' : 'offline'}</div>
    // ...
}

function TodosApp2() {
    console.log("TodosApp")
    const count = useSyncExternalStore(
        subscribe,
        getState
    );

    return <div>{count.value}</div>
    // ...
}


function TodosApp() {
    console.log("TodosApp")
    const count = useSyncExternalStore(
        function subscribe() {
            console.log('subscribe')
            return function unsubscribe() {
                console.log('unsubscribe')
            }
        },
        function getSnapshot() {
            console.log('getSnapshot')
            return 1
        }
        );

    return <div>{count}</div>
    // ...
}



