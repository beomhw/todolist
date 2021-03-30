// 새로운 할 일을 등록할 수 있게 해주는 컴포넌트, TodoTemplate의 하단부에 초록색 원 버튼을 렌더링해줌
// 여기서 useState를 사용하여 토글 할 수 있는 open 값을 관리하며, 이 값이 true일 때에는 아이콘을 45도
// 돌려서 X 모양이 보여지게 한 후, 버튼 색을 빨간색으로 바꿔준다.
// 그리고 할 일을 입력 할 수 있는 폼도 보여줌
import React, {useState, useEffect} from 'react';
import styled, {css} from 'styled-components';
import {MdAdd} from 'react-icons/md';
import {useTodoDispatch, useTodoNextId} from '../TodoContext';

const CircleButton = styled.button`
    background: #38d9a9;
    &:hover {
        background: #63e6be;
    }
    &:active {
        background: #20c997;
    }

    z-index: 5;
    cursor: pointer;
    width: 80px;
    height: 80px;
    display: block;
    align-items: center;
    justify-content: center;
    font-size: 60px;
    position: absolute;
    left: 50%;
    bottom: 0px;
    transform: translate(-50%, 50%);
    color: white;
    border-radius: 50%;
    border: none;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;

    transition: 0.125s all ease-in;
    ${
        props=>
            props.open &&
            css `
                background: #ff6b6b;
                &:hover {
                    background: #ff8787;
                }
                &:active {
                    background: #fa5252;
                }
                transform: translate(-50%, 50%) rotate(45deg);
            `
    }
`;

const InsertFormPositioner = styled.div`
    width: 100%;
    bottom: 0;
    left: 0;
    position: absolute;
    
`;

const InsertForm = styled.form`
    background: #f8f9fa;
    padding-left: 32px;
    padding-top: 32px;
    padding-right: 32px;
    padding-bottom: 72px;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    border-top: 1px solid #e9ecef;
`;

const Input = styled.input`
    padding: 12px;
    border-radius: 4px;
    border: 1px solid #dee2ed;
    width: 100%;
    outline: none;
    font-size: 18px;
    box-sizing: border-box;
`;

const useRandom = () => {
    let num;
    num = Math.floor(Math.random() * 3 + 0);

    console.log(num);
    return num;
}

const TodoCreate = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const randomText = [
        '할 일을 입력 후, Enter를 눌러주세요!',
        '종료하기 전에 저장을 꼭 눌러주세요!',
        '오늘도 화이팅!!'
    ];

    const dispatch = useTodoDispatch();
    const nextId = useTodoNextId();
    const randomNum = useRandom();

    const onToggle = () => setOpen(!open);
    const onChange = (e) => setValue(e.target.value);
    const onSubmit = (e) => {
        e.preventDefault();
        let user_id = Number(window.sessionStorage.getItem('id'));
        dispatch({
            type: 'CREATE',
            todo: {
                user_id: user_id,
                id: nextId.current,
                task: value,
                done: false
            }
        });

        setValue('');
        setOpen(false);
        nextId.current += 1;
    }

    return (
        <>
            {open && (
                <InsertFormPositioner>
                    <InsertForm onSubmit={onSubmit}>
                        <Input 
                            autoFocus 
                            placeholder={randomText[randomNum]}
                            onChange={onChange}
                            value={value}
                        />
                    </InsertForm>
                </InsertFormPositioner>
            )}
            <CircleButton onClick={onToggle} open={open}>
                <MdAdd />
            </CircleButton>
        </>
    );
}

export default React.memo(TodoCreate);