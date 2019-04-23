import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class DeleteAccount extends Component {
    constructor(){
        super();
        this.state = {
            users: ''
        }
    }
    componentDidMount() {
        axios.delete(`https://financial-report.herokuapp.com/api/accounts/${this.props.match.params.accountName}`, {
            headers: {
            'x-auth-token': localStorage.getItem('x-auth-token')
            }
        })
        .then(res=> {
            return document.location="/";
        })
        .catch(err => console.log(err));
    }
    render() {
        if(!(localStorage.getItem('x-auth-token'))) {
            return <Redirect to="/" />
        }
        return (
        <div>
        </div>
        );
    }
}

export default DeleteAccount;
