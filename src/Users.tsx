export function Users() {

    useEdct()

    useEffect(() => {
        fetch('https://musicfun.it-incubator.app/api/1.0/playlists/tracks')
    }, [])
    return <div>Users</div>
}


