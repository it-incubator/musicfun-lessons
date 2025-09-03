import {useEffect, useRef, useState} from "react";

type QueryStatus = 'pending' | 'success' | 'loading'

type Options<T> = {
    queryStatusDefault?: QueryStatus,
    queryKeys: string[],
    queryFn: () => Promise<T>
    skip?: boolean
}

// parameter object // сигнатура
export function useQuery<T>(options: Options<T>) {
    const [queryStatus, setQueryStatus] = useState<QueryStatus>(options.queryStatusDefault ?? 'loading' ) // FSM
    const [data, setData] = useState<T | null>(null)

    const abortControllerRef = useRef<null | AbortController>(null)

    useEffect( () => {
        if (options.skip) {
            return;
        }

        abortControllerRef.current?.abort()

        // if (!trackId) {
        //     setData(null)
        //     setQueryStatus('pending');
        //     return;
        // }

        abortControllerRef.current = new AbortController();

        setQueryStatus('loading');

        options.queryFn().then(json => {
            setData(json);
            setQueryStatus('success');
        })
    }, options.queryKeys)

    return {status: queryStatus, data}
}