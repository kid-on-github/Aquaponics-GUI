import React from 'react'
import Chart from "react-google-charts"

class LineCharts extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
    }
    
    componentDidMount(){
        fetch("https://f1fda850-4011-4c6a-9972-4363465a1059.mock.pstmn.io/lineCharts")
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
        if (Object.keys(this.state).length > 0){
            const charts = Object.keys(this.state).map(
                title => {
                    const {labels, data} = this.state[title]
                    return <LineChart title={title} labels={labels} data={data} key={title}/>
                }
            )

            return <div> {charts} </div>
        }
        
        return <p>Loading Charts...</p>
    }
}


function LineChart(props){
    const {title, labels, data} = props
    
    let chart = ''

    if (data && labels.length > 1){
        chart = <Chart
                chartType="LineChart"
                data={data}
                options={{
                    hAxis: {title: labels[0]},
                    vAxis: {title: labels[1]},
                    legend: { position: "none" }
                }}
            />
    }

    return (
        <div className='lineChart'>
            <p>{title}</p>
            {chart}       
        </div>
    )
}



export default LineCharts