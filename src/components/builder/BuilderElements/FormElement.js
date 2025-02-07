import { Box, Input, Textarea, Button, Stack, IconButton, Flex, Select } from '@chakra-ui/react'
import { useState } from 'react'
import { FaEdit, FaCheck, FaTimes } from 'react-icons/fa'

const FormElement = ({ fields, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [formFields, setFormFields] = useState(fields || [
    { type: 'text', placeholder: 'Name' },
    { type: 'email', placeholder: 'Email' },
    { type: 'textarea', placeholder: 'Message' }
  ])

  const handleSave = () => {
    onUpdate(formFields)
    setIsEditing(false)
  }

  return (
    <Box position="relative" p={2} _hover={{ bg: 'gray.50' }}>
      {isEditing ? (
        <Stack spacing={4}>
          {formFields.map((field, index) => (
            <Flex key={index} gap={2}>
              <Input
                value={field.placeholder}
                onChange={(e) => {
                  const newFields = [...formFields]
                  newFields[index].placeholder = e.target.value
                  setFormFields(newFields)
                }}
              />
              <Select
                value={field.type}
                onChange={(e) => {
                  const newFields = [...formFields]
                  newFields[index].type = e.target.value
                  setFormFields(newFields)
                }}
              >
                <option value="text">Text</option>
                <option value="email">Email</option>
                <option value="textarea">Textarea</option>
              </Select>
            </Flex>
          ))}
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
        </Stack>
      ) : (
        <Box position="relative">
          <Stack spacing={4}>
            {formFields.map((field, index) => (
              field.type === 'textarea' ? (
                <Textarea key={index} placeholder={field.placeholder} />
              ) : (
                <Input
                  key={index}
                  type={field.type}
                  placeholder={field.placeholder}
                />
              )
            ))}
            <Button colorScheme="blue">Submit</Button>
          </Stack>
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

export default FormElement
