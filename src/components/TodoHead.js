// 오늘의 날짜와 요일을 보여주고, 앞으로 해야 할 일이 몇개 남았는지 보여줌
import React, {useState} from 'react';
import styled from 'styled-components';
import {useTodoState, useTodoDelete} from '../TodoContext';
import {useTheme} from '../ThemeContext';
import axios from 'axios';

const TodoHeadBlock = styled.div`
    padding: 48px 32px 32px 24px;
    border-bottom: 1px solid ${p=>p.theme.background};
    h1 {
        margin: 0;
        font-size: 36px;
        color: ${p=>p.theme.text};
    }
    .day {
        margin-top: 4px;
        color: #868e96;
        font-size: 21px;
    }
    .tasks-left {
        color: #20c997;
        font-size: 18px;
        margin-top: 40px;
        font-weight: bold;
        display: flex;
        align-items: center;
    }
    .logout {
        float: right;
    }
`;

const LogoutButton = styled.button`
    width: 70px;
    height: 30px;
    background-color: #20c997;
    color: white;
    border: 0;
    border-radius: 10px;
    &:hover {
        background-color: #48f0be;
    }
    &:focus {
        outline: none;
    }
    cursor: pointer;
    transition-duration: 0.3s;
    margin: 10px;
`;

const SaveButton = styled.button`
    width: 70px;
    height: 30px;
    background-color: #20c997;
    color: white;
    border: 0;
    border-radius: 10px;
    &:hover {
        background-color: #48f0be;
    }
    &:focus {
        outline: none;
    }
    cursor: pointer;
    transition-duration: 0.3s;
`;

const TodoHead = () => {
    const todos = useTodoState();
    const deleteIds = useTodoDelete();
    const theme = useTheme();
    const [saveText, setSaveText] = useState('저장');

    console.log(todos);
    const undoneTasks = todos.filter(todo => !todo.done);
    const store = window.sessionStorage;

    const today = new Date();
    const dateString = today.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const dayName = today.toLocaleDateString('ko-KR', {weekday: 'long'});

    const onLogout = () => {
        store.clear();
        window.location.href='/';
    }

    const onSave = () => {
        setSaveText('저장 중..');
        console.log(todos);
        async function saveTodo(todos) {
            await axios.post('http://localhost/api/todosave', {
                todos: todos,
                deleteTaskIds: deleteIds
            }
            ).then(res => {
                console.log(res);
                alert('저장 완료했어요!');
                setSaveText('저장');
                window.location.href = '/todo';
            }).catch(e => {
                console.log(e);
            }) 
        }
        saveTodo(todos);
    }
    
    return (
        <TodoHeadBlock theme={theme}>
            <div className="logout">
                <LogoutButton onClick={onLogout}>로그아웃</LogoutButton>
                <SaveButton onClick={onSave}>{saveText}</SaveButton>
            </div>
            <h1>{dateString}</h1>
            <div className="day">{dayName}</div>
            <div className="tasks-left">
                {store.getItem('nickname')}님! 할 일이 {undoneTasks.length}개 남았어요!</div>
        </TodoHeadBlock>
    );
}

export default TodoHead;