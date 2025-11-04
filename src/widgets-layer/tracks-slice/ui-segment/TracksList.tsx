import {Track} from "../../../Track.tsx";
import {useTracksQuery} from "../model-segment/useTracksQuery.tsx";
import {type ChangeEvent, useCallback, useState} from "react";
import {Pagination} from "../../../shared-layer/ui-segment/Pagination.tsx";
import {Search} from "../../../shared-layer/ui-segment/Search.tsx";
import {usePagination} from "@/shared-layer/utils/hooks/usePagination.tsx";
import {useCounter} from "@/widgets-layer/playlists-slice/ui-segment/PlaylistsList.tsx";
import {useParamsWithSync} from "@/shared-layer/utils/hooks/useParamsWithSync.ts";

type Props = {
    userId?: string,
    includeDrafts?: boolean
}

const tracksListFilterDefaults = {
    pageNumber: 1,
    pageSize: 5,
    search: '',
}

export function TracksList({userId, includeDrafts}: Props) {

    const {search, pageNumber, pageSize, setSearchParams} = useParamsWithSync('tracks-filters', tracksListFilterDefaults)


    const {data, isPending, isError} = useTracksQuery({
       pageNumber: pageNumber,
       pageSize: pageSize,
        search,
        userId,
        includeDrafts
    })

    const {count, inc} =  useCounter()

    const handleSearchClick = (value: string) => {
        setSearchParams('search', value)
    }

    if (isPending) {
        return <div>loading...</div>
    }

    if (isError) {
        return <div>
            {/*sort by {searchParams.get('sort')}*/}
            <hr/>
            Can't load tracks list</div>
    }

    const isPageContentUnactual = data.meta.page !== pageNumber
    //const isPageContentUnactual = !isPending && isFetching

    const handlePageSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSearchParams('pageSize', e.currentTarget.value)
    }

    return <>
        <Search onSearch={handleSearchClick}
                isSearchButtonVisible={false}
                mode={"throttle"}
        />
    <hr/>
        zustand state: <button onClick={inc}>{count}</button>
        <select value={pageSize} onChange={handlePageSizeChange}>
            <option value={5}>5 items</option>
            <option value={10}>10 items</option>
            <option value={20}>20 items</option>
        </select>

        <Pagination total={data.meta.totalCount!}
                    skip={data.meta.pageSize * (pageNumber - 1)}
                    limit={data.meta.pageSize}
                    onPageSelect={(pageNumber) => {
                        setSearchParams('pageNumber', pageNumber.toString())
                    }}
        />
        <ul style={{opacity: isPageContentUnactual ? '0.4' : '1'}}>
            {data.data.map(t => {
                return <Track key={t.id} track={t} />;
            })
            }
        </ul>
    </>;
}

