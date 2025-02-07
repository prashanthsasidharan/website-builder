import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Grid,
  Text,
  Button,
} from '@chakra-ui/react'

const PreviewModal = ({ sections = [], isOpen, onClose }) => {
  console.log('Preview sections:', sections) // Debug log

  const renderElement = (element) => {
    if (!element) return null

    switch (element.type) {
      case 'text':
        return (
          <Box p={4}>
            <Text>{element.content}</Text>
          </Box>
        )
      case 'image':
        return (
          <Box p={4}>
            <img 
              src={element.content?.src || element.content} 
              alt={element.content?.alt || 'Preview image'} 
              style={{ maxWidth: '100%', height: 'auto' }} 
            />
          </Box>
        )
      case 'button':
        return (
          <Box p={4}>
            <Button
              colorScheme={element.content?.colorScheme || 'blue'}
              variant={element.content?.variant || 'solid'}
            >
              {element.content?.text || 'Button'}
            </Button>
          </Box>
        )
      case 'form':
        return (
          <Box p={4}>
            <form>
              {element.content?.fields?.map((field, index) => (
                <Box key={index} mb={4}>
                  <input
                    type={field.type || 'text'}
                    placeholder={field.placeholder}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #E2E8F0',
                      borderRadius: '4px'
                    }}
                  />
                </Box>
              ))}
              <Button colorScheme="blue">Submit</Button>
            </form>
          </Box>
        )
      default:
        return (
          <Box p={4}>
            <Text>Unknown element type: {element.type}</Text>
          </Box>
        )
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Preview</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {sections && sections.length > 0 ? (
            sections.map((section) => (
              <Box key={section.id} mb={8}>
                <Grid
                  templateColumns={section.columns.map(col => `${col.span}fr`).join(' ')}
                  gap={4}
                  p={4}
                >
                  {section.columns.map((column) => (
                    <Box 
                      key={column.id}
                      bg="white"
                      p={4}
                      rounded="md"
                    >
                      {column.elements && column.elements.map((element) => (
                        <Box key={element.id}>
                          {renderElement(element)}
                        </Box>
                      ))}
                    </Box>
                  ))}
                </Grid>
              </Box>
            ))
          ) : (
            <Box p={8} textAlign="center">
              <Text color="gray.500">No content to preview</Text>
            </Box>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default PreviewModal 