import { useState } from 'react';


interface Props{
    character: {name: string}, 
    onClick: ()=>void
}

export default (props: Props)=>{
    const initialState = {
        ...props.character, 
        isActive: false
    }

    const [state, setState] = useState(initialState)

    const onClickItem =()=>{
        props.onClick();
        setState({
            ...state,
            isActive: true
        })
    }
    return <li onClick={onClickItem} className={`clickable-item ${ state.isActive && ' clickable-item__active'}`}>
        <p className="title">{state.name}</p>
    </li>
}