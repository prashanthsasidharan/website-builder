import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tooltip,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  SimpleGrid,
  Box,
} from '@chakra-ui/react'
import { FaColumns } from 'react-icons/fa'

const ColumnManager = ({ onUpdateColumns }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const columnLayouts = [
    { name: '1 Column', layout: [1] },
    { name: '2 Columns', layout: [1, 1] },
    { name: '3 Columns', layout: [1, 1, 1] },
    { name: '2/3 + 1/3', layout: [2, 1] },
    { name: '1/3 + 2/3', layout: [1, 2] },
    { name: '1/4 + 3/4', layout: [1, 3] },
    { name: '3/4 + 1/4', layout: [3, 1] },
  ]

  const handleLayoutSelect = (layout) => {
    onUpdateColumns(layout)
    onClose()
  }

  return (
    <>
      <Tooltip label="Manage Columns">
        <IconButton
          icon={<FaColumns />}
          size="sm"
          aria-label="Manage Columns"
          variant="ghost"
          onClick={onOpen}
        />
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Choose Column Layout</ModalHeader>
          <ModalBody>
            <SimpleGrid columns={2} spacing={4}>
              {columnLayouts.map((layout, index) => (
                <Button
                  key={index}
                  height="80px"
                  variant="outline"
                  onClick={() => handleLayoutSelect(layout.layout)}
                  _hover={{ borderColor: 'blue.500' }}
                >
                  <SimpleGrid
                    columns={layout.layout.length}
                    gap={2}
                    width="100%"
                    height="100%"
                    p={2}
                  >
                    {layout.layout.map((col, colIndex) => (
                      <Box
                        key={colIndex}
                        bg="gray.200"
                        height="100%"
                        gridColumn={`span ${col}`}
                      />
                    ))}
                  </SimpleGrid>
                </Button>
              ))}
            </SimpleGrid>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ColumnManager 