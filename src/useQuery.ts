import {useEffect, useRef, useState} from "react";

type QueryFnParams = {
    signal?: AbortSignal
}

type Options<T> = {
    queryFn: (params: QueryFnParams) => Promise<T>
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

    const abortControllerRef = useRef<AbortController>(null)

    useEffect(() => {

        abortControllerRef.current?.abort()

        if (queryKey.some(k => k === null)){
        //if (!queryKey.every(k => k !== null)){
            setStatus('pending')
            setData(null)
            return
        }

        if (!enabled) {
            return
        }


        abortControllerRef.current = new AbortController()

        queryFn({
            signal: abortControllerRef.current.signal
        }).then(json => {
            setData(json)
            setStatus('success')
        })
    }, queryKey)

    return {
        data, status
    }
}