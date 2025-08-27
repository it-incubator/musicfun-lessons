import type {TrackDataItem} from "./types.ts";

type TrackItemProps = {
    track: TrackDataItem;
    selectedTrackId: string | null;
    handleSelectTrackClick: (trackId: string) => void
}

export function TrackItem(props: TrackItemProps) {
    const color = props.track.id === props.selectedTrackId ? 'red' : 'white'

    return <li style={{color: color}} key={props.track.id}>
        <h4 onClick={() => props.handleSelectTrackClick(props.track.id)}>{props.track.attributes.title}</h4>
        <audio
            src={props.track.attributes.attachments[0].url}
            controls={true}
        />
    </li>
}