function HostDash(){
    const placeholder = [{id:1, name:'blah', artist:'blah', url:'https://www.youtube.com/watch?v=KZnou4zthz4'}]
    return(
        <>
        <div>
        <h1>Setup instructions</h1>
        <p>Instructions go here!</p>
        </div>
        <div>
            <h1>Open main display in a new tab</h1>
            <button>MAIN DISPLAY</button>
        </div>
        <div>
            <h1>Song queue</h1>
            <table>
                <tr>
                    <th>Order</th>
                    <th>Player Name</th>
                    <th>Song Title</th>
                    <th>Source</th>
                </tr>
                {placeholder.map(song => (
                    <tr>
                        <td>
                            {song.id}
                        </td>
                        <td>
                            Playername
                        </td>
                        <td>
                        {song.name} {song.artist}
                        </td>
                        <td>
                            {song.url}
                        </td>

                    </tr>
                ))}
            </table>
        </div>

        </>
    )
}

export default HostDash;