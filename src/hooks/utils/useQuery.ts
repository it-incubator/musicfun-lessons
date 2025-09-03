import {useState} from "react";

type QueryStatus = 'pending' | 'success' | 'loading'

export function useQuery<T>(queryStatusDefault: QueryStatus = 'loading') {
    const [queryStatus, setQueryStatus] = useState<QueryStatus>(queryStatusDefault) // FSM
    const [data, setData] = useState<T | null>(null)

    return {queryStatus, setQueryStatus, data, setData}
}