import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Table,Button} from 'react-bootstrap';
import CreateEmp from './createEmployee';
import UpdateEmp from './updateEmployee';
import axios from 'axios';

class displayEmployee extends Component {

    constructor() {
        super()
        this.state = {
            employees: [],
            createDialogDisplayed: false,
            editDialogDisplayed: false,
            emp: ''
        }
    }

    componentDidMount()
    {
        //Fetch the data from server
        fetch("http://localhost:3001/employees/getAll")
        .then(response => response.json())
        .then(data => {
            this.setState({
                employees: data
            })
        })
    }
   
    createClick = show => {
        this.setState({createDialogDisplayed: show});
        this.componentDidMount();
    }
    
    deleteRecord = (EmpId) => {
        axios.delete("http://localhost:3001/employees/deletebyID/" + EmpId)
        .then(res => {
            alert(res.data.message);
            this.componentDidMount();
        })
        .catch(err => { 
            console.log(err.message);
        })
    }

    editClick = (show, employee) => {
        this.setState({editDialogDisplayed: show, emp: employee});
        this.componentDidMount();
    }

    render() {     
        return (
            <div className="container">
                {this.state.createDialogDisplayed && <CreateEmp dialogShow = {this.state.createDialogDisplayed} onChange ={this.createClick} />}
                {this.state.editDialogDisplayed && <UpdateEmp dialogShow = {this.state.editDialogDisplayed} emp = {this.state.emp} onChange ={this.editClick} />}

               <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                <br></br>
                <h2>Employee Application</h2><br></br>
                <Button className="btn btn-primary float-right" onClick={() =>this.createClick(true)}><i className="fa fa-plus"></i> Create Record </Button><br></br>            
                <br></br>
                <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                    <th></th>
                    <th>Employee ID</th>
                    <th>Employee Name</th>
                    <th>Designation</th>
                    <th>Salary</th>
                    <th>Department</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.employees.map((employee, i) =>{
                        return [  
                            <tr key = {i}>
                                <td>
                                    <input type="checkbox" name="select" />
                                </td>
                                <td>{employee.Emp_id}</td>
                                <td>{employee.Emp_name}</td>
                                <td>{employee.Job_name}</td>
                                <td>{employee.Salary}</td>
                                <td>{employee.Dep_id}</td>
                                <td>
                                    <Button className="btn btn-primary"><i className="fa fa-edit" onClick={() =>this.editClick(true, employee)}></i> Edit</Button>{' '}
                                    <Button className="btn btn-danger" onClick={() => {if(window.confirm('Are you sure to delete this record?')){this.deleteRecord(employee.Emp_id)};}}> <i className="fa fa-trash"></i> Delete</Button> 
                                </td>
                            </tr>
                        ]
                    })}
                </tbody>
                </Table>
            </div>
        );
    }
}

export default displayEmployee;