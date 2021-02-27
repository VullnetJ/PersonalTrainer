import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import Create from '@material-ui/icons/Create';
import { Tooltip } from '@material-ui/core';

const ModifyCustomer = (props) => {

  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState(
    {}
  )
  const OpenDialog = () => {
    setCustomer({
      firstname: props.customer.firstname, lastname: props.customer.lastname, streetaddress: props.customer.streetaddress,
      postcode: props.customer.postcode, city: props.customer.city, email: props.customer.email, phone: props.customer.phone
    })
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const changeData = (event) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value })
  }

  const modifyCustomerData = () => {
    props.modifyCustomerData(customer, props.customer.links[0].href);
    closeDialog();
  }

  return (
    <div>
      <Tooltip title="Edit Customer">
        <Fab color="inherit" aria-label="edit" onClick={OpenDialog}>
          <Create />
        </Fab>
      </Tooltip>
      <Dialog open={open} onClose={closeDialog} aria-labelledby="confirmation-dialog-title">
        <DialogTitle id="max-width-dialog-title">Edit Customer info</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Update the fields for the current customer
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="firstname"
            value={customer.firstname}
            onChange={e => changeData(e)}
            label="Firstname"
            fullWidth
          />
          <TextField
            margin="dense"
            name="lastname"
            value={customer.lastname}
            onChange={e => changeData(e)}
            label="Lastname"
            fullWidth
          />
          <TextField
            margin="dense"
            name="streetaddress"
            value={customer.streetaddress}
            onChange={e => changeData(e)}
            label="Street Address"
            fullWidth
          />
          <TextField
            margin="dense"
            name="postcode"
            value={customer.postcode}
            onChange={e => changeData(e)}
            label="Postcode"
            fullWidth
          />
          <TextField
            margin="dense"
            name="city"
            value={customer.city}
            onChange={e => changeData(e)}
            label="City"
            fullWidth
          />
          <TextField
            margin="dense"
            name="email"
            value={customer.email}
            onChange={e => changeData(e)}
            label="Email"
            fullWidth
          />
          <TextField
            margin="dense"
            name="phone"
            value={customer.phone}
            onChange={e => changeData(e)}
            label="Phone"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} variant="contained" component="span" color="primary">
            Cancel
          </Button>
          <Button onClick={modifyCustomerData} variant="contained" component="span" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModifyCustomer;