import React from 'react';
import { createRoot } from 'react-dom/client';
import Options from './components/Options';

const root = createRoot(document.getElementById('root')!);
root.render(<Options />);
