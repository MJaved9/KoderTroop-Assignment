import React, { useState, useEffect } from 'react';
import {
  VStack,
  Heading,
  Input,
  Button,
  StackDivider,
  Box,
  Text,
  Grid,
  GridItem,
  IconButton,
  useToast,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, SearchIcon } from '@chakra-ui/icons';
import axios from 'axios';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: '', discriptions: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const toast = useToast();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('https://drab-puce-jellyfish-slip.cyclic.app/todo');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const createTodo = async () => {
    try {
      await axios.post('https://drab-puce-jellyfish-slip.cyclic.app/todo/create', newTodo);
      fetchTodos();
      setNewTodo({ title: '', discriptions: '' });
      toast({
        title: 'Todo created.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error creating todo:', error);
      toast({
        title: 'An error occurred.',
        discriptions: 'Failed to create todo.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const updateTodo = async (id, updatedTodo) => {
    try {
      await axios.patch(`https://drab-puce-jellyfish-slip.cyclic.app/todo/edit/${id}`, updatedTodo);
      fetchTodos();
      toast({
        title: 'Todo updated.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error updating todo:', error);
      toast({
        title: 'An error occurred.',
        discriptions: 'Failed to update todo.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const deleteTodo = async (_id) => {
    console.log(_id)
    try {
      await axios.delete(`https://drab-puce-jellyfish-slip.cyclic.app/todo/delete/${_id}`);
      fetchTodos();
      toast({
        title: 'Todo deleted.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error deleting todo:', error);
      toast({
        title: 'An error occurred.',
        discriptions: 'Failed to delete todo.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };


  const handleEdit = (id) => {
    const updatedTodo = prompt('Enter updated title:');
    if (updatedTodo) {
      updateTodo(id, { title: updatedTodo });
    }
  };

  const handleDelete = (_id) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      deleteTodo(_id);
    }
  };

  return (
    <VStack spacing={4} align="stretch" p={4}>

      {/* Create Todo */}
      <VStack
        spacing={4}
       padding={"10px 200px 10px 200px"}
        divider={<StackDivider borderColor="gray.200" />}
        align="stretch"
      >
        <Heading as="h2" size="lg" mb={4}>
          Create Todo
        </Heading>
        <Input
          placeholder="Title"
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
        />
        <Input
          placeholder="discriptions"
          value={newTodo.discriptions}
          onChange={(e) => setNewTodo({ ...newTodo, discriptions: e.target.value })}
        />
        <Button colorScheme="blue" onClick={createTodo}>
          Create
        </Button>
      </VStack>

      {/* Search */}
      <Input
        placeholder="Search By Title"
        value={searchTerm}
        onChange={(e)=>setSearchTerm(e.target.value)}
        w="50%"
        mx="auto"
      />

      {/* List of Todos */}
      <VStack
        spacing={4}
        divider={<StackDivider borderColor="gray.200" />}
        align="stretch"
        padding={"10px 150px 10px 150px"}
        
      >
        <Heading as="h2" size="lg" mb={4}>
          Todos
        </Heading>
        {todos.length === 0 ? (
          <Text>No todos found.</Text>
        ) : (
          todos.filter((value)=>{
            if(searchTerm===""){
              return value
            }
            else if(
              value.title.toLowerCase().includes(searchTerm.toLocaleLowerCase())
            ){
              return value
            }
          })
          
          .map((todo) => (
            
            <Box key={todo._id}  borderWidth="2px" borderRadius="md">
              <Grid templateColumns="1fr auto" >
                <GridItem>
                  <Text fontSize="xl" fontWeight="bold">
                    {todo.title}
                  </Text>
                  <Text>{todo.discriptions}</Text>
                </GridItem>
                <GridItem textAlign={"center"} alignItems={"center"}>
                  <IconButton
                    icon={<EditIcon color={"yellow"} />}
                    aria-label="Edit Todo"
                    onClick={() => handleEdit(todo._id)}
                    bg="black"
                  />
                  &nbsp;&nbsp;
                  <IconButton
                    icon={<DeleteIcon color="red" />}
                    aria-label="Delete Todo"
                    bg="black"
                    onClick={() => handleDelete(todo._id)}
                  />
                </GridItem>
              </Grid>
            </Box>
          ))
        )}
      </VStack>
    </VStack>
  );
};

export default Todo;