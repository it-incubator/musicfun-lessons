import {usePlaylists} from "../model-segment/usePlaylists.tsx";
import {usePagination} from "@/shared-layer/utils/hooks/usePagination.tsx";
import {Pagination} from "@/shared-layer/ui-segment/Pagination.tsx";
import {PlaylistListItemCard} from "@/entities/playlists/ui/PlaylistListItemCard.tsx";
import type {SchemaGetPlaylistsRequestPayload} from "@/shared-layer/api-segment/schema.ts";

type Props = {
    userId?: string | undefined
}

export const PlaylistsList = ({userId}: Props) => {

    const paginator = usePagination()

    const {data, isPending, isError} = usePlaylists({
        userId,
        pageSize: paginator.pageSize,
        pageNumber: paginator.pageNumber
    })

    if (isPending) return <div>Loading...</div>
    if (isError) return <div>Some error... <button>try again</button></div>

    return <div>Playlists {userId}
        <div style={{display: 'flex', gap: '30px'}}>
            {data.data.map(p => <PlaylistListItemCard
                key={p.id} playlist={p}/>)}
        </div>
        <Pagination total={data.meta.totalCount!}
                    skip={data.meta.pageSize * (paginator.pageNumber - 1)}
                    limit={data.meta.pageSize}
                    onPageSelect={paginator.setPageNumber}
        />
    </div>
}

