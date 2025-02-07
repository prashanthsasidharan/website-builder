import { Box, Text, Input, IconButton, Flex } from '@chakra-ui/react'
import { useState } from 'react'
import { FaEdit, FaCheck, FaTimes } from 'react-icons/fa'

const TextElement = ({ content, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [text, setText] = useState(content || 'Add text here')

  const handleSave = () => {
    onUpdate(text)
    setIsEditing(false)
  }

  return (
    <Box position="relative" p={2} _hover={{ bg: 'gray.50' }}>
      {isEditing ? (
        <Flex gap={2}>
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            autoFocus
          />
          <IconButton
            icon={<FaCheck />}
            size="sm"
            colorScheme="green"
            onClick={handleSave}
          />
          <IconButton
            icon={<FaTimes />}
            size="sm"
            colorScheme="red"
            onClick={() => setIsEditing(false)}
          />
        </Flex>
      ) : (
        <Flex align="center" justify="space-between">
          <Text>{text}</Text>
          <IconButton
            icon={<FaEdit />}
            size="sm"
            variant="ghost"
            onClick={() => setIsEditing(true)}
          />
        </Flex>
      )}
    </Box>
  )
}

export default TextElement
