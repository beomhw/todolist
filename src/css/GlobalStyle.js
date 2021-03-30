import React from 'react';
import {createGlobalStyle} from 'styled-components';
import {useTheme} from '../ThemeContext';

export const GlobalStyleCreate = createGlobalStyle`
    @font-face {
        font-family: 'S-CoreDream-4Regular';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-4Regular.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }
    body {
        background: ${p => p.theme.background};
        transition: 0.3s;
    }
    * {
        box-sizing: border-box;
        font-family: 'S-CoreDream-4Regular', sans-serif;
    }
`;

const GlobalStyle = () => {
    const theme = useTheme();

    return <GlobalStyleCreate theme={theme} />;
}

export default GlobalStyle;