export type SearchStorageType = {
    saveParams: (key: string, searchParams: URLSearchParams) => void
    getParams: (key: string) => URLSearchParams | null

}


export const searchStorage: SearchStorageType = {
    saveParams: (key: string, searchParams: URLSearchParams) => {
        localStorage.setItem(key, searchParams.toString());
    },
    getParams(key: string) {
        const value = localStorage.getItem(key);
        if (value)  return new URLSearchParams(value);

        return null
    }
}
