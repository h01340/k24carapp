/* eslint-disable react/prop-types */
import React from 'react';

//to get these you have to install
//npm install @mui/material @emotion/react @emotion/styled
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

//Inserting car by using modal dialog
export default function AddCar(props) {

  //we need state to save new car information
  const [car, setCar] = React.useState({
    brand: '',
    model: '',
    color: '',
    fuel: '',
    year: '',
    price: ''
  });

  //checking if modal dialog is open (true) or not (false)
  const [open, setOpen] = React.useState(false);

  //This is called when user click add button
  const handleClickOpen = () => {
    console.log("handleClickOpen -> set true");
    setOpen(true);
  };

  /**
   * In many UI frameworks, when you have a modal or a dialog, 
   * clicking on the backdrop (the area outside the modal) might trigger a close event. 
   * This condition is excluding that specific scenario, 
   * suggesting that if the reason for closing is a backdrop click, 
   * the UI element should not be closed.
   */
  const handleClose = (event, reason) => {
    console.log("handleClose -> setOpenFalse or not? " + reason);
    if (reason !== 'backdropClick')
      setOpen(false);
  };

  const handleSave = () => {
    console.log("AddCar-component: let's go to save the car")
    props.addCar(car);
    setOpen(false);
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        New Car
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Car</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Branch"
            value={car.brand}
            onChange={(e) => setCar({ ...car, brand: e.target.value })}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Model"
            value={car.model}
            onChange={(e) => setCar({ ...car, model: e.target.value })}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Color"
            value={car.color}
            onChange={(e) => setCar({ ...car, color: e.target.value })}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Fuel"
            value={car.fuel}
            onChange={(e) => setCar({ ...car, fuel: e.target.value })}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Year"
            value={car.year}
            onChange={(e) => setCar({ ...car, year: e.target.value })}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            label="Price"
            value={car.price}
            onChange={(e) => setCar({ ...car, price: e.target.value })}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}