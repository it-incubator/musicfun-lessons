import {useEffect, useState} from "react";

type Options<T> = {
    queryFn: () => Promise<T>
    enabled?: boolean,
    queryKey: Array<string | number | null>
}

export function useQuery<D>(options: Options<D>) {
    const {
        queryFn,
        enabled = true,
        queryKey
    } = options;

    if (!queryKey) { // invariants checking
        throw new Error('queryKey is required')
    }

    const [status, setStatus] = useState<'pending' | 'success' | 'loading'>('loading') // FSM
    const [data, setData] = useState<D | null>(null)

    useEffect(() => {
        if (queryKey.some(k => k === null)){
        //if (!queryKey.every(k => k !== null)){
            setStatus('pending')
            setData(null)
            return
        }

        if (!enabled) {
            return
        }
        queryFn().then(json => {
            setData(json)
            setStatus('success')
        })
    }, queryKey)

    return {
        data, status
    }
}

function pingPong<D>(data: D) {
    return data
}


let a = pingPong(23)
a = 'dsd'
console.log(a)