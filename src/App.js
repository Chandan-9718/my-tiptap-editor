import React from 'react';
import Editor from './Editor';
import { CssBaseline, Container } from '@mui/material';

function App() {
    return (
        <div className="App">
            <CssBaseline />
            <Container>
                <Editor />
            </Container>
        </div>
    );
}

export default App;