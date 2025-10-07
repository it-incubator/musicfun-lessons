/* eslint-disable */

type Status = 'pending' | 'loading' | 'success';

export type Entry = {
    data: any
    status: Status,
    promise?: Promise<any>
    subscribers: (() => void)[]
}

export type QueryFnParams = {
    signal?: AbortSignal
}

export type QueryFn = (params: QueryFnParams) => Promise<any>

export type QueryKey = Array<string | number | null>


export class QueryClient {
    private cache = new Map<string, Entry>()

    async fetch(queryFn: QueryFn, queryKey: QueryKey, signal?: AbortSignal): Promise<Entry> {
        const entry = this.cache.get(queryKey.toString())!

        if (entry.promise) {
            return entry;
        }

        if (entry.data) {
            return entry;
        }

        const functionPromise = queryFn({
            signal
        })
        entry.promise = functionPromise

        try {
            const json = await functionPromise

            entry.data = json
            entry.status = 'success'
            entry.subscribers.forEach(subscriber => subscriber())
        } catch {
            console.log('Request was aborted')
        }
        entry.promise = undefined
        return entry;

    }

    initEntry(queryKey: QueryKey, enabled: boolean) {
        if (!this.cache.has(queryKey.toString())) {
            this.cache.set(queryKey.toString(), {
                data: null,
                status: enabled ? 'loading' : 'pending',
                promise: undefined,
                subscribers: []
            })
        }

        return this.cache.get(queryKey.toString())!;
    }

    subscribe(queryKey: QueryKey, callback: () => void) {
        this.cache.get(queryKey.toString())?.subscribers.push(callback)

        return () => {
            const subscribers = this.cache.get(queryKey.toString())!.subscribers;
            const index = subscribers.indexOf(callback);
            if (index !== -1) {
                subscribers.splice(index, 1);
            }
        }
    }

    // unsubscribe(queryKey: QueryKey, callback: () => void){
    //     const subscribers = this.cache.get(queryKey.toString())!.subscribers;
    //     const index = subscribers.indexOf(callback);
    //     if (index !== -1) {
    //         subscribers.splice(index, 1);
    //     }
    // }

    get(queryKey: QueryKey) {
        return this.cache.get(queryKey.toString())!
    }

}