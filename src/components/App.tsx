import React from 'react';
import styled from 'styled-components';
import { say } from '../lib/speech';

const Container = styled.div`
  padding: 8px;
  border: 2px solid red;
`;

const Button = styled.button`
  padding: 6px 20px;
  background: blue;
`;

export default function App() {
  const sayTest = () => {
    console.log('sayTest');
    say('terima kasih jenny atas hadiah mawarnya!');
  };

  return (
    <Container>
      <Button onClick={sayTest}>Say it</Button>
    </Container>
  );
}
