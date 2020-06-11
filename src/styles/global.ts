import { createGlobalStyle } from 'styled-components';

import background from '../assets/github_background.svg';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

  * {
    padding: 0;
    margin: 0;
    outline: none;
    box-sizing: border-box;
  }

  body {
    background: #F0F0F5 url(${background}) no-repeat 70% top;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 16px Roboto, 'sans-serif';
  }

  #root {
    max-width: 960px;
    margin: 0 auto;
    padding: 40px 20px;
  }

  button {
    cursor: pointer;
  }
`;
