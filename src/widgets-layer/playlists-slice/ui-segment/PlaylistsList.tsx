import {usePlaylists} from "../model-segment/usePlaylists.tsx";
import {Pagination} from "@/shared-layer/ui-segment/Pagination.tsx";
import {PlaylistListItemCard} from "@/entities/playlists/ui/PlaylistListItemCard.tsx";
import {type ChangeEvent, memo, useEffect} from "react";
import {useSearchParams} from "react-router";
import {create} from "zustand";
import {searchStorage} from "@/shared-layer/utils/storage/search-params-storage.ts";
import {useParamsWithSync} from "@/shared-layer/utils/hooks/useParamsWithSync.ts";

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

export const PlaylistsList = memo(({userId}: Props) => {
    //const paginator = usePagination()
    //const [search, setSearch] = useState('')

    //const {s, setS} = useState({});

    const {count, inc, name} = useCounter();

    const {search, pageNumber, pageSize, setSearchParams} = useParamsWithSync('playlists-filters', playlistsFilterDefaults)

    const {data, isPending, isError} = usePlaylists({
        userId,
        pageSize: pageSize,
        pageNumber: pageNumber,
        search
    })

    if (isPending) return <div>Loading...</div>
    if (isError) return <div>Some error... <button>try again</button></div>

    function handleSearch(e: ChangeEvent<HTMLInputElement>) {
        setSearchParams('search', e.currentTarget.value)
    }

    function handlePageSelect(pageNumber: number) {
        setSearchParams('pageNumber', pageNumber.toString())
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

