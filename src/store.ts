let state = {value: 1 };
type SubscriberType = () => void

let subscribers: SubscriberType[]  = []

setInterval(()=>{
    state = {value: state.value + 1};
    subscribers.forEach(subscriber => subscriber())
}, 1000)

export function getState() {
    console.log("getState")

    return state
}


export function subscribe(callbackObserverSubscriber: SubscriberType) {
    subscribers.push(callbackObserverSubscriber)
        return () => {
            subscribers.splice(subscribers.indexOf(callbackObserverSubscriber), 1)
    }
}


