import type {SchemaTrackListItemOutput} from "./shared-layer/api-segment/schema.ts";
import {NavLink} from "react-router";
import {DeleteTrackButton} from "./features-layer/tracks-slice/delete-track-feature/ui-segment/DeleteTrackButton.tsx";

type Props = {
    track: SchemaTrackListItemOutput
}

export function Track(props: Props) {
    return <li>
        <h4><NavLink to={'/tracks/' + props.track.id}>{props.track.attributes.title}</NavLink></h4>
        <audio
            src={props.track.attributes.attachments[0]!.url}
            controls={true}
        />
        { !props.track.attributes.isPublished && <span>not published</span> }
        <DeleteTrackButton trackId={props.track.id}/>
    </li>
}


// subject/observable/publisher
 //button.addEventListener('click', () => {})

