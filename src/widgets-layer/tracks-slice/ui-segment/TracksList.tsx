import {Track} from "../../../Track.tsx";
import {useTracksQuery} from "../model-segment/useTracksQuery.tsx";
import {type ChangeEvent, useState} from "react";
import {Pagination} from "../../../shared-layer/ui-segment/Pagination.tsx";
import {Search} from "../../../shared-layer/ui-segment/Search.tsx";
import {usePagination} from "@/shared-layer/utils/hooks/usePagination.tsx";

type Props = {
    userId?: string,
    includeDrafts?: boolean
}

export function TracksList({userId, includeDrafts}: Props) {
    const [search, setSearch] = useState('')

    const paginator = usePagination()

    const {data, isPending, isError} = useTracksQuery({
       pageNumber: paginator.pageNumber,
       pageSize: paginator.pageSize,
        search,
        userId,
        includeDrafts
    })


    if (isPending) {
        return <div>loading...</div>
    }

    if (isError) {
        return <div>
            {/*sort by {searchParams.get('sort')}*/}
            <hr/>
            Can't load tracks list</div>
    }

    const isPageContentUnactual = data.meta.page !== paginator.pageNumber
    //const isPageContentUnactual = !isPending && isFetching

    const handlePageSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        paginator.setPageSize(Number(e.currentTarget.value))
    }

    const handleSearchClick = (value: string) => {
                    setSearch(value)
    }

    return <>
        <Search onSearch={handleSearchClick}
                isSearchButtonVisible={false}
                mode={"throttle"}
        />
    <hr/>
        <select value={paginator.pageSize} onChange={handlePageSizeChange}>
            <option value={5}>5 items</option>
            <option value={10}>10 items</option>
            <option value={20}>20 items</option>
        </select>

        <Pagination total={data.meta.totalCount!}
                    skip={data.meta.pageSize * (paginator.pageNumber - 1)}
                    limit={data.meta.pageSize}
                    onPageSelect={paginator.setPageNumber}
        />
        <ul style={{opacity: isPageContentUnactual ? '0.4' : '1'}}>
            {data.data.map(t => {
                return <Track key={t.id} track={t} />;
            })
            }
        </ul>
    </>;
}

