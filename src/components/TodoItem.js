// 각 할 일에 대한 정보를 렌더링해주는 컴포넌트, 좌측에 있는 원을 누르면 할 일의 완료 여부를 toggle 할 수 있음
import React, {useState} from 'react';
import styled, {css} from 'styled-components';
import {MdDone, MdDelete} from 'react-icons/md';
import {BiPencil} from 'react-icons/bi';
import {useTodoDispatch, useTodoDeleteDispatch} from '../TodoContext';

const Remove = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #dee2e6;
    font-size: 24px;
    cursor: pointer;
    &:hover {
        color: #ff6b6b;
    }
    display: none;
`;

const Update = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #dee2e6;
    font-size: 24px;
    cursor: pointer;
    &:hover {
        color: black;
    }
    display: none;
`;

const TodoItemBlock = styled.div`
    display: flex;
    align-items: center;
    padding: 12px 0 0 12px;
    &:hover {
        // component selector - TodoItemBlock 위에 커서가 있을 때, Remove 컴포넌트를 보여줌
        ${Remove} {
            display: initial;
        }
        ${Update} {
            display: initial;
        }
    }
`;

const CheckCircle = styled.div`
    width: 32px;
    height: 32px;
    border-radius: 16px;
    border: 2px solid #ced4da;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    cursor: pointer;
    ${
        props => 
            props.done && css`
                border: 2px solid #38d9a9;
                color: #38d9a9;
            `
    }
    user-select: none;
`;

const Text = styled.div`
    flex: 1;
    font-size: 21px;
    color: ${p=>p.theme.text};
    ${ 
        p => p.done && css ` color: #ced4da;`
    };
    ${
        p => p.theme.mode === 'dark' && p.done && css ` color: #3c415c;`
    }
    ${ 
        p => p.on && css`display: none;`
    };
    user-select: none;
`;

const Form = styled.form`
    &:hover {
        ${Remove} {
            display: none;
        }
        ${Update} {
            display: none;
        }
    }
`;

const OnInput = styled.input`
    flex: 1;
    font-size: 21px;
    background-color: ${p=>p.theme.container};
    color: ${p=>p.theme.text};
    border: 0;
    &:focus {
        outline: none;
    }
`;


const TodoItem = ({user_id, task_id, task, done, id, theme}) => {
    const [on, setOn] = useState(true);
    const [todoText, setTodoText] = useState(task);
    const dispatch = useTodoDispatch();
    const deleteAdd = useTodoDeleteDispatch();

    const onToggle = () => dispatch({type: 'TOGGLE', todo: {id: id, update: 'updated'}});
    const onRemove = () => {
        dispatch({type: 'REMOVE', id});
        deleteAdd({type: 'DELETE', task_id});
    };
    const UpdateOpacity = () => setOn(false);
    const onChange = (e) => setTodoText(e.target.value);
    const onSave = (e) => {
        e.preventDefault();
        dispatch({
            type: 'UPDATE',
            todo: {
                id: id,
                task_id: task_id,
                user_id: user_id,
                task: todoText,
                done: done,
                update: 'updated'
            }
        });
        setOn(true);
    }

    return(
        <TodoItemBlock>
            <CheckCircle done={done} onClick={onToggle}>
                {done && <MdDone />}
            </CheckCircle>
            <Text theme={theme} done={done} on={!on}>{todoText}</Text>
            {!on && 
                <Form onSubmit={onSave}>
                    <OnInput autoFocus theme={theme} value={todoText} onChange={onChange} />
                </Form> 
            }
            {on &&
            <>
                <Update onClick={UpdateOpacity}>
                    <BiPencil />
                </Update>
                <Remove onClick={onRemove}>
                    <MdDelete />
                </Remove>
            </>
            }
        </TodoItemBlock>
    );
}

export default React.memo(TodoItem); // 다른 항목이 업데이트 될 때, 불필요한 리렌더링을 방지하게 되어 성능의 최적화 가능