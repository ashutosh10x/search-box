import React from 'react'
import './css/home.css'

export default function SelectedList (props) {
    const selectedItems = props.selectedItems ? props.selectedItems.map((item, i) => {
        return (<div key={i} className="selectedItem">
                    <span key={i + 'span'}>{item.Title}</span>
                    <span key={i + 'close'} className="close" onClick={() => props.removeSelectedItem(i)}>X</span>
            </div>)
    }) : []

    return (<div className="selected-items-container">{selectedItems} </div>)
}
