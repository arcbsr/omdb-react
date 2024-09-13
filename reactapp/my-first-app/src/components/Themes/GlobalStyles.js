import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.theme.backgroundColor};
    color: ${props => props.theme.textColor};
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  button {
    background-color: ${props => props.theme.primaryColor};
    color: ${props => props.theme.textColor};
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button.secondary {
    background-color: ${props => props.theme.secondaryColor};
  }
`;

export default GlobalStyle;
