
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import React, {useState, useEffect} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';


const Trainings = () => {

    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchTrainingsData();
    }, [])

    const fetchTrainingsData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    }

    const removeTraining = (link) => {
        if(window.confirm('Are you sure you want to delete it?')) {
            fetch(link, {method: 'DELETE'})
            .then(res => fetchTrainingsData())
            .then(setMessage('Training deleted'))
            .then(setOpen(true))
            .catch(err => console.error(err))
        }
    }

    const changeClose = (event, reason) => {
        setOpen(false);
      }

    const deleteUrl = "https://customerrest.herokuapp.com/api/trainings";

    const columns= [
        {
            accessor: '',
            filterable: false,
            sortable: false,
            Cell: row => 
            <Tooltip  title="Delete Training">
            <Fab color="secondary" variant="round" size="small" 
            onClick={() => removeTraining(`${deleteUrl}/${row.original.id}`)}>
            <DeleteIcon/>
            </Fab>
            </Tooltip>
        },
        {
            Header: 'Activity',
            accessor: 'activity'
        },
        {
            id: "formatDate",
            Header: 'Date',
            accessor: d => {
                return moment(d.date).format("DD-MM-YYYY HH:mm")
            }
            
        },
        {
            Header: 'Duration (min)',
            accessor: 'duration'
        },
        
        {
            id: "getFNameAndLName",
            Header: 'Customer',
            accessor: name => {
                return name.customer.firstname + " " + name.customer.lastname
            }
        },
        
    ]

    return (
        <div>
            <Grid container>
            </Grid>
            <ReactTable columns={columns} data={trainings} filterable={true}/>
            <Snackbar open={open}  changeClose={changeClose} message={message}/>
        </div>
    );
};

export default Trainings;