import React, {createContext, useReducer, useContext, useRef, useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {useTheme} from './ThemeContext';

const LoadingContainer = styled.div`
    font-weight: bold;
    font-size: 20px;
    width: 200px;
    display: flex;
    justify-content: center;
    color: ${p=>p.theme.text};
    // 페이지 중앙에 나타나도록 설정
    margin: 0 auto;
    margin-top: 96px;
    margin-bottom: 32px;
`;

const initialTodos = [];
const initialDeletes = [];

const todoReducer = (state, action) => {
    switch(action.type) {
        case 'CREATE':
            return state.concat(action.todo);
        case 'TOGGLE':
            return state.map(todo=>
                todo.id === action.todo.id ? {...todo, update: action.todo.update, done: !todo.done} : todo
                );
        case 'REMOVE':
            return state.filter(todo => todo.id !== action.id);
        case 'UPDATE':
            return state.map(todo => 
                todo.id === action.todo.id ? todo = action.todo : todo
            );
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

const deleteReducer = (state, action) => {
    switch(action.type) {
        case 'DELETE':
            return state.concat(action.task_id);
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();
const TodoDeleteContext = createContext();
const TodoDeleteDispatchContext = createContext();

export function TodoProvider({children}) {
    const [deleteState, deleteDispatch] = useReducer(deleteReducer, initialDeletes);
    const [state, dispatch] = useReducer(todoReducer, initialTodos);
    const [loading, setLoading] = useState(true);
    const theme = useTheme();
    const store = window.sessionStorage;
    const nextId = useRef(0);
    console.log(state);
    console.log(deleteState);

    useEffect(() => {
        async function getTodoInfo(id) {
            axios.get('http://localhost/api/todolist', {
                params: {id: id}
            }).then(res => {
                console.log(res);
                let data = Object.values(res.data);
                data.map(da => {
                    dispatch({
                        type: 'CREATE',
                        todo: {
                            user_id: da.id,
                            task_id: da.task_id,
                            id: nextId.current,
                            task: da.task,
                            done: Boolean(da.done)
                        }
                    });
                    nextId.current+=1;
                });
                setLoading(false);
            }).catch(e => {
                console.log(e);
            }) 
        }
        let id = Number(store.getItem('id'));
        getTodoInfo(id);
    },[]);

    return (
        // Context에서 사용할 값을 지정할 때에는 Provider 컴포넌트를 렌더링 하고 value를 설정해주면 됨
        // 그리고 props로 받아온 children 값을 내부에 렌더링해주자
        <>
        {loading ? 
        <LoadingContainer theme={theme}>Loading...</LoadingContainer> :
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                <TodoNextIdContext.Provider value={nextId}>
                    <TodoDeleteContext.Provider value={deleteState}>
                        <TodoDeleteDispatchContext.Provider value={deleteDispatch}>
                            {children}
                        </TodoDeleteDispatchContext.Provider>
                    </TodoDeleteContext.Provider>
                </TodoNextIdContext.Provider>
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
        }
        
        </>
    );
}

export function useTodoState() {
    const context = useContext(TodoStateContext);
    if(!context) {
        throw new Error('Cannot find StateProvider');
    }
    return context;
}

export function useTodoDispatch() {
    const context = useContext(TodoDispatchContext);
    if(!context) {
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}

export function useTodoNextId() {
    const context = useContext(TodoNextIdContext);
    if(!context) {
        throw new Error('Cannot find NextIdProvider');
    }
    return context;
}

export function useTodoDelete() {
    const context = useContext(TodoDeleteContext);
    if(!context) {
        throw new Error('Cannot find TodoDeleteProvider');
    }
    return context;
}

export function useTodoDeleteDispatch() {
    const context = useContext(TodoDeleteDispatchContext);
    if(!context) {
        throw new Error('Cannot find TodoDeleteDispatchProvider');
    }
    return context;
}