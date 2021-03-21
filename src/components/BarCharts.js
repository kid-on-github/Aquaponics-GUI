import React from 'react'
import Chart from "react-google-charts"

class BarCharts extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
    }

    componentDidMount(){
        fetch("https://f1fda850-4011-4c6a-9972-4363465a1059.mock.pstmn.io/barCharts")
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
                title => (
                    <BarChart title={title} data={this.state[title].data} key={title}/>
                )
            )

            return <div>{charts}</div>
        }
        return <p>Loading Data...</p>
    }
}



function BarChart(props){
    const {title, data} = props

    return (
        <div className='barChart'>
            <p>{title}</p>
            <Chart
                chartType="ColumnChart"
                data={data}
                options={{ legend: { position: "none" } }}
            />
        </div>
    )
}


export default BarCharts