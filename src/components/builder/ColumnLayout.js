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
    preview: [12]
  },
  {
    name: '2 Columns',
    icon: '2',
    columns: [1, 1],
    preview: [6, 6]
  },
  {
    name: '3 Columns',
    icon: '3',
    columns: [1, 1, 1],
    preview: [4, 4, 4]
  },
  {
    name: '4 Columns',
    icon: '4',
    columns: [1, 1, 1, 1],
    preview: [3, 3, 3, 3]
  },
  {
    name: 'Left Sidebar',
    icon: '1-2',
    columns: [1, 2],
    preview: [4, 8]
  },
  {
    name: 'Right Sidebar',
    icon: '2-1',
    columns: [2, 1],
    preview: [8, 4]
  },
  {
    name: 'Three With Sidebar',
    icon: '1-3',
    columns: [1, 3],
    preview: [3, 9]
  },
  {
    name: 'Three With Main',
    icon: '3-1',
    columns: [3, 1],
    preview: [9, 3]
  }
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
                        gap={2}
                        height="100%"
                      >
                        {layout.preview.map((width, i) => (
                          <Box
                            key={i}
                            bg="gray.200"
                            height="100%"
                            gridColumn={`span ${width}`}
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