import {useCallback, useEffect} from "react";
import {searchStorage} from "@/shared-layer/utils/storage/search-params-storage.ts";
import {useSearchParams} from "react-router";

export const useParamsWithSync = <T,>(key: string, defaults: T) => {
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect( () => {
        const paramsFromStorage = searchStorage.getParams(key)

        if (searchParams.size === 0 && paramsFromStorage) {
            setSearchParams(paramsFromStorage)
        }

        if (searchParams.size > 0 && !paramsFromStorage) {
            searchStorage.saveParams(key, searchParams)
        }
    }, [])

    useEffect(() => {
        searchStorage.saveParams(key, searchParams)
    }, [searchParams]);


    // @ts-expect-error pofigu
    const params = Object.keys(defaults).reduce((acc, propName) => {

        const valueFromSearchParams = searchParams.get(propName)

        if (valueFromSearchParams) {
            // @ts-expect-error pofigu
            const castedValue = typeof defaults[propName] === 'number' ? Number(valueFromSearchParams) : valueFromSearchParams;
            // @ts-expect-error pofigu
            acc[propName] = castedValue
        } else {
            // @ts-expect-error pofigu
            acc[propName] = defaults[propName]
        }

        return acc;
    }, {})

    const setParamsCallback = useCallback((key: keyof T, value: string) => {
        setSearchParams((prevSearchParams) => {
            // @ts-expect-error pofigu
            if (value === defaults[key].toString()) {
                // @ts-expect-error pofigu
                prevSearchParams.delete(key)
                return prevSearchParams
            }
            // @ts-expect-error pofigu
            prevSearchParams.set(key, value)
            return prevSearchParams
        })
    }, [searchParams, defaults])

    const setParams = (propName: keyof T, value: string) => {
        setSearchParams((prevSearchParams) => {
            console.log(prevSearchParams.toString())
            // @ts-expect-error pofigu
            if (value === defaults[propName].toString()) {
                // @ts-expect-error pofigu
                prevSearchParams.delete(propName)
                return prevSearchParams
            }
            // @ts-expect-error pofigu
            prevSearchParams.set(propName, value)
            return prevSearchParams
        })
    }

    return {...params as T, setSearchParams: setParams}
};