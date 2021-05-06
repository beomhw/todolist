// Dark 모드 Light 모드 
import React, {createContext, useReducer, useContext} from 'react';
import * as THEME from './Util';


const Theme = {
    dark: {
        mode: 'dark',
        text: THEME._TEXT_DA,
        container: THEME._CONTAINER_DA,
        background: THEME._BACKGROUND_DA,
        input: THEME._INPUT_DA
    },
    light: {
        mode: 'light',
        text: THEME._TEXT_LI,
        container: THEME._CONTAINER_LI,
        background: THEME._BACKGROUND_LI,
        input: THEME._INPUT_LI
    }
}

const initialThemes = {};

const themeReducer = (state, action) => {
    switch(action.type) {
        case 'LIGHT':
            return Theme.light;
        case 'DARK':
            return Theme.dark;
        default:
            throw new Error(`Unknown action type : ${action.type}`);
    }
}

const ThemeContext = createContext();
const ThemeDispatchContext = createContext();

export const ThemeProvider = ({children}) => {
    const [state, dispatch] = useReducer(themeReducer, initialThemes);

    return (
        <ThemeContext.Provider value={state}>
            <ThemeDispatchContext.Provider value={dispatch}>
                {children}
            </ThemeDispatchContext.Provider>
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if(!context) {
        return new Error('can not find ThemeContext');
    }
    return context;
}

export function useThemeDispatch() {
    const context = useContext(ThemeDispatchContext);
    if(!context) {
        return new Error('can not find ThemeDispatchContext');
    }
    return context;
}