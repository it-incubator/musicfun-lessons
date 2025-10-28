import type {FormEvent} from "react";
import {useCreatePlaylistMutation} from "../model-segment/useCreatePlaylistMutation.tsx";

export const CreatePlaylistForm = () => {

    const {isPending, isError, error, mutate} = useCreatePlaylistMutation()


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;

        // Create a FormData object from it
        const formData = new FormData(form);

        const entries = formData.entries();
        // Convert FormData entries to an object (optional)
        const values = Object.fromEntries(entries);

        mutate(values as any, {
            onSuccess: () => {
                form.reset();
            }
        })

        console.log('submit')
    }

    return <form onSubmit={ handleSubmit }>
        {/*isIdle: {isIdle ? 'true': 'false'}*/}
        {/*isPending: {isPending? 'true':'false' }*/}
        {isError && <div style={{color: 'red'}}>
            {JSON.stringify(error)}
        </div> }

        <div>
            <input name={'title'}/>
        </div>
        <div>
            <textarea name={'description'} />
        </div>
        <div>
            <button disabled={isPending} type={'submit'}>Create</button>
        </div>

    </form>
}