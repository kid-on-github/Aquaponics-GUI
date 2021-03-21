import React from 'react'

function Topbar(props){
    const cn = 'topbar ' + props.msg[0]
    let fade = {}
    if (props.msg.length === 3){
        setTimeout(
            ()=>props.topbarMessage(false),
            props.msg[2]
        )
    }
    return (
        <div className={cn} style={fade}>
            <p>{props.msg[1]}</p>
        </div>
    )
}

export default Topbar