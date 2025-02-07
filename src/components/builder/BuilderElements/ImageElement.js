import { 
  Box, 
  Image, 
  Input, 
  IconButton, 
  Flex, 
  VStack,
  Text,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  FormControl,
  FormLabel,
} from '@chakra-ui/react'
import { useState, useRef } from 'react'
import { FaEdit, FaCheck, FaTimes, FaUpload, FaLink } from 'react-icons/fa'

const ImageElement = ({ src, alt, onUpdate }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [imageUrl, setImageUrl] = useState(src || '')
  const [imageAlt, setImageAlt] = useState(alt || '')
  const [uploadedImage, setUploadedImage] = useState(null)
  const fileInputRef = useRef()

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUploadedImage(reader.result)
        setImageUrl(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    onUpdate({ 
      src: imageUrl, 
      alt: imageAlt 
    })
    onClose()
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUploadedImage(reader.result)
        setImageUrl(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Box position="relative" p={2} _hover={{ bg: 'gray.50' }}>
      {imageUrl ? (
        <Box position="relative">
          <Image
            src={imageUrl}
            alt={imageAlt}
            w="full"
            objectFit="cover"
          />
          <IconButton
            icon={<FaEdit />}
            size="sm"
            position="absolute"
            top={2}
            right={2}
            onClick={onOpen}
            colorScheme="blue"
          />
        </Box>
      ) : (
        <Box
          onClick={onOpen}
          cursor="pointer"
          border="2px dashed"
          borderColor="gray.300"
          borderRadius="md"
          p={8}
          textAlign="center"
          _hover={{ borderColor: 'blue.500' }}
        >
          <VStack spacing={2}>
            <FaUpload size="24px" color="gray.500" />
            <Text>Click to add image</Text>
          </VStack>
        </Box>
      )}

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Image</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs>
              <TabList>
                <Tab>Upload</Tab>
                <Tab>URL</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <VStack spacing={4}>
                    <Box
                      w="full"
                      h="200px"
                      border="2px dashed"
                      borderColor="gray.300"
                      borderRadius="md"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      cursor="pointer"
                      _hover={{ borderColor: 'blue.500' }}
                    >
                      {uploadedImage ? (
                        <Image 
                          src={uploadedImage} 
                          alt="Uploaded preview" 
                          maxH="full"
                          objectFit="contain"
                        />
                      ) : (
                        <VStack spacing={2}>
                          <FaUpload size="24px" />
                          <Text>Drag and drop or click to upload</Text>
                        </VStack>
                      )}
                    </Box>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      style={{ display: 'none' }}
                    />
                  </VStack>
                </TabPanel>
                <TabPanel>
                  <VStack spacing={4}>
                    <FormControl>
                      <FormLabel>Image URL</FormLabel>
                      <Input
                        placeholder="https://example.com/image.jpg"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                      />
                    </FormControl>
                    {imageUrl && (
                      <Image
                        src={imageUrl}
                        alt="URL preview"
                        maxH="200px"
                        objectFit="contain"
                      />
                    )}
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>

            <FormControl mt={4}>
              <FormLabel>Alt Text</FormLabel>
              <Input
                placeholder="Image description"
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleSave}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default ImageElement
