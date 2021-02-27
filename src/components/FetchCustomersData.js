import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import AddNewCustomer from './AddNewCustomer';
import  ModifyCustomer from './ModifyCustomer';
import Grid from '@material-ui/core/Grid';
import Addtraining from './AddNewTraining';
import Tooltip from '@material-ui/core/Tooltip';
import Snackbar from '@material-ui/core/Snackbar';

const FetchCustomersData = () => {

    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchCustomers();
    }, [])

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content))
            .catch(err => console.error(err))
    }

    const removeCustomer = (link) => {
        if (window.confirm('Are you sure you want to delete it?')) {
            fetch(link, { method: 'DELETE' })
                .then(res => fetchCustomers())
                .then(res => setMessage('Customer deleted'))
                .then(res => setOpen(true))
                .catch(err => console.error(err))
        }
    }

    const saveNewCustomer = (newCustomer) => {
        fetch('https://customerrest.herokuapp.com/api/customers',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newCustomer)
            }
        )
            .then(res => fetchCustomers())
            .catch(err => console.error(err))
    }

    const closeDialog = (event, reason) => {
        setOpen(false);
    }

    const modifyCustomer = (customer, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
            .then(res => fetchCustomers())
            .then(res => setMessage('Changes saved succesfully'))
            .then(res => setOpen(true))
            .catch(err => console.error(err))
    }

   
    const saveTraining = (newTraining) => {
        fetch('https://customerrest.herokuapp.com/api/trainings',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTraining)
            }
        )
            // .then(<Redirect to="/trainings" />)
            .catch(err => console.error(err))
    }


    const columns = [
        
       
        {
            accessor: 'links[0].href',
            filterable: false,
            sortable: false,
            Cell: ({ value }) => <Tooltip title="Delete Customer">
                <Fab
                    variant="round" color="secondary" size="small" onClick={() => removeCustomer(value)}>
                    <DeleteIcon />
                </Fab>
            </Tooltip>
        },
        {
            filterable: false,
            sortable: false,
            Cell: row => <ModifyCustomer modifyCustomerData={modifyCustomer} customer={row.original} />
        },
        {
            headerStyle: {
                background:'brown',
                fontWeight: 'bold',
                textAlign:'center',
                fontSize: '20px',
                color: 'orange',
                borderRadius: '1px',
                padding: '1px',
                border:'1px solid black',
                borderRight: '1px solid orange',
                borderLeft:'1px solid orange',
                borderTop:'1px solid orange',
                borderBottom:'1px solid orange'
                },
            Header: 'Firstname',
            accessor: 'firstname'
        },
        {    headerStyle: {
            background:'brown',
            fontWeight: 'bold',
            textAlign:'center',
            fontSize: '20px',
            color: 'orange',
            borderRadius: '1px',
            padding: '1px',
            border:'1px solid black',
            borderRight: '1px solid orange',
            borderLeft:'1px solid orange',
            borderTop:'1px solid orange',
            borderBottom:'1px solid orange'
            },
            
            Header: 'Lastname',
            accessor: 'lastname'
        },
        {
            headerStyle: {
                background:'brown',
                fontWeight: 'bold',
                textAlign:'center',
                fontSize: '20px',
                color: 'orange',
                borderRadius: '1px',
                padding: '1px',
                border:'1px solid black',
                borderRight: '1px solid orange',
                borderLeft:'1px solid orange',
                borderTop:'1px solid orange',
                borderBottom:'1px solid orange'
                },
            Header: 'Street Address',
            accessor: 'streetaddress'
        },
        {
            headerStyle: {
                background:'brown',
                fontWeight: 'bold',
                textAlign:'center',
                fontSize: '20px',
                color: 'orange',
                borderRadius: '1px',
                padding: '1px',
                border:'1px solid black',
                borderRight: '1px solid orange',
                borderLeft:'1px solid orange',
                borderTop:'1px solid orange',
                borderBottom:'1px solid orange'
                },
            Header: 'Post Code',
            accessor: 'postcode'
        },
        {
            headerStyle: {
                background:'brown',
                fontWeight: 'bold',
                textAlign:'center',
                fontSize: '20px',
                color: 'orange',
                borderRadius: '1px',
                padding: '1px',
                border:'1px solid black',
                borderRight: '1px solid orange',
                borderLeft:'1px solid orange',
                borderTop:'1px solid orange',
                borderBottom:'1px solid orange'
                },
            Header: 'City',
            accessor: 'city'
        },
        {
            headerStyle: {
                background:'brown',
                fontWeight: 'bold',
                textAlign:'center',
                fontSize: '20px',
                color: 'orange',
                borderRadius: '1px',
                padding: '1px',
                border:'1px solid black',
                borderRight: '1px solid orange',
                borderLeft:'1px solid orange',
                borderTop:'1px solid orange',
                borderBottom:'1px solid orange'
                },
            Header: 'Email',
            accessor: 'email'
        },
        {
            headerStyle: {
                background:'brown',
                fontWeight: 'bold',
                textAlign:'center',
                fontSize: '20px',
                color: 'orange',
                borderRadius: '1px',
                padding: '1px',
                border:'1px solid black',
                borderRight: '1px solid orange',
                borderLeft:'1px solid orange',
                borderTop:'1px solid orange',
                borderBottom:'1px solid orange'
                },
            Header: 'Phone',
            accessor: 'phone'
        },
        {
           
            filterable: false,
            sortable: false,
            Cell: row => <Addtraining saveTraining={saveTraining} customer={row.original} />
        },
    ]

    return (
        <div>
            <br></br>
            <Grid container item xs={3} spacing={1} justify="center" alignItems="center" >
                <Grid >
                    <AddNewCustomer  saveNewCustomer={saveNewCustomer} />
                </Grid>
            </Grid>
                 <ReactTable  columns={columns} data={customers} filterable={true} />
                  <Snackbar open={open} onClose={closeDialog} message={message} />
        </div>
    );
};

export default FetchCustomersData;