import './App.css'
import { AppBar, Typography } from '@mui/material'
import Carlist from './components/Carlist'

function App() {

  return (
    <>
      <AppBar position="static">
        <Typography variant="h6">
          Autokauppa
        </Typography>
      </AppBar>
      <Carlist />
    </>
  )
}

export default App
