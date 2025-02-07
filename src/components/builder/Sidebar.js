import {
  Box,
  VStack,
  Text,
  Divider,
  Icon,
  Flex,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import {
  FaHeading,
  FaFont,
  FaImage,
  FaSquare,
  FaWpforms,
  FaVideo,
  FaList,
  FaTable,
  FaCode,
  FaMapMarkerAlt,
} from 'react-icons/fa'

const elementTypes = [
  {
    category: 'Basic',
    items: [
      { type: 'heading', icon: FaHeading, label: 'Heading' },
      { type: 'text', icon: FaFont, label: 'Text' },
      { type: 'image', icon: FaImage, label: 'Image' },
      { type: 'button', icon: FaSquare, label: 'Button' },
    ]
  },
  {
    category: 'Advanced',
    items: [
      { type: 'form', icon: FaWpforms, label: 'Form' },
      { type: 'video', icon: FaVideo, label: 'Video' },
      { type: 'list', icon: FaList, label: 'List' },
      { type: 'table', icon: FaTable, label: 'Table' },
    ]
  },
  {
    category: 'Custom',
    items: [
      { type: 'html', icon: FaCode, label: 'Custom HTML' },
      { type: 'map', icon: FaMapMarkerAlt, label: 'Map' },
    ]
  }
]

const Sidebar = ({ isOpen, onClose, onElementSelect }) => {
  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      size="md"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Add Elements</DrawerHeader>

        <DrawerBody>
          <VStack spacing={6} align="stretch">
            {elementTypes.map((category) => (
              <Box key={category.category}>
                <Text
                  fontWeight="bold"
                  fontSize="sm"
                  color="gray.600"
                  mb={3}
                >
                  {category.category}
                </Text>
                <VStack spacing={2} align="stretch">
                  {category.items.map((item) => (
                    <Flex
                      key={item.type}
                      p={3}
                      cursor="pointer"
                      align="center"
                      rounded="md"
                      _hover={{
                        bg: 'gray.50',
                      }}
                      onClick={() => {
                        onElementSelect(item.type)
                        onClose()
                      }}
                    >
                      <Icon
                        as={item.icon}
                        mr={3}
                        color="gray.500"
                      />
                      <Text>{item.label}</Text>
                    </Flex>
                  ))}
                </VStack>
                <Divider mt={4} />
              </Box>
            ))}
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default Sidebar 