import {useQuery} from "./useQuery.ts";
import {api} from "./api.ts";

type Props = {
    trackId: string | null
}

export function TrackDetail(props: Props) {
    const {data, status} = useQuery({
        queryFn: ({signal}) => {
            return api.getTrack(props.trackId!, signal);
        },
        enabled: Boolean(props.trackId),
        queryKey: ['track', props.trackId]
    })

    if (status === 'pending') {return <span>no track for display</span>}

    if (status === 'loading') {
        return <div>loading...</div>
    }

    return  <div>
        <h2>Detail</h2>

            <h3>{data!.data.attributes.title}</h3>
            <div>{data!.data.attributes.addedAt}</div>
            <div>likes: {data!.data.attributes.likesCount}</div>
            <div>lyrics: {data!.data.attributes.lyrics}</div>

    </div>;
}