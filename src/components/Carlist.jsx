import { useState, useEffect } from 'react';
//npm install ag-grid-community ag-grid-react
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Button from "@mui/material/Button";
import { Snackbar } from '@mui/material';
import { useRef } from "react";


import EditCar from './EditCar';
import AddCar from './AddCar';
export default function Carlist() {

    // states
    const [cars, setCars] = useState([{ brand: '', model: '', color: '', fuel: '', year: '', price: '' }]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');
    const URL = 'https://carrestservice-carshop.rahtiapp.fi/cars';


    // columnsdef
    const columns = [
        { headerName: 'Brand', field: 'brand', sortable: true, filter: true },
        { headerName: 'Model', field: 'model', sortable: true, filter: true },
        { headerName: 'Color', field: 'color', sortable: true, filter: true },
        { headerName: 'Fuel', field: 'fuel', sortable: true, filter: true },
        { headerName: 'Year', field: 'year', sortable: true, filter: true },
        { headerName: 'Price', field: 'price', sortable: true, filter: true },
        { cellRenderer: params => <EditCar updateCar={updateCar} params={params} />, width: 120 },
        {
            cellRenderer: (params) =>
                <Button size="small" color="error" onClick={() => deleteCar(params)}>
                    Delete
                </Button>,
            width: 120
        }
    ];

    useEffect(() => getCars(), []);

    const getCars = () => {
        fetch(URL)
            .then(response => {
                console.log(response)
                return response.json()
            })
            .then(responseData => {
                console.log(responseData._embedded.cars);
                setCars(responseData._embedded.cars);
            })
            .catch(err => console.error(err));
    }

    //ei tarvita poistamiseen, koska restin kautta saamme uniquen id:n
    const gridRef = useRef();

    const deleteCar = (params) => {
        console.log("params.data._links.car.href = " + params.data._links.car.href);
        console.log("id = " + gridRef.current.getSelectedNodes()[0].id);
        if (window.confirm('Are you sure')) {
            fetch(params.data._links.car.href, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        setMsg('Car deleted successfully');
                        setOpen(true);
                        getCars();  // haetaan tietokannasta muuttunut tilanne, jossa mukana myös muiden käyttäjien muutokset
                        // staten päivitys ei toisi esille muiden käyttäjien muutoksia
                    } else
                        alert('Something went wrong in deletion: ' + response.status);
                })
                .catch(err => console.error(err)); // console.log/console.error/console.warning
        }
    }

    const addCar = (car) => {
        console.log("Carlist: add car to db by using rest service, method is POST")
        fetch(URL, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(car)
        })
            .then(response => {
                console.log(response)

                if (response.ok) {
                    setMsg('Car inserted successfully');
                    setOpen(true);
                    return response.json();
                } else {
                    throw new Error('Something went wrong when adding a new car');
                }
            })
            .then(data => {
                // Log the parsed JSON data
                console.log('addCar: parsed JSON data = ', data);
                // Call getCars() 
                getCars();
            })
            .catch(err => console.error(err))
    }

    const updateCar = (url, updatedCar) => {
        console.log("updatedCar " + updatedCar);
        fetch(url, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(updatedCar)
        })
            .then(response => {
                if (response.ok) {
                    setMsg('Car updated successfully');
                    setOpen(true);
                    getCars();
                } else {
                    console.log("updatedCar " + JSON.stringify(updatedCar));
                    alert('Something went wrong when updating a car' + response.statusText);
                }
            })
            .catch(err => console.error(err))
    }



    return (
        <>
            <AddCar addCar={addCar} />
            <div className="ag-theme-material" style={{ height: '800px', width: '100%', margin: 'auto' }}>
                <AgGridReact
                    columnDefs={columns}
                    rowData={cars}
                    animateRows={true}
                    rowSelection="single"
                    pagination={true}
                    paginationPageSize={10}
                    paginationPageSizeSelector={[10, 30, 50]} // Add 10 to the options
                    ref={gridRef}
                    onGridReady={params => gridRef.current = params.api}
                >
                </AgGridReact>
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={() => setOpen(false)}
                    message={msg}
                />
            </div>

        </>
    );
} 