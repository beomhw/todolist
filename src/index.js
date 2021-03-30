import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'S-CoreDream-4Regular';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-4Regular.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }
    body {
        background: #e9ecef;
    }
    * {
        box-sizing: border-box;
        font-family: 'S-CoreDream-4Regular', sans-serif;
    }
    
`;

ReactDOM.render(
    <BrowserRouter>
        <GlobalStyle />
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);
