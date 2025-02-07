import { Box, Button, Input, IconButton, Flex, Select } from '@chakra-ui/react'
import { useState } from 'react'
import { FaEdit, FaCheck, FaTimes } from 'react-icons/fa'

const ButtonElement = ({ text, variant, colorScheme, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [buttonText, setButtonText] = useState(text || 'Click me')
  const [buttonVariant, setButtonVariant] = useState(variant || 'solid')
  const [buttonColor, setButtonColor] = useState(colorScheme || 'blue')

  const handleSave = () => {
    onUpdate({
      text: buttonText,
      variant: buttonVariant,
      colorScheme: buttonColor
    })
    setIsEditing(false)
  }

  return (
    <Box position="relative" p={2} _hover={{ bg: 'gray.50' }}>
      {isEditing ? (
        <Flex direction="column" gap={2}>
          <Input
            value={buttonText}
            onChange={(e) => setButtonText(e.target.value)}
            placeholder="Button text"
          />
          <Select value={buttonVariant} onChange={(e) => setButtonVariant(e.target.value)}>
            <option value="solid">Solid</option>
            <option value="outline">Outline</option>
            <option value="ghost">Ghost</option>
          </Select>
          <Select value={buttonColor} onChange={(e) => setButtonColor(e.target.value)}>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="red">Red</option>
            <option value="gray">Gray</option>
          </Select>
          <Flex gap={2}>
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
        </Flex>
      ) : (
        <Box position="relative">
          <Button
            colorScheme={buttonColor}
            variant={buttonVariant}
            w="full"
          >
            {buttonText}
          </Button>
          <IconButton
            icon={<FaEdit />}
            size="sm"
            position="absolute"
            top={2}
            right={2}
            onClick={() => setIsEditing(true)}
          />
        </Box>
      )}
    </Box>
  )
}

export default ButtonElement
