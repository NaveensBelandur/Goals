import React from 'react'
import Login from './Component/Login'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Component/Home'
import AddList from './Component/AddList'
import NavBar from './Component/NavBar'

const App = () =>{
    return (
        <>
        <Router>
            <Routes>
            <Route path="/" element={<Login/>} />
            <Route path='/home' element={<Home/>}/>
            <Route path='/addGoal' element={<AddList heading={'Add Goal'} title={'Add Your Goal'} test={'Home'}/>}/>
            </Routes>
        </Router>
        </>
    )
}





export default App