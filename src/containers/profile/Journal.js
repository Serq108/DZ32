import React from 'react'
import Service from '../../service/service';
//import _ from 'lodash';
import './Profile.css';

const fheader = ['Студент', 'Название курса','Тема Урока', 'Номер Урока', 'Выполнен'];
//const bheader = ['student', 'course_title','lesson', 'order', 'done'];
const tableHeaders = (dataColumns) => {
    return(<thead>
        <tr>
            {dataColumns.map((column) => {
                return <th>{column}</th>;
            })}
        </tr>
        </thead>)
    };

const tableBody = (dataRows, bheader) => {
    return(dataRows.map((row) => {
        return (
            <tr>
                <td>{row.student}</td>
                <td>{row.course_title}</td>
                <td>{row.lesson}</td>
                <td>{row.order}</td>
                <td>{row.done === '0'?'Нет':'Да'}</td>
            </tr>
        );
    })
    )    
};

class Journal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        this.getList = this.getList.bind(this)
        console.log("constructor");
    }

    componentDidMount(){
        console.log("componentDidMount()");
        this.getList();
    }
    componentWillUnmount(){
        console.log("componentWillUnmount()");
    }
    shouldComponentUpdate(){
        console.log("shouldComponentUpdate()");
        return true;
    }

    componentDidUpdate(){
        console.log("componentDidUpdate()");
    }
    async getList(){
        let getdat = await Service.getReq('gradelist/')
        this.setState({ data: getdat});
    }
    render() {
        console.log("render()");
        return (
            <div className="table">
                <h3>Журнал успеваемости</h3>
                <table>
                    {tableHeaders(fheader)}
                    {tableBody(this.state.data)}
                </table>
                
            </div>
        )
    }
}
export default Journal
