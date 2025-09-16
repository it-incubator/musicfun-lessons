import type {SchemaTrackListItemOutput} from "./shared/api/schema.ts";

type Props = {
    track: SchemaTrackListItemOutput
    isSelected: boolean
    onSelect: (trackId: string) => void
}

export function Track(props: Props) {

    const color = props.isSelected ? 'red' : 'white'

    return <li style={{color: color}}>
        <h4 onClick={() => {
            props.onSelect(props.track.id)
        }}>{props.track.attributes.title}</h4>
        <audio
            src={props.track.attributes.attachments[0]!.url}
            controls={true}
        />
    </li>
}


// subject/observable/publisher
 //button.addEventListener('click', () => {})

