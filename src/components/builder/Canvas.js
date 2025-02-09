import { useState } from 'react'
import {
  Box,
  Flex,
  Grid,
  IconButton,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { FaPlus, FaColumns, FaTrash, FaCopy, FaCog, FaGripVertical } from 'react-icons/fa'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { TextElement, ImageElement, ButtonElement } from './BuilderElements'
import ColumnLayout from './ColumnLayout'
import Sidebar from './Sidebar'

const Canvas = ({ sections = [], setSections }) => {
  const [selectedSection, setSelectedSection] = useState(null)
  const [selectedColumnId, setSelectedColumnId] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const addSection = (e) => {
    if (e) {
      e.stopPropagation() // Prevent event bubbling
    }
    
    const newSection = {
      id: Date.now(),
      type: 'section',
      columns: [
        {
          id: `column-${Date.now()}`,
          elements: []
        }
      ]
    }
    setSections([...sections, newSection])
  }

  const handleElementSelect = (elementType) => {
    const newElement = {
      id: `element-${Date.now()}`,
      type: elementType,
      content: '', // Initialize with empty content
    }

    setSections(sections.map(section => ({
      ...section,
      columns: section.columns.map(column => {
        if (column.id === selectedColumnId) {
          return {
            ...column,
            elements: [...column.elements, newElement]
          }
        }
        return column
      })
    })))
  }

  const updateElement = (columnId, elementId, newContent) => {
    setSections(sections.map(section => ({
      ...section,
      columns: section.columns.map(column => {
        if (column.id === columnId) {
          return {
            ...column,
            elements: column.elements.map(element => {
              if (element.id === elementId) {
                return {
                  ...element,
                  content: newContent // Store content directly in the content key
                }
              }
              return element
            })
          }
        }
        return column
      })
    })))
  }

  const handleLayoutChange = (sectionId, newLayout) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        const newColumns = newLayout.map((span, index) => {
          const existingColumn = section.columns[index] || {
            id: `column-${Date.now()}-${index}`,
            elements: []
          }
          return {
            ...existingColumn,
            span
          }
        })

        if (newColumns.length < section.columns.length) {
          const extraElements = section.columns
            .slice(newColumns.length)
            .flatMap(col => col.elements)
          
          if (extraElements.length > 0 && newColumns.length > 0) {
            newColumns[newColumns.length - 1].elements.push(...extraElements)
          }
        }

        return {
          ...section,
          columns: newColumns
        }
      }
      return section
    }))
  }

  const handleAddElement = (columnId) => {
    setSelectedColumnId(columnId)
    onOpen()
  }

  const handleDragEnd = (result) => {
    const { source, destination, type } = result

    // Dropped outside the list
    if (!destination) {
      return
    }

    // Handle section reordering
    if (type === 'section') {
      const newSections = Array.from(sections)
      const [removed] = newSections.splice(source.index, 1)
      newSections.splice(destination.index, 0, removed)
      setSections(newSections)
      return
    }

    // Handle element reordering within and between columns
    if (type === 'element') {
      const sourceColumnId = source.droppableId
      const destinationColumnId = destination.droppableId

      const newSections = sections.map(section => {
        const newColumns = section.columns.map(column => {
          if (column.id === sourceColumnId) {
            const newElements = Array.from(column.elements)
            const [removed] = newElements.splice(source.index, 1)
            
            if (column.id === destinationColumnId) {
              newElements.splice(destination.index, 0, removed)
            }
            
            return {
              ...column,
              elements: newElements
            }
          }
          
          if (column.id === destinationColumnId && sourceColumnId !== destinationColumnId) {
            const newElements = Array.from(column.elements)
            const elementToAdd = sections
              .flatMap(s => s.columns)
              .find(c => c.id === sourceColumnId)
              ?.elements[source.index]
            
            newElements.splice(destination.index, 0, elementToAdd)
            
            return {
              ...column,
              elements: newElements
            }
          }
          
          return column
        })

        return {
          ...section,
          columns: newColumns
        }
      })

      setSections(newSections)
    }
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Flex
        flex="1"
        direction="column"
        bg="gray.50"
        minH="calc(100vh - 60px)"
        p={8}
        overflowY="auto"
      >
        <Box
          maxW="1200px"
          w="full"
          mx="auto"
          bg="white"
          minH="100vh"
          boxShadow="sm"
          position="relative"
        >
          {sections.length === 0 ? (
            <Flex
              justify="center"
              align="center"
              flexDirection="column"
              minH="200px"
              border="2px dashed"
              borderColor="gray.200"
              m={4}
              rounded="md"
            >
              <Text fontSize="lg" fontWeight="semibold">No sections yet. Add a section to get started.</Text>
              <IconButton
                icon={<FaPlus />}
                onClick={addSection}
                size="lg"
                variant="ghost"
                aria-label="Add section"
              />
            </Flex>
          ) : (
            <Droppable droppableId="sections" type="section">
              {(provided) => (
                <Box
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {sections.map((section, index) => (
                    <Draggable
                      key={section.id}
                      draggableId={section.id.toString()}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <Section
                            section={section}
                            isSelected={selectedSection === section.id}
                            onClick={() => setSelectedSection(section.id)}
                            onDelete={(id) => {
                              setSections(sections.filter(s => s.id !== id))
                            }}
                            onAddElement={handleAddElement}
                            onUpdateElement={updateElement}
                            onLayoutChange={handleLayoutChange}
                            dragHandleProps={provided.dragHandleProps}
                            isDragging={snapshot.isDragging}
                          />
                        </Box>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          )}
          
          {sections.length !== 0 ? (
            <Flex
              justify="center"
              py={4}
              borderTop="2px dashed"
              borderColor="gray.200"
              onClick={(e) => e.stopPropagation()}
            >
              <IconButton
                icon={<FaPlus />}
                onClick={addSection}
                size="md"
                variant="ghost"
                aria-label="Add new section"
              />
            </Flex>
          ) : null}
        </Box>
      </Flex>

      <Sidebar
        isOpen={isOpen}
        onClose={onClose}
        onElementSelect={handleElementSelect}
      />
    </DragDropContext>
  )
}

const Section = ({
  section,
  isSelected,
  onClick,
  onDelete,
  onAddElement,
  onUpdateElement,
  onLayoutChange,
  dragHandleProps,
  isDragging
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const renderElement = (element, columnId, provided, snapshot) => {
    const props = {
      ...element.content,
      onUpdate: (newContent) => onUpdateElement(columnId, element.id, newContent)
    }

    return (
      <Box
        position="relative"
        mb={4}
        opacity={snapshot.isDragging ? 0.6 : 1}
        bg="white"
        p={4}
        rounded="md"
        shadow="sm"
        _hover={{ shadow: "md" }}
      >
        {/* Drag Handle */}
        <Flex
          {...provided.dragHandleProps}
          position="absolute"
          left={-8}
          top="50%"
          transform="translateY(-50%)"
          cursor="grab"
          color="gray.400"
          _hover={{ color: "gray.600" }}
          zIndex={2}
          alignItems="center"
        >
          <FaGripVertical />
        </Flex>

        {/* Element Content */}
        <Box pl={2}>
          {(() => {
            switch (element.type) {
              case 'text':
                return <TextElement {...props} />
              case 'image':
                return <ImageElement {...props} />
              case 'button':
                return <ButtonElement {...props} />
              default:
                return null
            }
          })()}
        </Box>
      </Box>
    )
  }

  return (
    <Box
      position="relative"
      border="2px"
      borderColor={isSelected ? "blue.500" : "transparent"}
      _hover={{ borderColor: "blue.200" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      mb={4}
      opacity={isDragging ? 0.6 : 1}
      bg="white"
    >
      {/* Section Drag Handle */}
      <Flex
        {...dragHandleProps}
        position="absolute"
        left={-8}
        top="50%"
        transform="translateY(-50%)"
        cursor="grab"
        color="gray.400"
        _hover={{ color: "gray.600" }}
        zIndex={2}
      >
        <FaGripVertical />
      </Flex>

      <Grid
        templateColumns={section.columns.map(col => `${col.span}fr`).join(' ')}
        gap={4}
        p={4}
        minH="100px"
      >
        {section.columns.map((column) => (
          <Droppable
            key={column.id}
            droppableId={column.id}
            type="element"
          >
            {(provided, snapshot) => (
              <Box
                ref={provided.innerRef}
                {...provided.droppableProps}
                bg={snapshot.isDraggingOver ? "blue.50" : "gray.50"}
                p={4}
                rounded="md"
                transition="background-color 0.2s"
                position="relative"
              >
                {column.elements.map((element, index) => (
                  <Draggable
                    key={element.id}
                    draggableId={element.id.toString()}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        {renderElement(element, column.id, provided, snapshot)}
                      </Box>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                <IconButton
                  icon={<FaPlus />}
                  variant="ghost"
                  size="sm"
                  w="full"
                  mt={2}
                  onClick={() => onAddElement(column.id)}
                >
                  Add Element
                </IconButton>
              </Box>
            )}
          </Droppable>
        ))}
      </Grid>

      {/* Section Controls */}
      {(isHovered || isSelected) && (
        <Flex
          position="absolute"
          right="-10"
          top="50%"
          transform="translateY(-50%)"
          direction="column"
          gap={2}
          zIndex={2}
        >
          <ColumnLayout
            onSelectLayout={(layout) => onLayoutChange(section.id, layout)}
          />
          <IconButton
            icon={<FaTrash />}
            size="sm"
            aria-label="Delete"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation()
              onDelete(section.id)
            }}
          />
        </Flex>
      )}
    </Box>
  )
}

export default Canvas
