import React, {useState} from 'react';
import styled,{css} from 'styled-components';
import {MdClose} from 'react-icons/md';
import axios from 'axios';

const flexAlign = css`
    display: flex;
    align-items: center;
    justify-content: center;
`;

// 회원가입 전체 컨테이너
const OpenInputContainer = styled.div`
    height: 400px;
    width: 500px;
    background-color: white;
    margin: 0 auto;
    transition: 1s;
    border-radius: 20px;
    flex-direction: column;
    ${flexAlign};
`;

// 닫기 버튼 컨테이너
const CloseContainer = styled.div`
    height: 20px;
    width: 100%;
`;

// 닫기 버튼
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

// input 컨테이너
const Content = styled.div`
    flex: 9;
    ${flexAlign};
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
`;

const Input = styled.input`
    width: 200px;
    height: 30px;
    margin: 10px;
    &:focus{
        outline: none;
    }
    border: 1px solid gray;
`;

const RegisterButton = styled.button`
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

async function jwtRegister(inputs) {
    await axios.post('http://localhost/api/register', {
        userId: inputs.userId,
        password: inputs.password,
        nickname: inputs.nickname
    }).then(res => {
        console.log(res);
        return res;
    })
}

const Register = ({onClose}) => {
    const [inputs, setInputs] = useState({
        userId: '',
        password: '',
        passwordAgain: '',
        nickname: ''
    });
    const {userId, password, passwordAgain, nickname} = inputs;
    const [registerText, setRegisterText] = useState('회원가입');

    const onChange = (e) => {
        let {name, value} = e.target;

        setInputs({
            ...inputs,
            [name]: value
        })

        console.log(inputs);
    };

    const onSubmit = () => {
        setRegisterText('회원가입 중...');
        if(inputs.userId.length === 0 || inputs.password.length === 0 ||
            inputs.passwordAgain.length === 0 || inputs.nickname.length === 0) {
                alert('공란이 있습니다!'); setRegisterText('회원가입');
                return 0;     
            }
        if(inputs.password !== inputs.passwordAgain) {
            alert('비밀번호가 다릅니다! 정확히 입력해주세요'); setRegisterText('회원가입');
            return 0;     
        }
        if(inputs.password.length < 6) {
            alert('비밀번호는 6자 이상으로 입력해주세요!'); setRegisterText('회원가입');
            return 0;
        }
        if(inputs.nickname.length < 2) {
            alert('닉네임은 2자 이상으로 입력해주세요!'); setRegisterText('회원가입');
            return 0;
        }

        jwtRegister(inputs).then(() => {
            alert('회원가입에 성공했습니다.');
            setRegisterText('회원가입');
            window.location.href='/';
        }).catch(e => {
            console.log(e.response);
            setRegisterText('회원가입');
            if(e.response.data.status === 'error') {
                alert('회원가입에 실패했어요!');
            }
        })
    }

    return (
        <OpenInputContainer>
            <CloseContainer>
                <CloseButton onClick={onClose}>
                    <MdClose />
                </CloseButton>
            </CloseContainer>
            <Content>
                <LabelContainer>
                    <Pstyle>ID</Pstyle>
                    <Pstyle>비밀번호</Pstyle>
                    <Pstyle>비밀번호 재확인</Pstyle>
                    <Pstyle>닉네임</Pstyle>
                </LabelContainer>
                <InputContainer method="post">
                    <Input placeholder="아이디를 입력해주세요" onChange={onChange} value={userId} name="userId" />
                    <Input type="password" placeholder="6자 이상으로 부탁해요" onChange={onChange} value={password} name="password" />
                    <Input type="password" placeholder="틀리지 않게 조심!" onChange={onChange} value={passwordAgain} name="passwordAgain" />
                    <Input placeholder="2자 이상으로 부탁해요" onChange={onChange} value={nickname} name="nickname" /> 
                </InputContainer>
            </Content>
            <RegisterButton onClick={onSubmit}>{registerText}</RegisterButton>
        </OpenInputContainer>
    );
};

export default Register;