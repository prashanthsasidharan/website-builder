import {
  Box,
  Flex,
  IconButton,
  ButtonGroup,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tooltip,
  useDisclosure,
  Toast,
  useToast
} from '@chakra-ui/react'
import {
  FaArrowLeft,
  FaDesktop,
  FaMobileAlt,
  FaPlug,
  FaCog,
  FaLink,
  FaEye,
  FaSave,
  FaUndo,
  FaRedo,
  FaBars,
  FaColumns,
  FaCode
} from 'react-icons/fa'
import PreviewModal from '../preview/Preview'

const Navbar = ({ sections }) => {
  const {
    isOpen: isPreviewOpen,
    onOpen: onPreviewOpen,
    onClose: onPreviewClose
  } = useDisclosure()

  const toast = useToast();

  const handleSave = () => {
    localStorage.setItem('sections', JSON.stringify(sections));
    toast({
      title: 'Website builder sections saved!!!',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: "top-right",
      variant: "left-accent",
    })
  }

  const handlePreview = () => {
    console.log('Preview clicked, sections:', sections)
    onPreviewOpen()
  }

  return (
    <>
      <Flex 
        w="full" 
        h="60px" 
        bg="white" 
        borderBottom="1px" 
        borderColor="gray.200"
        px={4}
        alignItems="center"
        justifyContent="space-between"
      >
        {/* Left Section */}
        <Flex gap={2}>
          <Tooltip label="Back">
            <IconButton
              variant="ghost"
              icon={<FaArrowLeft />}
              aria-label="Back"
              size="sm"
            />
          </Tooltip>

          <ButtonGroup size="sm" isAttached variant="ghost">
            <Tooltip label="Desktop View">
              <IconButton
                icon={<FaDesktop />}
                aria-label="Desktop View"
                id="page-creator-desktop"
              />
            </Tooltip>
            <Tooltip label="Mobile View">
              <IconButton
                icon={<FaMobileAlt />}
                aria-label="Mobile View"
                id="page-creator-mobile"
              />
            </Tooltip>
          </ButtonGroup>

          <ButtonGroup size="sm" variant="ghost">
            <Tooltip label="Apps">
              <IconButton
                icon={<FaPlug />}
                aria-label="Apps"
              />
            </Tooltip>

            <Menu>
              <Tooltip label="Settings">
                <MenuButton as={IconButton} icon={<FaCog />} aria-label="Settings">
                </MenuButton>
              </Tooltip>
              <MenuList>
                <MenuItem>Integrations</MenuItem>
                <MenuItem>SEO Meta Data</MenuItem>
                <MenuItem>Tracking Code</MenuItem>
                <MenuItem>Custom CSS</MenuItem>
                <MenuItem>Background</MenuItem>
                <MenuItem>Typography</MenuItem>
                <MenuItem>General</MenuItem>
              </MenuList>
            </Menu>

            <Tooltip label="Undo">
              <IconButton
                icon={<FaUndo />}
                aria-label="Undo"
              />
            </Tooltip>
            <Tooltip label="Redo">
              <IconButton
                icon={<FaRedo />}
                aria-label="Redo"
                isDisabled
              />
            </Tooltip>
          </ButtonGroup>
        </Flex>

        {/* Right Section */}
        <Flex gap={2}>
          {/* <ButtonGroup size="sm" variant="ghost">
            <Menu>
              <Tooltip label="Sections">
                <MenuButton as={IconButton} icon={<FaBars />} aria-label="Sections">
                  Sections
                </MenuButton>
              </Tooltip>
              <MenuList>
                <MenuItem>Add Section</MenuItem>
                <MenuItem>Manage Sections</MenuItem>
              </MenuList>
            </Menu>

            <Menu>
              <Tooltip label="Rows">
                <MenuButton as={IconButton} icon={<FaBars />} aria-label="Rows">
                  Rows
                </MenuButton>
              </Tooltip>
              <MenuList>
                <MenuItem>Add Row</MenuItem>
                <MenuItem>Manage Rows</MenuItem>
              </MenuList>
            </Menu>

            <Tooltip label="Columns">
              <IconButton
                icon={<FaColumns />}
                aria-label="Columns"
              >
                Columns
              </IconButton>
            </Tooltip>

            <Menu>
              <Tooltip label="Elements">
                <MenuButton as={IconButton} icon={<FaCode />} aria-label="Elements">
                  Elements
                </MenuButton>
              </Tooltip>
              <MenuList>
                <MenuItem>Add Element</MenuItem>
                <MenuItem>Manage Elements</MenuItem>
              </MenuList>
            </Menu>
          </ButtonGroup> */}

          <ButtonGroup size="sm" variant="ghost">
            <Tooltip label="Preview">
              <IconButton
                icon={<FaEye />}
                aria-label="Preview"
                onClick={handlePreview}
              />
            </Tooltip>
            <Tooltip label="Save">
              <IconButton
                icon={<FaSave />}
                aria-label="Save"
                colorScheme="blue"
                onClick={handleSave}
              />
            </Tooltip>
          </ButtonGroup>
        </Flex>
      </Flex>

      {console.log('PreviewModal props:', { isOpen: isPreviewOpen, sections })}
      <PreviewModal
        sections={sections}
        isOpen={isPreviewOpen}
        onClose={onPreviewClose}
      />
    </>
  )
}

export default Navbar