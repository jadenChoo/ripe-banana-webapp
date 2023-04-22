import './App.css';
import React from 'react';
import Container from '@mui/material/Container';

import UploadFile from './component/UploadFile'
import { Grid } from '@mui/material';

function App() {
  return (
    <div className="ripeBanana stack-large">
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid item xs={12} md={4} lg={3}>
          <h1>Are These bananas ripe?</h1>
        </Grid>
        <Grid>
          <UploadFile />
        </Grid>
      </Container>
    </div>
  );
}

export default App;
