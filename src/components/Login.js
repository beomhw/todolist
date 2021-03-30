import React, {useState} from 'react';
import styled, {css} from 'styled-components';
import {MdClose} from 'react-icons/md';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {useTheme} from '../ThemeContext';

const flexAlign = css`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const OpenInputContainer = styled.div`
    ${flexAlign};
    height: 300px;
    width: 500px;
    background-color: ${p=>p.theme.container};
    margin: 0 auto;
    border-radius: 20px;
    flex-direction: column;
`;

const CloseContainer = styled.div`
    height: 20px;
    width: 100%;
`;

const Content = styled.div`
    flex: 9;
    ${flexAlign};
`;

const CloseButton = styled.button`
    cursor: pointer;
    margin: 10px;
    float: right;
    z-index: 5;
    width: auto;
    height: auto;
    padding: 0;
    color: gray;
    background-color: rgba(0,0,0,0);
    &:focus{
        outline: none;
    }
    &:hover{
        color: black;
    }
    transition-duration: 0.5s;
    border: 0;
    font-size: 20px;
`;

const LabelContainer = styled.div`
    ${flexAlign};
    flex: 4;
    flex-direction: column;
    height: 200px;
`;

const InputContainer = styled.form`
    ${flexAlign};
    flex: 4;
    flex-direction: column;
`;

const Pstyle = styled.p`
    font-size: 20px;
    margin: 10px;
    float: right;
    color: ${p=>p.theme.text};
`;

const Input = styled.input`
    width: 200px;
    height: 30px;
    margin: 10px;
    &:focus{
        outline: none;
    }
    border: 1px solid gray;
    color: ${p=>p.theme.text};
    background-color: ${p=>p.theme.background};
`;

const LoginButton = styled.button`
    width: 100px;
    height: 30px;
    background-color: #20c997;
    color: white;
    border: 0;
    border-radius: 10px;
    &:hover {
        background-color: #48f0be;
    }
    cursor: pointer;
    transition-duration: 0.3s;
    margin-bottom: 20px;
    &:focus {
        outline: none;
    }
`;


async function loginJWT (inputs) {
    
    let result = {};

    await axios.post('http://localhost/api/login', {
        userId: inputs.userId,
        password: inputs.password
    }).then(res => {
        console.log(res);
        result = res;
    }).catch(e => {
        console.log(e);
    })

    return result;
}

const Login = ({onClose}) => {
    const theme = useTheme();
    const [inputs, setInputs] = useState({
        userId: '',
        password: '',
    });
    const {userId, password} = inputs;
    const [loginText, setLoginText] = useState('로그인');

    const onChange = (e) => {
        let {name, value} = e.target;

        setInputs({
            ...inputs,
            [name]: value
        })

        console.log(inputs);
    };

    const onSubmit = (e) => {
        const {sessionStorage} = window;
        setLoginText('로그인 중...');
        loginJWT(inputs).then(result => {

            console.log(result.data);
            sessionStorage.setItem('access_token', result.data.access_token);

            let jwt = jwt_decode(sessionStorage.getItem('access_token'));
            sessionStorage.setItem('id', jwt.id);
            sessionStorage.setItem('nickname', jwt.nickname);
            
            console.log(jwt);
            console.log(sessionStorage);
            alert('로그인 성공');
            window.location.href = '/todo';
            setLoginText('로그인');
        }).catch((e) => {
            if(sessionStorage.length !== 0) {
                return 0;
            }
            console.log(e.response);
            if(e.response.data.error === 'Unauthorized') {
                alert('아이디 또는 비밀번호가 틀렸습니다.');
                setLoginText('로그인');
                return 0;
            }
        })
    };

    return (
        <OpenInputContainer theme={theme}>
            <CloseContainer>
                <CloseButton onClick={onClose}>
                    <MdClose />
                </CloseButton>
            </CloseContainer>
            <Content>
                <LabelContainer>
                    <Pstyle theme={theme}>ID</Pstyle>
                    <Pstyle theme={theme}>비밀번호</Pstyle>
                </LabelContainer>
                <InputContainer method="post">
                    <Input theme={theme} placeholder="아이디를 주세요" onChange={onChange} value={userId} name="userId" />
                    <Input theme={theme} placeholder="비밀번호를 몰래 주세요" type="password" onChange={onChange} value={password} name="password" />
                </InputContainer>
            </Content>
            <LoginButton onClick={onSubmit}>{loginText}</LoginButton>
        </OpenInputContainer>
    );
};

export default Login;