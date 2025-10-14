import {type ChangeEvent, type FormEvent, useState} from "react";
import {useUploadTrack} from "../model/useUploadTrack.ts";

export const UploadTrackForm = () => {
    const [title, setTitle] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const {mutate, isPending, isError, isSuccess, error} = useUploadTrack();

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.currentTarget.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!title.trim() || !file) {
            return;
        }

        mutate(
            {title, file},
            {
                onSuccess: () => {
                    // Reset form on success
                    setTitle('');
                    setFile(null);
                    // Reset file input
                    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
                    if (fileInput) {
                        fileInput.value = '';
                    }
                }
            }
        );
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Track Title:</label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="Enter track title"
                    disabled={isPending}
                    required
                />
            </div>

            <div>
                <label htmlFor="file">MP3 File:</label>
                <input
                    id="file"
                    type="file"
                    accept="audio/mp3,audio/mpeg"
                    onChange={handleFileChange}
                    disabled={isPending}
                    required
                />
            </div>

            <button type="submit" disabled={isPending || !title.trim() || !file}>
                {isPending ? 'Uploading...' : 'Upload Track'}
            </button>

            {isError && <div style={{color: 'red'}}>Error: {error?.message}</div>}
            {isSuccess && <div style={{color: 'green'}}>Track uploaded successfully!</div>}
        </form>
    );
};
