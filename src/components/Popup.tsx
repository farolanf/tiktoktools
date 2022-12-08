import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 8px;
  min-width: 300px;
`;

export default function Popup() {
  return (
    <Container>
      <h1 className="h6">TikTok Tools</h1>
    </Container>
  );
}
