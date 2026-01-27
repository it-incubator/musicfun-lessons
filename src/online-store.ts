type SubscriberType = () => void

export function getStateOnline() {
    return navigator.onLine;
}

export function subscribeOnline(callbackObserverSubscriber: SubscriberType) {
    window.addEventListener('online', callbackObserverSubscriber);
    window.addEventListener('offline', callbackObserverSubscriber);
    return () => {
        window.removeEventListener('online', callbackObserverSubscriber);
        window.removeEventListener('offline', callbackObserverSubscriber);
    };
}


