import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import BookCase from './BookCase'
import './index.css'
import './App.css'

ReactDOM.render(
    <BrowserRouter><BookCase /></BrowserRouter>
    , document.getElementById('root'))
