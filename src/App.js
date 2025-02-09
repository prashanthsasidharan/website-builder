import { ChakraProvider, Box } from '@chakra-ui/react';
import Navbar from './components/layout/Navbar.js';
import Canvas from './components/builder/Canvas';
import { useState } from 'react';

function App() {
  const [sections, setSections] = useState(() => {
    const savedSections = localStorage.getItem('sections');
    return savedSections ? JSON.parse(savedSections) : [];
  });

  return (
    <ChakraProvider>
      <Box minH="100vh">
        <Navbar sections={sections} />
        <Canvas sections={sections} setSections={setSections} />
      </Box>
    </ChakraProvider>
  );
}

export default App;
