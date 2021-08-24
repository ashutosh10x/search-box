import React, { Component } from 'react'
import './css/home.css'
import { fetchData } from './api'
import {customDebounce} from './utility'
import SearchList from './SearchList'
import SelectedList from './SelectedList'

const searchAPIDebounced = (fn, d) => customDebounce(fn, d)

export default class Home extends Component {

    constructor (props) {
        super(props)
        this.state = {
            searchList: [],
            totalResults: 0,
            selectedItems: [],
            serachStr: '',
            fetching: false,
            outClick: false
        }
    }


    onListItemClick (event, item, index) {
        console.log('ss')
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

    handleChange (e) {
        const text = e.target.value
        this.setState({
            outClick: false,
            serachStr: text
        })
        try {
            searchAPIDebounced(fetchData(text).then((data) => {
                this.setState({
                    searchList: data.Search,
                    totalResults: data.totalResults
                })
            }).catch((e) => console.log(e)), 200)
            
        } catch (e) {
            console.log(e)
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside.bind(this));
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside.bind(this));
    }

    handleClickOutside(e) {
       if (this.wrapperRef && !this.wrapperRef.contains(e.target)) {
           this.setState({
                outClick: true
           })
       }
    }

    focusInput () {
        this.textInput.focus();
    }

    render() {
       const selectedItems = this.state.selectedItems
       const searchList = this.state.searchList
       const outSideClick = this.state.outClick
       console.log(selectedItems, 'selectedItems')
        return (
            <div className="home-body">
                <section>
                    <div className="editable-box" onClick={this.focusInput.bind(this)}>
                        <SelectedList selectedItems={selectedItems} removeSelectedItem={this.removeSelectedItem.bind(this)} />
                        <input 
                            ref={ i => this.textInput = i} 
                            type="text" 
                            className="input-box" 
                            onChange={(e) => this.handleChange(e)} 
                            placeholder="Search...">
                        </input>
                    </div>
                </section>
                <div ref={i => this.wrapperRef = i}>
                 <SearchList         
                    outClick={outSideClick}
                    searchList={searchList} 
                    handleKeyDown={(e, item) => this.handleKeyDown(e, item)} 
                    onListItemClick={this.onListItemClick.bind(this)}/>
                </div>
            </div>
        )
    }
}
