import { Flex, FormControl, FormLabel, Input, Checkbox, Stack, Link, Text, Button, Box } from "@chakra-ui/react"
import {  useReducer, useState,useContext } from "react"

import { Navigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContextProvider"
const initailState = {
    name: "",
    email: "",
    password: ""
}
const reducer = (state, action) => {
    switch (action.type) {
        case "name": {
            return {
                ...state,
                name: action.payload
            }
        }
        case "password": {
            return {
                ...state,
                password: action.payload
            }
        }
        case "email": {
            return {
                ...state,
                email: action.payload
            }
        }
        default: {
            throw new Error(`Input action type is invalid`)
        }
    }
}
function CreateAccount({fetchData}) {
    const [state, dispatch] = useReducer(reducer, initailState)
    const { name, email, password } = state
    const [almost ,setAlmost]=useState(false)
    const { setName } = useContext(AuthContext)
    
    const handleSubmit = (e) => {
        e.preventDefault()
        setName(name)
       // setForm(!createForm)
       setAlmost(true)
     // login()
        console.log(state)
        fetch(`https://cute-puce-jackrabbit-robe.cyclic.app/user`,{
          method:"POST",
          headers:{"Content-Type": "application/json"},
          body:JSON.stringify({...state,point:`${Math.ceil(Math.random()*200)} XP` ,img:Math.ceil(Math.random()*20),avatar:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-1lVxzjly063iGjZqNn5Uacq9KeHpillloNZrSKUL1Q&usqp=CAU&ec=48600112"})
        })
        .then((re)=>re.json())
        .then(()=>{
        console.log(res.token)
            fetchData()
           
        })
        .catch((err)=>{
           
            console.log(err)
        })
    }
    if (almost) {
        console.log("kin")

        return <Navigate to ="/Almost" />
    }
    return (
        <>
            <Flex   //minH={'100vh'}
                align={'center'}
                justify={'center'}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Text fontSize={'md'} color={'teal.500'}>
                            Looking forward to learn together
                        </Text>
                    </Stack>
                    <Box
                        rounded={'lg'}

                        boxShadow={'lg'}
                        p={8}>
                        <form action="" onSubmit={handleSubmit}>
                            <Stack spacing={4}>
                                <FormControl id="fullname">
                                    <FormLabel>Full Name</FormLabel>
                                    <Input type="text" value={name} onChange={(e) => dispatch({ type: "name", payload: e.target.value })} />
                                </FormControl>
                                <FormControl id="email">
                                    <FormLabel>Email address</FormLabel>
                                    <Input type="email" value={email} onChange={(e) => dispatch({ type: "email", payload: e.target.value })} />
                                </FormControl>
                                <FormControl id="password">
                                    <FormLabel>Password</FormLabel>
                                    <Input type="password" value={password} onChange={(e) => dispatch({ type: "password", payload: e.target.value })} />
                                </FormControl>
                                <Stack spacing={10}>
                                    <Stack
                                        direction={{ base: 'column', sm: 'row' }}
                                        align={'start'}
                                        justify={'space-between'}>
                                        <Checkbox>Remember me</Checkbox>
                                        <Link color={'blue.400'}>Forgot password?</Link>
                                    </Stack>
                                    <Button
                                        type="submit"
                                        bg={'blue.400'}
                                        color={'white'}
                                        _hover={{
                                            bg: 'blue.500',
                                        }}>
                                        submit
                                    </Button>
                                </Stack>
                            </Stack>
                        </form>

                    </Box>
                </Stack>
            </Flex>

        </>
    )

}
export default CreateAccount;