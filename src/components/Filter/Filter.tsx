import React from 'react'


interface Props{
    onClick: () => void
}
export default (props: Props) => {
    return <button onClick={props.onClick}>Sort by Name</button>
}