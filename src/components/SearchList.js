import React from 'react'
import './css/home.css'

export default function SearchList(props) { 

    const items = props.searchList ? props.searchList.map((item, i) => {
        return (<li key={i} onKeyDown={(e) => props.handleKeyDown(e, item)} onClick={(e) => props.onListItemClick(e, item, i)}>{item.Title}</li>)
    }): []

    const ulStyle = {
        display: props.searchList && props.searchList.length > 0 ? 'block' : 'none'
    }

    return (<div><ul style={ulStyle}>{items}</ul></div>)   
}
