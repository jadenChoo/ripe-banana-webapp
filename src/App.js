import './App.css';
import React, { useState } from 'react';
import Container from '@mui/material/Container';
import { Grid } from '@mui/material';

import UploadFile from './component/UploadFile';
import GetResult from './component/GetResult';

function App() {
  const [imageName, setImageName] = useState(null);
  const [uploadImageYn, setUploadImageYn] = useState(false);
  const [clean, setClean] = useState(false);

  function handelImageName(name){
    // alert(name);
    // const newName = { id: `todo-${nanoid()}`, name, completed: false };
    setImageName(name);
    setClean(false);
  }

  function handelUploadYn(upload){
    // alert(name);
    // const newName = { id: `todo-${nanoid()}`, name, completed: false };
    setUploadImageYn(upload);
  }

  function cleanup(){
    setImageName(null);
    setUploadImageYn(false);
    setClean(true);
  }

  function handelClean(){
    setClean(false);
  }
  
  return (
    <div className="ripeBanana stack-large">
      <Container width="75%" sx={{p:3, textAlign:"center"}}>
        <Grid item xs={12} md={4} lg={3} >
          <h1>Are These bananas ripe?</h1>
        </Grid>
        <Grid>
          <UploadFile handelImageName={handelImageName} handelUploadYn={handelUploadYn} 
                      clean={clean} handelClean={handelClean}/>
        </Grid>
        <Grid>
          <GetResult imageName={imageName} uploadImageYn={uploadImageYn} cleanup={cleanup}/>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
