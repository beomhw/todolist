// 할 일에 대한 정보가 들어 있는 todos 배열을 내장함수 map을 사용하여 여러 개의 todoItem 컴포넌트를 렌더링 해줌
import React from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';
import {useTodoState} from '../TodoContext';

const TodoListBlock = styled.div`
    flex: 1; // 자신이 차지 할 수 있는 영역을 꽉 채우도록 설정
    padding: 20px 32px 0 48px;
    overflow-y: auto;
    background: white; // 사이즈 조정이 잘 되고 있는지 확인하기 위한 임시 스타일
`;

const TodoList = () => {
    const todos = useTodoState();
    console.log(todos);

    return (
    <TodoListBlock>
        {todos.map(todo=> (
          <TodoItem
            key={todo.id}
            user_id={todo.user_id}
            id={todo.id}
            task_id={todo.task_id}
            task={todo.task}
            done={todo.done}
          />  
        ))}
    </TodoListBlock>
    );
}

export default TodoList;