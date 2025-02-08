import Draggable from 'react-draggable'
import { Box, useToast } from '@chakra-ui/react'
import { useState } from 'react'

const DraggableElement = ({ children, onDragStart, onDragEnd, onDrop }) => {
  const [isDragging, setIsDragging] = useState(false)
  const toast = useToast()

  const handleStart = (e, data) => {
    setIsDragging(true)
    if (onDragStart) onDragStart(e, data)
  }

  const handleStop = (e, data) => {
    setIsDragging(false)
    if (onDragEnd) onDragEnd(e, data)

    // Calculate drop position and target column
    const elementBelow = document.elementFromPoint(e.clientX, e.clientY)
    const columnElement = elementBelow?.closest('[data-column-id]')
    
    if (columnElement) {
      const columnId = columnElement.dataset.columnId
      if (onDrop) onDrop(columnId, { x: data.x, y: data.y })
    } else {
      // Reset position if not dropped in a valid column
      toast({
        title: "Invalid drop location",
        description: "Please drop elements inside a column",
        status: "warning",
        duration: 2000,
        isClosable: true,
      })
    }
  }

  return (
    <Draggable
      handle=".drag-handle"
      position={{ x: 0, y: 0 }}
      onStart={handleStart}
      onStop={handleStop}
      bounds="parent"
    >
      <Box
        opacity={isDragging ? 0.6 : 1}
        cursor="move"
        position="relative"
        zIndex={isDragging ? 1000 : 1}
        className="draggable-element"
      >
        <Box
          className="drag-handle"
          position="absolute"
          top={2}
          left={2}
          w="20px"
          h="20px"
          bg="gray.200"
          borderRadius="md"
          display="flex"
          alignItems="center"
          justifyContent="center"
          cursor="move"
          opacity={0}
          _groupHover={{ opacity: 1 }}
          transition="opacity 0.2s"
        >
          ⋮
        </Box>
        {children}
      </Box>
    </Draggable>
  )
}

export default DraggableElement 