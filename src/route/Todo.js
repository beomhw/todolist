import React from 'react';
import {TodoProvider} from '../TodoContext';
import TodoCreate from '../components/TodoCreate';
import TodoTemplate from '../components/TodoTemplate';
import TodoHead from '../components/TodoHead';
import TodoList from '../components/TodoList';

const Todo = () => {

    return (
            <TodoProvider>
                <TodoTemplate>
                    <TodoHead />
                    <TodoList />
                    <TodoCreate />
                </TodoTemplate>
            </TodoProvider>
    );
}

export default Todo;