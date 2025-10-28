import type {FormEvent} from "react";
import {useUploadPlaylistCover} from "../model-segment/useUploadPlaylistCover.tsx";
type Props = {
    playlistId: string;
}
export const UploadPlaylistCoverForm = ({playlistId}: Props) => {

    const {isPending, isError, error, mutate} = useUploadPlaylistCover()


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;

        // Create a FormData object from it
        const formData = new FormData(form);

        const entries = formData.entries();
        // Convert FormData entries to an object (optional)
        const values = Object.fromEntries(entries);

        mutate({
            ...values,
            playlistId
        } as any, {
            onSuccess: () => {
                form.reset();
            }
        })
    }

    return <form onSubmit={ handleSubmit }>
        {isError && <div style={{color: 'red'}}>
            {JSON.stringify(error)}
        </div> }
        <div>
            <input name={'file'} type={'file'}/>
        </div>
        <div>
            <button disabled={isPending} type={'submit'}>Upload</button>
        </div>

    </form>
}