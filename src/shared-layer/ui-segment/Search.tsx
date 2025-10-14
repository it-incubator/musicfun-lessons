import {type ChangeEvent, useEffect, useRef, useState} from "react";

type Props = {
    onSearch: (value: string) => void
    isSearchButtonVisible?: boolean
    mode?: 'debounce' | 'throttle' | 'immediate'
};

export function Search({
                           onSearch,
                           isSearchButtonVisible = true,
                           mode = 'immediate'
                       }: Props) {
    console.log("Search")
    const [search, setSearch] = useState('')
    const timerIdRef = useRef<number>(undefined)
    const throttleIsWaitingRef = useRef(false)
    const searchValueRef = useRef('')

    useEffect(() => {
        if (!isSearchButtonVisible) {
            switch (mode) {
                case 'immediate':
                    onSearch(search)
                    break;
                case 'debounce':
                    timerIdRef.current = setTimeout(() => {
                        onSearch(search)
                    }, 1000)
                    break;
                case 'throttle':
                    if (throttleIsWaitingRef.current) {
                        return;
                    }
                    timerIdRef.current = setTimeout(() => {
                        onSearch(searchValueRef.current)
                        throttleIsWaitingRef.current = false
                    }, 1000)
                    throttleIsWaitingRef.current = true;
                    break;
                default:
                    onSearch(search)
            }
        }

        return () => {
            if (mode === 'debounce') {
                clearTimeout(timerIdRef.current);
            }
        }
    }, [search, mode, isSearchButtonVisible, onSearch])

    useEffect(() => {
        return () => {
            clearTimeout(timerIdRef.current);
        }
    }, [])

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        setSearch(value);
        searchValueRef.current = value;
    }

    const handleSearchClick = () => {
        onSearch(search)
    }

    return <> <input value={search} placeholder={'search...'} onChange={handleSearchChange}/>
        {isSearchButtonVisible && <button onClick={handleSearchClick}>Search</button>}
    </>
}