import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
  body {
    font-size: ${(props) => props.fontSize}px;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: sans-serif;
  }

  p, button {
    font-family: 'Bebas Neue', sans-serif;
  }

  a {
    text-decoration: none;
  }
`;