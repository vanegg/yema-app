import React, { Component } from 'react'
import AppRouter from './components/AppRouter'
// import Header from './components/Header'
import './App.scss'

class App extends Component {
  render () {
    return (<>
      {/* <Header /> */}
      <AppRouter />
    </>)
  }
}

export default App
