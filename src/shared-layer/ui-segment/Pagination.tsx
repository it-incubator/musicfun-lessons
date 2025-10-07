type PaginationProps = {
    limit: number
    skip: number
    total: number
    onPageSelect: (pageNumber: number) => void
}

export function Pagination(props: PaginationProps) {
    const totalPagesCount = Math.ceil(props.total / props.limit)

    const currentPage = props.skip / props.limit + 1

    return <div style={{display: 'flex', flexDirection: 'row'}}>
        {[...Array(totalPagesCount)].map((_, index) => {
            return <div
                onClick={() => {
                    if (currentPage !== index + 1) {
                        props.onPageSelect(index + 1)
                    }
                }}
                style={{border: currentPage === index + 1 ? '1px red solid' : ''}}>{index + 1}</div>
        })}
    </div>
}