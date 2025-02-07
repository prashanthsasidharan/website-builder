import {
  Box,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  VStack,
  HStack,
  Text,
  Input,
  Select,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  IconButton,
} from '@chakra-ui/react'
import { FaPaintBrush, FaBorderStyle } from 'react-icons/fa'
import { useState } from 'react'

const ColumnStyler = ({ initialStyles = {}, onUpdate }) => {
  const [styles, setStyles] = useState({
    padding: initialStyles.padding || '1rem',
    backgroundColor: initialStyles.backgroundColor || 'transparent',
    borderWidth: initialStyles.borderWidth || '1px',
    borderStyle: initialStyles.borderStyle || 'solid',
    borderColor: initialStyles.borderColor || '#E2E8F0',
    borderRadius: initialStyles.borderRadius || '0.375rem',
    boxShadow: initialStyles.boxShadow || 'none',
    ...initialStyles
  })

  const handleStyleChange = (property, value) => {
    const newStyles = { ...styles, [property]: value }
    setStyles(newStyles)
    onUpdate(newStyles)
  }

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <IconButton
          icon={<FaPaintBrush />}
          size="sm"
          aria-label="Style Column"
          variant="ghost"
        />
      </PopoverTrigger>
      <PopoverContent width="300px">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Column Styles</PopoverHeader>
        <PopoverBody>
          <Tabs size="sm">
            <TabList>
              <Tab>Layout</Tab>
              <Tab>Background</Tab>
              <Tab>Border</Tab>
              <Tab>Effects</Tab>
            </TabList>

            <TabPanels>
              {/* Layout Tab */}
              <TabPanel>
                <VStack spacing={4} align="stretch">
                  <Box>
                    <Text fontSize="sm" mb={1}>Padding</Text>
                    <HStack>
                      <Input
                        size="sm"
                        value={styles.padding}
                        onChange={(e) => handleStyleChange('padding', e.target.value)}
                        placeholder="1rem"
                      />
                    </HStack>
                  </Box>
                </VStack>
              </TabPanel>

              {/* Background Tab */}
              <TabPanel>
                <VStack spacing={4} align="stretch">
                  <Box>
                    <Text fontSize="sm" mb={1}>Background Color</Text>
                    <HStack>
                      <Input
                        type="color"
                        size="sm"
                        value={styles.backgroundColor}
                        onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                      />
                      <Input
                        size="sm"
                        value={styles.backgroundColor}
                        onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                        placeholder="#ffffff"
                      />
                    </HStack>
                  </Box>
                </VStack>
              </TabPanel>

              {/* Border Tab */}
              <TabPanel>
                <VStack spacing={4} align="stretch">
                  <Box>
                    <Text fontSize="sm" mb={1}>Border Width</Text>
                    <Input
                      size="sm"
                      value={styles.borderWidth}
                      onChange={(e) => handleStyleChange('borderWidth', e.target.value)}
                      placeholder="1px"
                    />
                  </Box>
                  <Box>
                    <Text fontSize="sm" mb={1}>Border Style</Text>
                    <Select
                      size="sm"
                      value={styles.borderStyle}
                      onChange={(e) => handleStyleChange('borderStyle', e.target.value)}
                    >
                      <option value="none">None</option>
                      <option value="solid">Solid</option>
                      <option value="dashed">Dashed</option>
                      <option value="dotted">Dotted</option>
                    </Select>
                  </Box>
                  <Box>
                    <Text fontSize="sm" mb={1}>Border Color</Text>
                    <HStack>
                      <Input
                        type="color"
                        size="sm"
                        value={styles.borderColor}
                        onChange={(e) => handleStyleChange('borderColor', e.target.value)}
                      />
                      <Input
                        size="sm"
                        value={styles.borderColor}
                        onChange={(e) => handleStyleChange('borderColor', e.target.value)}
                        placeholder="#E2E8F0"
                      />
                    </HStack>
                  </Box>
                  <Box>
                    <Text fontSize="sm" mb={1}>Border Radius</Text>
                    <Input
                      size="sm"
                      value={styles.borderRadius}
                      onChange={(e) => handleStyleChange('borderRadius', e.target.value)}
                      placeholder="0.375rem"
                    />
                  </Box>
                </VStack>
              </TabPanel>

              {/* Effects Tab */}
              <TabPanel>
                <VStack spacing={4} align="stretch">
                  <Box>
                    <Text fontSize="sm" mb={1}>Box Shadow</Text>
                    <Select
                      size="sm"
                      value={styles.boxShadow}
                      onChange={(e) => handleStyleChange('boxShadow', e.target.value)}
                    >
                      <option value="none">None</option>
                      <option value="sm">Small</option>
                      <option value="md">Medium</option>
                      <option value="lg">Large</option>
                      <option value="xl">Extra Large</option>
                    </Select>
                  </Box>
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default ColumnStyler 