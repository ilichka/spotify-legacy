import {createGlobalStyle} from "styled-components";
import 'react-toastify/dist/ReactToastify.css';
export const GlobalStyles = createGlobalStyle`
    *,
    *::before,
    *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body {
        min-height: 100vh;
        font-family: Montserrat, sans-serif;
        background: #252222;
      color: #FFFFFF;
    }

    body > iframe {
      display: none;
    }
`