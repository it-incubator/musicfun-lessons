import {Track} from "../../../Track.tsx";
import {useTracksQuery} from "../model-segment/useTracksQuery.tsx";
import {useEffect, useEffectEvent} from "react";
import {Pagination} from "../../../shared-layer/ui-segment/Pagination.tsx";
import {useSearchParams} from "react-router";

type Props = {
    userId?: string,
    includeDrafts?: boolean
}


export function TracksListForFindBug({userId, includeDrafts}: Props) {

    const [params, setParams] = useSearchParams()

    const pageNumber = params.get('pageNumber')

    const tick = useEffectEvent(() => {
        setParams((prev) => {
            prev.set('pageNumber', (Number(prev.get('pageNumber')) + 1).toString())
            return prev;
        })
    })

    useEffect(() => {
        setInterval(() => {
            tick()
        }, 5000)

    }, [])

    const {data, isPending, isError} = useTracksQuery({
       pageNumber: Number(pageNumber),
       pageSize: 2,
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


    return <>

        <Pagination total={data.meta.totalCount!}
                    skip={data.meta.pageSize * (pageNumber - 1)}
                    limit={data.meta.pageSize}
                    onPageSelect={(pageNumber) => {
                        //setSearchParams('pageNumber', pageNumber.toString())
                    }}
        />
        <ul>
            {data.data.map(t => {
                return <Track key={t.id} track={t} />;
            })
            }
        </ul>
    </>;
}

