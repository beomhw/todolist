import React, {useState, useEffect} from 'react';
import styled, {css} from 'styled-components';
import Login from '../components/Login';
import Register from '../components/Register';
import {useTheme} from '../ThemeContext';

const Container = styled.div`
    width: 500px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${p=>p.theme.container};
    border-radius: 20px;

    // 페이지 중앙에 나타나도록 설정
    margin: 0 auto;
    margin-top: 96px;
    margin-bottom: 32px;
    flex-direction: column;
`;

const ContainerText = styled.p`
    font-size: 1.2em;
    color: ${p=>p.theme.text};
`;

const Header = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex: 2;
`;

const Content = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex: 1;
    width: 100%;
`;

const TextInput = styled.p`
    font-size: 16px;
    user-select: none;
    cursor: pointer;
    margin: 10px;
    color: ${p=>p.theme.text};
    &:hover {
        color: #20c997;
    }
    ${p => p.menu && p.theme.mode === 'dark' && css`color: #20c997 ;`};
    ${p => p.menu && p.theme.mode === 'light' && css`color: #20c997 ;`};
`;

const LoginContainer = () => {
    const theme = useTheme();
    const [menu, onMenu] = useState({
        login: false,
        register: false,
    });
    const onLogin = () => onMenu({login: true, register: false});
    const onRegister = () => onMenu({login: false, register: true});
    const onClose = () => onMenu({login: false, register: false});
    
    return (
        <>
        <Container theme={theme}>
            <Header>
                <ContainerText theme={theme}>할일 체크 리스트</ContainerText>
            </Header>
            <Content>
                <TextInput theme={theme} menu={menu.login} onClick={onLogin}>로그인</TextInput>
                <TextInput theme={theme} menu={menu.register} onClick={onRegister}>회원가입</TextInput>
            </Content>
        </Container>
        {menu.login && 
            <Login onClose={onClose}/>
        }
        {menu.register &&
            <Register onClose={onClose}/>
        }
        </>
    );
}

export default LoginContainer;