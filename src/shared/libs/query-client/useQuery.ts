import {useContext, useEffect, useRef, useState} from "react";
import type {Entry, QueryFnParams, QueryKey} from "./query-client.ts";


import {QueryClientContext} from "./QueryClientContext.tsx";


type Options<T> = {
    queryFn: (params: QueryFnParams) => Promise<T>
    enabled?: boolean,
    queryKey: QueryKey
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

    const queryClient = useContext(QueryClientContext);
    if (!queryClient) throw new Error('query client must be inside context')

    const initEntry = queryClient.initEntry(queryKey, enabled);

    // const [status, setStatus] = useState<'pending' | 'success' | 'loading'>('loading') // FSM
    // const [data, setData] = useState<D | null>(null)

    const [entry, setEntry] = useState<Entry>(initEntry)

    useEffect(() => {
        setEntry(initEntry);
    }, [initEntry])

    const abortControllerRef = useRef<AbortController>(null)


    useEffect(() => {

        abortControllerRef.current?.abort('Abort because new request')

        // if (queryKey.some(k => k === null)) {
        //     //if (!queryKey.every(k => k !== null)){
        //     // setStatus('pending')
        //     // setData(null)
        //     return
        // }

        if (!enabled) {
            return
        }


        abortControllerRef.current = new AbortController()

        const subscriber = () => {
            setEntry({...queryClient.get(queryKey)});
        }

        let unsubscribe: () => void;

        queryClient.fetch(queryFn, queryKey, abortControllerRef.current.signal)
            .then((e) => {
                unsubscribe = queryClient.subscribe(queryKey, subscriber)
                setEntry({...e})
            });

        return () => {
            unsubscribe?.();
        }
    }, queryKey)

    return {
        data: entry?.data, status: entry?.status ?? 'loading'
    }
}