import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import Accessibility from '@material-ui/icons/Accessibility';
import DiscreteSlider from './TimeSlider';

const AddNewTraining = (props) => {

    const [open, setOpen] = useState(false);
    const [newTraining, setNewTraining] = useState({date:'', activity:'', duration:'', customer:''});

    const OpenDialog = () => {
      setNewTraining({...newTraining, customer: props.customer.links[0].href})
        setOpen(true);
      };
    
      const closeDialog = () => {
        setOpen(false);
      };

      const changeData = (event) => {
        setNewTraining({...newTraining, [event.target.name]: event.target.value})
      }

      const addTrainingToTheList = () => {
          props.saveTraining({...newTraining, date: `${newTraining.date}:00.000+02:00`})
          closeDialog();
      }

    return (
        <div>
            <Tooltip title="Add Training">
           <Fab variant="round" color="secondary" size="large" onClick={OpenDialog}>
           <Accessibility/>
           </Fab>
           </Tooltip>
      <Dialog open={open} onClose={closeDialog} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add new training in Calendar</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please add date, time, and activity  of the new Training. 
          </DialogContentText>
          <TextField
            autoFocus
            id="datetime-local"
            margin="dense"
            name="date"
            type="datetime-local"
            onChange={e => changeData(e)}
            value={newTraining.date}
            label="Date"
            fullWidth
          />
          <DiscreteSlider newTraining={newTraining} setNewTraining={setNewTraining}
            margin='dense'
            value={newTraining.duration}
            fullWidth
          />
          <TextField
            margin="dense"
            name="activity"
            value={newTraining.activity}
            onChange={e => changeData(e)}
            label="Activity"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} variant="contained" component="span" color="primary">
            Cancel
          </Button>
          <Button onClick={addTrainingToTheList} variant="contained" component="span" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog> 
        </div>
    );
};

export default AddNewTraining;