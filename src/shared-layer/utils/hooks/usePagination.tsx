import {useState} from "react";

export function usePagination() {
    const [pageNumber, setPageNumber] = useState(1)
    const [pageSize, setPageSize] = useState(5)

    return {
        pageNumber: pageNumber,
        pageSize: pageSize,
        setPageNumber: (newPageNumber: number) => {
            setPageNumber(newPageNumber)
        }, // Single Layer Abstraction
        setPageSize: (newPageSize: number) => {
            setPageSize(newPageSize)
            setPageNumber(1)
        }
    }
}