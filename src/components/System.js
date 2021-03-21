import React from 'react'

class System extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
    }

    componentDidMount(){
        fetch("https://f1fda850-4011-4c6a-9972-4363465a1059.mock.pstmn.io/system")
        .then(r => r.json())
        .then(r => this.setState({
            table1Data:r['table1'],
            table2Data:r['table2'],
            waterLevel:r['Water Level']
        }))
        .then(
            setTimeout(
                () => this.componentDidMount(),
                10000
            )
        )
    }

    render(){
        const {table1Data, table2Data, waterLevel} = this.state
        
        if (table1Data){
            return (
                <div>
                    <BuildTable data={table1Data}/>
                    <div className='cycle'>
                        <BuildTable data={table2Data}/>
                    </div>
                    <Tank waterLevel={waterLevel}/>
                </div>
            )
        }

        return (<p>Loading Data...</p>)
    }
}

function Tank(props){
    const top = 74 - props.waterLevel * (.39)
    return <div className='tank' style={{'backgroundImage': `linear-gradient(white ${top}%, #84D2F6 ${top}%, #386FA4 74%)`}}></div>
}

function BuildTable(props){
    const {data} = props
    const rows = Object.keys(data).map(
        label => (
            <Row key={label}>
                <td>{label}:</td>
                <td>{data[label]}</td>
            </Row>
        )
    )
        
    return <Table>{rows}</Table>
}

const Table = props => (
    <table>
        <tbody>
            {props.children}
        </tbody>
    </table>
)

const Row = props => <tr>{props.children}</tr>

export default System