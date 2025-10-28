import {useDeletePlaylistMutation} from "../model-segment/useDeletePlaylist.tsx";

type Props = {
    playlistId: string
}
export const DeletePlaylistButton = ({playlistId}: Props) => {

    const {isPending, mutate} = useDeletePlaylistMutation();

    const handleClick = () => {
        mutate({playlistId})
    }

    return <button disabled={isPending} onClick={handleClick}>Delete</button>
}