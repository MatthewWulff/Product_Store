import { useProductStore } from "@/store/products"
import {
  Container,
  useColorModeValue,
  VStack,
  Heading,
  Box,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react"
import { useState } from "react"
import React from "react"

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  })
  
  const toast = useToast()
  
  const {createProduct} = useProductStore()


  const handleAddProduct= async () =>{
    const {success, message} = await createProduct(newProduct)
if (!success) {
  toast({
    title: "Error",
    description: message || "Something went wrong.",
    status: "error",
    isClosable: true,
  })
} else {
  toast({
    title: "Success",
    description: message || "Product added successfully!",
    status: "success",
    isClosable: true,
  })
}
setNewProduct({name: "", price: "" , image: ""})
    
  }

  
  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2x1"} textAlign={"center"} mb={8}>
          Create New Product
        </Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              placeholder="Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <Input
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
            <Button colorScheme = "blue" onClick={handleAddProduct} w="full"></Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default CreatePage
