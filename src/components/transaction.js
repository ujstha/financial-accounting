import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

class Transaction extends Component {
    constructor(){
        super();
        this.state = {
            users: '',
            transactions: []
        }
    }
    componentDidMount() {
        axios.get(`https://financial-report.herokuapp.com/api/transactions/${this.props.match.params.accountName}`, {
            headers: {
            'x-auth-token': localStorage.getItem('x-auth-token')
            }
        })
        .then(res=> {
            console.log('hell yeah yaeh',res.data);
            let transactions = res.data;
            this.setState({
                transactions: transactions
            })
        })
        .catch(err => console.log(err));
    }
    render() {
        if(!(localStorage.getItem('x-auth-token'))) {
            return <Redirect to="/" />
        }
        console.log(this.props.match.params.accountName);
        let acc = this.state.transactions.map((transaction, i) => (
            <div className="col-md-4 mt-3" key={i}>
                <p>Debit Account : {transaction.debitAccount}</p>
                <p>Credit Account : {transaction.creditAccount}</p>
                <p>Description : {transaction.descreption}</p>
                <p>Amount : {transaction.amount}</p>
                <p>Date : {moment(transaction.date).format('MMM DD, YYYY')}</p>
            </div>
        ));
        return (
        <div>
            Account Name : {this.props.match.params.accountName}
            {acc}
        </div>
        );
    }
}

export default Transaction;
