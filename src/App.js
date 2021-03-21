import React from 'react';
import './main.css';
import LineCharts from './components/LineCharts'
import BarCharts from './components/BarCharts'
import System from './components/System'
import Control from './components/Control'
import Topbar from './components/Topbar'

class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      msg: false
    }
    this.getMSG = this.getMSG.bind(this)
  }


  topbarMessage(msg){
    this.setState({msg:msg})
  }
  

  getMSG(){
    fetch(`https://f1fda850-4011-4c6a-9972-4363465a1059.mock.pstmn.io/messages`)
    .then(r => r.json())
    .then(r => {
      if (r !== this.state.msg){
        this.setState({msg:r})
      }
    })        
    .then(() => { 
      setTimeout(
        () => this.getMSG(),
        30000
      )
    })
  }


  componentDidMount(){
    this.getMSG()
  }


  render(){
    const {msg} = this.state

    const message = msg ? <Topbar msg={msg} topbarMessage={this.topbarMessage.bind(this)}/> : ''

    return (
        <div className="App">
          {message}

          <section className='system'>
            <div className='main'> <System/> </div>
            <div className='side'> <LineCharts/> </div>
          </section>

          <section className='controls'>
            <div className='main'> <BarCharts/> </div>
            <div className='side'> <Control topbarMessage={this.topbarMessage.bind(this)}/> </div>
          </section>
      </div>
    )
  }
}

export default App;
