import {usePlaylists} from "../model-segment/usePlaylists.tsx";
import {Pagination} from "@/shared-layer/ui-segment/Pagination.tsx";
import {PlaylistListItemCard} from "@/entities/playlists/ui/PlaylistListItemCard.tsx";
import {type ChangeEvent, memo, useEffect} from "react";
import {useSearchParams} from "react-router";
import {create} from "zustand";

type Props = {
    userId?: string | undefined
}

type CounterStore = {
    count: number;
    name: string;
    inc: () => void;
};

export const useCounter = create<CounterStore>((set) => {
    return {
        count: 0,
        name: 'dimych',
        inc: () => {
            set((prev) => ({count: prev.count + 1}))
        }
    }
})

// export const useCounter = () => {
//     const [count, setCount] = useState(0)
//     useEffect(() => {
//
//     }, [])
//     return {
//         value: count,
//         inc: () => setCount(count + 1),
//     }
// }

type PlaylistsFilterDataType = {
    pageNumber: number,
    pageSize: number,
    search: string,
}

type PlaylistsFilterFunctionsType = {
    setParam: <K extends keyof PlaylistsFilterDataType>(paramName: K, paramValue: PlaylistsFilterDataType[K]) => void,
    isDirty: () => boolean
}

const playlistsFilterDefaults: PlaylistsFilterDataType =  {
    pageNumber: 1,
    pageSize: 5,
    search: '',
}

const usePlaylistsFilter = create<PlaylistsFilterDataType & PlaylistsFilterFunctionsType>((set) => {
    return {
        ...playlistsFilterDefaults,
        setParam(paramName: any, paramValue: any) {
            set(() => {
                return {
                    [paramName]: paramValue
                }
            })
        }
    }
})

export  function setupNotDefaultParams<T>(searchParams:  URLSearchParams, defaults: T, storeValues: T) {
    const clone = new URLSearchParams(searchParams);
    for (const key in defaults) {
        if (storeValues[key] !== defaults[key]) {
            // @ts-expect-error: typing doesnt matter for this case
            clone.set(key, storeValues[key].toString())
        }
    }
    return clone;
}

export const PlaylistsList = memo(({userId}: Props) => {
    //const paginator = usePagination()
    //const [search, setSearch] = useState('')

    //const {s, setS} = useState({});



    const {count, inc, name} = useCounter();

    const [searchParams, setSearchParams] = useSearchParams()
    const searchParamsStore = usePlaylistsFilter()
    const isStoreDirty = usePlaylistsFilter((state) => {
        return state.pageNumber !== playlistsFilterDefaults.pageNumber
            || state.pageSize !== playlistsFilterDefaults.pageSize
           || state.search !== playlistsFilterDefaults.search
    } )

    const search = searchParams.get('search') || searchParamsStore.search
    const pageNumber = Number(searchParams.get('pageNumber')) || searchParamsStore.pageNumber
    const pageSize = Number(searchParams.get('pageSize')) || searchParamsStore.pageSize

    useEffect( () => {
        if (searchParams.size === 0 && isStoreDirty) {
            const newSearchParams = setupNotDefaultParams(searchParams, playlistsFilterDefaults, searchParamsStore)
            setSearchParams(newSearchParams)
        }

        if (searchParams.size > 0 && !isStoreDirty) {

        }
    }, [])

    const {data, isPending, isError} = usePlaylists({
        userId,
        pageSize: pageSize,
        pageNumber: pageNumber,
        search
    })

    if (isPending) return <div>Loading...</div>
    if (isError) return <div>Some error... <button>try again</button></div>

    function handleSearch(e: ChangeEvent<HTMLInputElement>) {
        setSearchParams((prevSearchParams) => {
            if (e.currentTarget.value === '') {
                prevSearchParams.delete('search')
                return prevSearchParams
            }

            prevSearchParams.set('search', e.currentTarget.value)
            return prevSearchParams
        })
        searchParamsStore.setParam('search', e.currentTarget.value)
    }

    function handlePageSelect(pageNumber: number) {
        setSearchParams((prevSearchParams) => {
            if (pageNumber === 1) {
                prevSearchParams.delete('pageNumber')
                return prevSearchParams
            }

            prevSearchParams.set('pageNumber', pageNumber.toString())
            return prevSearchParams
        })
        searchParamsStore.setParam('pageNumber', pageNumber)
    }

    return <div>

        <h2>Playlists {userId}, </h2>
        <button onClick={inc}>{count} {name} </button>
        <input value={search} placeholder={'search'} onChange={handleSearch}/>
        <hr/>
        <Pagination total={data.meta.totalCount!}
                    skip={data.meta.pageSize * (pageNumber - 1)}
                    limit={data.meta.pageSize}
                    onPageSelect={handlePageSelect}
        />
        <div style={{display: 'flex', gap: '30px'}}>
            {data.data.map(p => <PlaylistListItemCard
                key={p.id} playlist={p}/>)}
        </div>

    </div>
})

