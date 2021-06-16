import React, {Component} from 'react';
import axios from 'axios';
import {Form,Button} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
  
class createEmployee extends Component {

    constructor(props) {
        super(props)
        this.state = {
            show: true,
            empId: '',
            empName: '',
            job: '',
            salary: '',
            dept: '',
            errors: {
                id: '',
                name: '',
                sal: '',
            },
            status: ''
        }
        this.saveIntoPostgreSQL = this.saveIntoPostgreSQL.bind(this);
    }

    validateForm = (errors) => {
        errors.name = this.nameValidation(this.state.empName);
        this.setState(errors);
        let valid = true;
        Object.values(errors).forEach(
          (val) => val.length > 0 && (valid = false)
        );
        return valid;
    }
      
    handleClose = () =>{
        this.setState({show: false});
        this.props.onChange(false);
    } 

  /*  handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        })
      }
      */
    nameValidation = (name) => {
        if(name === '')
            return 'Please provide Employee Name!';

        if(/[^a-zA-Z -]/.test(name))
            return 'Invalid characters';
        
        return '';
    }
    
    idValidation = (id) => {
        if(id === '')
            return 'Please provide Employee ID!';

        if(!/^[0-9\b]+$/.test(id))
            return 'It is not valid EmpID!';
        
        return '';
    }

    handleChange = (event) => {
        this.setState({status: ''});
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
        switch (name) {
            case 'empId': 
                errors.id = this.idValidation(value);
            break;
            case 'empName': 
                errors.name = this.nameValidation(value);
            break;
            case 'salary': 
                errors.sal = /^[0-9\b]+$/.test(value) 
                                ? ''
                                : 'It is not valid number!';
            break;
            default:
            break;
        }
    
        this.setState({errors, [name]: value});
    }
   
    saveIntoPostgreSQL = async function(){
        let errors = this.state.errors;
        if(this.validateForm(errors)) {
            //Send the data to server
            const data = { empId:this.state.empId, empName:this.state.empName , job:this.state.job, salary:this.state.salary , dept:this.state.dept }
            axios.post("http://localhost:3001/employees/insert", {item: data})
            .then(res =>{
                this.setState({status: res.data.message});
                alert(res.data);
                //this.setState({empId:'', empName:'', job:'', salary:'', dept:''});
            })
            .catch(err => { 
                errors.id = err.response.data;
                console.log(err.response.data);
                this.setState(errors);
            })
        }
      }
     
    render() { 
        let errors = this.state.errors;
        return (
            <div>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>New Employee</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="Id">
                            <Form.Label>Employee ID</Form.Label>
                            <Form.Control placeholder="10533" name="empId" onChange={this.handleChange} />
                            {errors.id.length > 0 && <span className='error' style={{color: "red"}}>{errors.id}</span>}
                        </Form.Group>
                        <Form.Group controlId="Name">
                            <Form.Label>Employee Name</Form.Label>
                            <Form.Control placeholder="Nive" name="empName" onChange={this.handleChange}/>
                            {errors.name.length > 0 && <span className='error'style={{color: "red"}}>{errors.name}</span>}
                        </Form.Group>
                        <Form.Group controlId="Designation">
                            <Form.Label>Designation</Form.Label>
                            <Form.Control placeholder="Software Developer" name="job" onChange={this.handleChange}/>
                        </Form.Group>
                        <Form.Group controlId="salary">
                            <Form.Label>Salary</Form.Label>
                            <Form.Control placeholder="54000" name="salary" onChange={this.handleChange} />
                            {errors.sal.length > 0 && <span className='error' style={{color: "red"}}>{errors.sal}</span>}
                        </Form.Group>
                        <Form.Group controlId="Dept">
                            <Form.Label>Department</Form.Label>
                            <Form.Control placeholder="101" name="dept" onChange={this.handleChange}/>
                        </Form.Group>
                        <span className='submit' style={{color: "green"}}>{this.state.status}</span>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>Close</Button>
                        <Button variant="primary" onClick={this.saveIntoPostgreSQL}>Save Changes</Button>
                    </Modal.Footer>
                </Modal>
            </div> 
        );
    }
}

export default createEmployee;