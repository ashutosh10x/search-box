import React, { Component } from 'react'
import './css/home.css'
import { fetchData } from './api'
import {customDebounce} from './utility'

// const searchAPIDebounced = (fn, d) => customDebounce(fn, d)

export default class Home extends Component {

    constructor (props) {
        super(props)

        this.state = {
            searchList: [],
            totalResults: 0,
            selectedItems: [],
            serachStr: '',
            fetching: false
        }
    }


    onListItemClick (event, item, index) {
        this.setState({
            selectedItems: [...this.state.selectedItems, item]
        })
    }

    handleKeyDown(e, item) {
        if (e.key === 'Enter') {
            this.setState({
                selectedItems: [...this.state.selectedItems, item]
            })
        }
    }

    removeSelectedItem (e, i) {
        let copySelectedItems = [...this.state.selectedItems]
        copySelectedItems.splice(i, 1)
        this.setState({
            selectedItems: copySelectedItems
        })
    }

    async handleChange (e) {
        console.log(e, e.target.value)
        const text = e.target.value
        try {
            customDebounce((e) => {
                fetchData(text).then((data) => {
                    console.log('fetchData', data)
                    this.setState({
                        searchList: data.Search,
                        totalResults: data.totalResults
                    })
                }).catch((e) => console.log(e))
              }, 100)
            
        } catch (e) {
            console.log(e)
        }

    }

    render() {
        const items = this.state.searchList ? this.state.searchList.map((item, i) => {
            return (<li key={i} onKeyDown={(e) => this.handleKeyDown(e, item)} onClick={(e) => this.onListItemClick(e, item, i)}>{item.Title}</li>)
        }): []

        const selectedItems = this.state.selectedItems ? this.state.selectedItems.map((item, i) => {
            return (<div key={i} class="selectedItem">
                        <span key={i + 'span'}>{item.Title}</span>
                        <span key={i + 'close'} className="close" onClick={(e) => this.removeSelectedItem(e, i)}>X</span>
                </div>)
        }) : []

        return (
            <div className="home-body">
                
                <section>
                    <div className="editable-box">
                        {selectedItems}
                        <input type="text" className="input-box" onChange={(e) => this.handleChange(e)} placeholder="Search..."></input>
                        {/* <div className="" contentEditable="true" onInput={(e) => this.handleChange(e)}></div> */}
                    </div>
                    {/* <input type="text" className="input-box" onChange={(e) => this.handleChange(e)} placeholder="Search..."></input> */}
                </section>
                <section>
                    <ul>{items}</ul>
                </section>
            </div>
        )
    }
}
