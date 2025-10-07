import {Track} from "../../../Track.tsx";
import {useTracksQuery} from "../model-segment/useTracksQuery.tsx";
import {type ChangeEvent, useState} from "react";
import {Pagination} from "../../../shared-layer/ui-segment/Pagination.tsx";
import {Search} from "../../../shared-layer/ui-segment/Search.tsx";


function usePagination() {
    const [pageNumber, setPageNumber] = useState(1)
    const [pageSize, setPageSize] = useState(5)

    return {
        pageNumber: pageNumber,
        pageSize: pageSize,
        setPageNumber: (newPageNumber: number) => {
            setPageNumber(newPageNumber)
        }, // Single Layer Abstraction
        setPageSize: (newPageSize: number) => {
            setPageSize(newPageSize)
            setPageNumber(1)
        }
    }
}

export function TracksList() {
    //const [searchParams] = useSearchParams();
    console.log('TracksList')
    const [search, setSearch] = useState('')

    const {
        pageNumber,
        pageSize,
        setPageNumber,
        setPageSize
    } = usePagination()

    const {data, isPending, isError} = useTracksQuery({
        pageSize,
        pageNumber,
        search
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

    const handlePageSelect = (pageNumber: number) => {
        setPageNumber(pageNumber)
    }

    const isPageContentUnactual = data.meta.page !== pageNumber
    //const isPageContentUnactual = !isPending && isFetching

    const handlePageSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setPageSize(Number(e.currentTarget.value))
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
        <select value={pageSize} onChange={handlePageSizeChange}>
            <option value={5}>5 items</option>
            <option value={10}>10 items</option>
            <option value={20}>20 items</option>
        </select>

        <Pagination total={data.meta.totalCount!}
                    skip={data.meta.pageSize * (pageNumber - 1)}
                    limit={data.meta.pageSize}
                    onPageSelect={handlePageSelect}
        />
        <ul style={{opacity: isPageContentUnactual ? '0.4' : '1'}}>
            {data.data.map(t => {
                return <Track key={t.id} track={t}
                />;
            })
            }
        </ul>
    </>;
}

