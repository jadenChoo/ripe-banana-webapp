import './App.css';
import React, { useState } from 'react';
import Container from '@mui/material/Container';
import { Grid } from '@mui/material';

import UploadFile from './component/UploadFile';
import GetResult from './component/GetResult';

function App() {
  const [imageName, setImageName] = useState(null);

  function handelImageName(name){
    // alert(name);
    // const newName = { id: `todo-${nanoid()}`, name, completed: false };
    setImageName(name);
  }
  
  return (
    <div className="ripeBanana stack-large">
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }} sx={{p:3, textAlign:"center"}}>
        <Grid item xs={12} md={4} lg={3} >
          <h1>Are These bananas ripe?</h1>
        </Grid>
        <Grid>
          <UploadFile handelImageName={handelImageName}/>
        </Grid>
        <Grid>
          
        </Grid>
      </Container>
    </div>
  );
}

export default App;
