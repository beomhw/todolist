// Todolist의 레이아웃을 설정하는 컴포넌트 - 페이지의 중앙에 그림자가 적용된 흰색 박스를 보여줌
import React from 'react';
import styled from 'styled-components';
import {useTheme} from '../ThemeContext';

const TodoTemplateBlock = styled.div`
    width: 512px;
    height: 768px;

    // 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정
    position: relative;
    background: ${p=>p.theme.container};
    border-radius: 16px;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);

    // 페이지 중앙에 나타나도록 설정
    margin: 0 auto;
    margin-bottom: 32px;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
`;

const TodoTemplate = ({children}) => {
    const theme = useTheme();

    return <TodoTemplateBlock theme={theme}>{children}</TodoTemplateBlock>;
}

export default TodoTemplate;