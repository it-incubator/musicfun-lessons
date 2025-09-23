import type {SchemaTrackListItemOutput} from "./shared/api/schema.ts";
import {NavLink} from "./shared/libs/router/Route.tsx";

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
    </li>
}


// subject/observable/publisher
 //button.addEventListener('click', () => {})

