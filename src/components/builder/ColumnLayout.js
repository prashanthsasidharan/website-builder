import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  SimpleGrid,
  Box,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
} from '@chakra-ui/react'
import { FaColumns } from 'react-icons/fa'

const layouts = [
  {
    name: '1 Column',
    icon: '1',
    columns: [1],
    preview: ['1fr']
  },
  {
    name: '2 Columns',
    icon: '2',
    columns: [1, 1],
    preview: ['1fr', '1fr']
  },
  {
    name: '3 Columns',
    icon: '3',
    columns: [1, 1, 1],
    preview: ['1fr', '1fr', '1fr']
  },
  {
    name: '4 Columns',
    icon: '4',
    columns: [1, 1, 1, 1],
    preview: ['1fr', '1fr', '1fr', '1fr']
  },
  {
    name: 'Left Sidebar',
    icon: '1-2',
    columns: [1, 2],
    preview: ['30px', '1fr']
  },
  {
    name: 'Right Sidebar',
    icon: '2-1',
    columns: [2, 1],
    preview: ['1fr', '30px']
  },
]

const ColumnLayout = ({ onSelectLayout }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleLayoutSelect = (layout) => {
    onSelectLayout(layout.columns)
    onClose()
  }

  return (
    <>
      <IconButton
        icon={<FaColumns />}
        aria-label="Change column layout"
        onClick={onOpen}
        size="sm"
        variant="ghost"
      />

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Choose Column Layout</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <SimpleGrid columns={2} spacing={4}>
              {layouts.map((layout) => (
                <Button
                  key={layout.name}
                  height="100px"
                  onClick={() => handleLayoutSelect(layout)}
                  variant="outline"
                  _hover={{
                    borderColor: 'blue.500',
                    bg: 'blue.50'
                  }}
                >
                  <VStack spacing={2}>
                    <Box w="100%" h="40px">
                      <SimpleGrid
                        columns={layout.columns.length}
                        templateColumns={layout.preview.join(' ')}
                        gap={2}
                        height="100%"
                      >
                        {layout.preview.map((width, i) => (
                          <Box
                            key={i}
                            bg="gray.200"
                            height="100%"
                          />
                        ))}
                      </SimpleGrid>
                    </Box>
                    <Text fontSize="sm">{layout.name}</Text>
                  </VStack>
                </Button>
              ))}
            </SimpleGrid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ColumnLayout 