import React from "react";
import { useContext, useState } from "react";

const themeContext = React.createContext();

export const useTheme = () => useContext(themeContext);

export const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return(
        <themeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </themeContext.Provider>
    );
};

export default themeContext;