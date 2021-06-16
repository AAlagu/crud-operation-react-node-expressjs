import React, {Component} from 'react';
import axios from 'axios';
import {Form,Button} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

class updateEmployee extends Component {

    constructor(props) {
        super(props)
        console.log(props.emp);
        this.state = {
            show: true,
            empId: props.emp.Emp_id,
            job: props.emp.Job_name,
            salary: props.emp.Salary,
            dept: props.emp.Dep_id
        }
    }

    handleClose = () => {
        this.setState({show: false});
        this.props.onChange(false);
    } 

    handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        })
    }

    updateEmp = () => {
        //Update the data to server
        const data = { job:this.state.job, salary:this.state.salary , dept:this.state.dept }
        axios.post("http://localhost:3001/employees/updatebyID/" + this.state.empId, {item: data})
        .then(res =>{
            alert(res.data.message);
        })
        .catch(err => { 
            console.log(err.message);
        })
    }

    render() { 
        return (
            <div>
            <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Employee</Modal.Title>
                    </Modal.Header>
                   <Modal.Body>
                        <Form.Group controlId="Designation">
                            <Form.Label>Designation</Form.Label>
                            <Form.Control value= {this.state.job} name="job" onChange={this.handleChange}/>
                        </Form.Group>
                        <Form.Group controlId="salary">
                            <Form.Label>Salary</Form.Label>
                            <Form.Control value= {this.state.salary} name="salary" onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group controlId="Dept">
                            <Form.Label>Department</Form.Label>
                            <Form.Control value= {this.state.dept} name="dept" onChange={this.handleChange}/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>Close</Button>
                        <Button variant="primary" onClick={this.updateEmp}>Save Changes</Button>
                    </Modal.Footer>
                </Modal>
            </div> 
        );
    }
}

export default updateEmployee;