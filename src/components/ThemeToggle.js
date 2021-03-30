import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {useTheme, useThemeDispatch} from '../ThemeContext';

const Button = styled.div`
    width: 60px;
    height: 30px;
    border-radius: 30px;
    border: 2px solid gray;
    margin: 0 auto;
    background-color: ${p => p.theme.container};
    cursor: pointer;
    transition-duration: 0.3s;
    border-color: #38d9a9;
`;

const Div = styled.div`
    margin-top: 96px;
    width: 100%;
`;

const SwitchButton = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 15px;
    border: 1px solid gray;
    position: relative;
    top: -2px;
    left: ${props => props.move}px;
    background-color: #38d9a9;
    border-color: #38d9a9;
    transition-duration: 0.3s;
    &:focus {
        outline: none;
    }
`;

const ThemeToggle = () => {
    const [x, setX] = useState(-1);
    const [on, setOn] = useState(true);
    const theme = useTheme();
    const dispatch = useThemeDispatch();

    useEffect(() => {
        on ? dispatch({
            type: 'LIGHT',
        }) :
        dispatch({
            type: 'DARK'
        })
    },[]);

    console.log(theme);

    const Change = () => {
        setOn(!on);
        on ? setX(-1) : setX(29);
        on ? dispatch({
            type: 'LIGHT',
        }) :
        dispatch({
            type: 'DARK'
        })
    }

    return (
        <Div>
            <Button onClick={Change} theme={theme}>
                <SwitchButton move={x}>
                </SwitchButton>
            </Button>
        </Div>
    );
}

export default ThemeToggle;