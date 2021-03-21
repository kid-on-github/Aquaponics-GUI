import React from 'react'

class Control extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            "start":"",
            "stop":"",
            "duration":"",
            "interval":"",
            "lightOn":true,
            "pumpOn":true
        }
        this.manualRunControl = this.manualRunControl.bind(this)
    }
    
    validate(value, placeholder){
        let val = false

        if (value.length !== placeholder.length){
            this.props.topbarMessage(['warning', `Invalid time format, the format should be: ${placeholder}`, 6000])
        }
        else {
            val = (placeholder.length === 5) 
                ? value.match(/(\d){2}:(\d){2}/g)[0]
                : value.match(/(\d){2}:(\d){2}\s(AM|am|PM|pm)/g)[0]
            }
        
        if (val){
            const [hh, mm] = val.substr(0,5).split(':')
            if (hh > 12 || mm > 59){
                val = false
                this.props.topbarMessage(['warning', 'Invalid Time!', 6000])
            }
        }
        return val
    }

    inputHandler(e){
        const {key} = e
        let {id, value, placeholder} = e.target

        if (key === 'Enter'){
            value = this.validate(value, placeholder)
            value && this.submitUpdate(id,value)
        }
    }

    submitUpdate(id,value){
        // update runtime values and manually start and stop lights and pump
        fetch(`https://f1fda850-4011-4c6a-9972-4363465a1059.mock.pstmn.io/controls?${id}=${value}`)
        .then(r => r.json())
        .then(r => this.props.topbarMessage(r))
    }
    
    manualRunControl(e){
        const {id, value} = e.target
        // update state with api call
        this.submitUpdate(id,value)
        
        // update state on page
        let newState = {}
        newState[id] = !this.state[id]
        this.setState(newState)
    }

    componentDidMount(){
        // get current runtime values
        fetch(`https://f1fda850-4011-4c6a-9972-4363465a1059.mock.pstmn.io/currentControls`)
        .then(r => r.json())
        .then(r => this.setState({...r}))
        .then(
            setTimeout(
                () => this.componentDidMount(),
                10000
            )
        )
    }

    render(){
        const {start,stop,duration,interval,lightOn,pumpOn} = this.state

        const lightButton = lightOn ? 'Stop' : 'Start'
        const pumpButton = pumpOn ? 'Stop' : 'Start'

        return(
            <div className='control'>
                <div>
                    <p>Grow Light Control</p>
                    <label htmlFor='startTime'>Start Time</label>
                    <input type='text'id='startTime' placeholder='HH:MM AM' onKeyDown={e => this.inputHandler(e)} defaultValue={start}/>
                    
                    <label htmlFor='stopTime'>Stop Time</label>
                    <input type='text'id='stopTime' placeholder='HH:MM PM' onKeyDown={e => this.inputHandler(e)} defaultValue={stop}/>

                    <button id="lightOn" onClick={e => this.manualRunControl(e)} value={lightButton}>Manual {lightButton}</button>
                </div>

                <div>
                    <p>Water Pump Control</p>
                    <label htmlFor='onTime'>Running Duration</label>
                    <input type='text'id='onTime' placeholder='HH:MM' onKeyDown={e => this.inputHandler(e)} defaultValue={duration}/>

                    <label htmlFor='interval'>Interval</label>

                    <input type='text'id='interval' placeholder='HH:MM' onKeyDown={e => this.inputHandler(e)} defaultValue={interval}/>
                    
                    <button id="pumpOn" value={pumpButton} onClick={e => this.manualRunControl(e)}>Manual {pumpButton}</button>
                </div>

            </div>
        )
    }
}

export default Control 