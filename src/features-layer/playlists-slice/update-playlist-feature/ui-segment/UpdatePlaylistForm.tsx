import {useUpdatePlaylistMutation} from "../model-segment/useUpdatePlaylistMutation.tsx";
import {useForm} from "react-hook-form";
import type {SchemaUpdatePlaylistRequestPayload} from "@/shared-layer/api-segment/schema.ts";
import {usePlaylistQuery} from "@/entities/playlists/model/usePlaylistQuery.ts";

export const UpdatePlaylistForm = ({playlistId}: { playlistId: string }) => {

    const {error, mutateAsync} = useUpdatePlaylistMutation()

    const {data, isPending, isError} = usePlaylistQuery(playlistId)


    const {
        handleSubmit,
        register
    } = useForm<SchemaUpdatePlaylistRequestPayload>()

    const submitFormLogic = async (data: SchemaUpdatePlaylistRequestPayload) => {

        try {
           await mutateAsync({
                payload: {
                    ...data,
                    tagIds: []
                },
                playlistId
            })
            alert('Success')
        } catch (e) {

        }


        console.log('submit')
    }

    if (isPending) return <div>Loading...</div>
    if (isError) return <div>some error</div>

    return <form onSubmit={handleSubmit(submitFormLogic)}>
        {isError && <div style={{color: 'red'}}>
            {JSON.stringify(error)}
        </div>}

        <div>
            <input {...register('title')} defaultValue={data.data.attributes.title}/>
        </div>
        <div>
            <textarea  {...register('description')} defaultValue={data.data.attributes.description ?? ''}/>
        </div>
        <div>
            <button disabled={isPending} type={'submit'}>Create</button>
        </div>

    </form>
}