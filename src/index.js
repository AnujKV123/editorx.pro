import React from "react"
import ReactDOM from 'react-dom/client';
import App from "./App"
import "./styles.css"
import reportWebVitals from './reportWebVitals';
// import { ThemeProvider } from "./components/ui/theme-provider";
import { ThemeProvider } from "./context/ThemeProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme"> */}
    <ThemeProvider defaultTheme="system" storageKey="collabedit-theme">
      <App />
    </ThemeProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();