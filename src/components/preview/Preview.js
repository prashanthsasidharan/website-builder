import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  IconButton,
  Flex,
  useDisclosure,
  Tooltip,
  Grid
} from '@chakra-ui/react'
import { FaDesktop, FaTabletAlt, FaMobile, FaTimes } from 'react-icons/fa'
import { useState } from 'react'

const deviceSizes = {
  desktop: '100%',
  tablet: '768px',
  mobile: '375px'
}

const PreviewModal = ({ sections, isOpen, onClose }) => {
  const [device, setDevice] = useState('desktop')

  const renderElement = (element) => {
    switch (element.type) {
      case 'text':
        return <Box p={4}>{element.content}</Box>
      case 'image':
        return (
          <Box p={4}>
            <img src={element.content.src} alt={element.content.alt} style={{ maxWidth: '100%' }} />
          </Box>
        )
      case 'button':
        return (
          <Box p={4}>
            <Button
              colorScheme={element.content.colorScheme}
              variant={element.content.variant}
            >
              {element.content.text}
            </Button>
          </Box>
        )
      case 'form':
        return (
          <Box p={4}>
            {element.fields?.map((field, index) => (
              <Box key={index} mb={4}>
                {field.type === 'textarea' ? (
                  <textarea placeholder={field.placeholder} />
                ) : (
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                  />
                )}
              </Box>
            ))}
            <Button colorScheme="blue">Submit</Button>
          </Box>
        )
      default:
        return null
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex justify="space-between" align="center">
            <Flex gap={4}>
              <Tooltip label="Desktop">
                <IconButton
                  icon={<FaDesktop />}
                  onClick={() => setDevice('desktop')}
                  variant={device === 'desktop' ? 'solid' : 'ghost'}
                />
              </Tooltip>
              <Tooltip label="Tablet">
                <IconButton
                  icon={<FaTabletAlt />}
                  onClick={() => setDevice('tablet')}
                  variant={device === 'tablet' ? 'solid' : 'ghost'}
                />
              </Tooltip>
              <Tooltip label="Mobile">
                <IconButton
                  icon={<FaMobile />}
                  onClick={() => setDevice('mobile')}
                  variant={device === 'mobile' ? 'solid' : 'ghost'}
                />
              </Tooltip>
            </Flex>
            <IconButton
              icon={<FaTimes />}
              onClick={onClose}
              variant="ghost"
            />
          </Flex>
        </ModalHeader>
        <ModalBody p={0} bg="gray.50">
          <Box
            maxW={deviceSizes[device]}
            w="full"
            mx="auto"
            bg="white"
            minH="100vh"
            transition="max-width 0.3s"
          >
            {sections.map((section) => (
              <Box key={section.id}>
                <Grid
                  templateColumns={section.columns.map(col => `${col.span}fr`).join(' ')}
                  gap={4}
                  p={4}
                >
                  {section.columns.map((column) => (
                    <Box
                      key={column.id}
                      {...column.styles}
                    >
                      {column.elements.map((element) => (
                        <Box key={element.id}>
                          {renderElement(element)}
                        </Box>
                      ))}
                    </Box>
                  ))}
                </Grid>
              </Box>
            ))}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default PreviewModal 