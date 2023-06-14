import { ReactNode } from "react";
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Image,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

// const NavLink = ({ children }: { children: ReactNode }) => (
//   <Link
//     px={2}
//     py={1}
//     rounded={'md'}
//     _hover={{
//       textDecoration: 'none',
//       bg: useColorModeValue('gray.200', 'gray.700'),
//     }}
//     href={'#'}>
//     {children}
//   </Link>
// );

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <Image
              borderRadius="full"
              boxSize="70px"
              src="data:image/png;base64,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"
              alt="My Todo"
            />{" "}
          </Box>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  {/* <Avatar
                    size={"sm"}
                    src={"https://avatars.dicebear.com/api/male/username.svg"}
                  /> */}
                </MenuButton>
                {/* <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={'https://avatars.dicebear.com/api/male/username.svg'}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>Username</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>Your Servers</MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem>Logout</MenuItem>
                </MenuList> */}
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
