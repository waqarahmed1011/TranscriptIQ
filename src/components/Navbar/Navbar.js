import { Box, Stack, Button } from "@mui/material";
import { shadows } from "@mui/system";
import Image from "next/image";
import { TextGenerateEffect } from "../ui/textgenerate_effect";
import GitHubIcon from "@mui/icons-material/GitHub";
import Link from "next/link";
export default function Navbar() {
  return (
    <Stack
      width={"100%"}
      height={"60px"}
      direction={"row"}
      gap={2}
      padding={1}
      fontSize={15}
    >
      <Stack
        height={"40px"}
        width={"10%"}
        bgcolor={"#000000"}
        borderRadius={2}
        justifyContent={"center"}
        alignItems={"center"}
        direction={"row"}
        gap={1}
        paddingX={1}
      >
        <Stack width={"20%"}>
          <Image src={"/logo2.png"} alt="logo" width={30} height={30} />
        </Stack>
        <Stack
          height={"100%"}
          width={"80%"}
          color={"white"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <TextGenerateEffect words={"HeadStarter"} />
        </Stack>
      </Stack>
      <Stack
        height={"40px"}
        width={"69%"}
        bgcolor={"#000000"}
        borderRadius={2}
        color={"white"}
        direction={"row"}
        gap={2}
        justifyContent={""}
        alignItems={"center"}
        paddingLeft={4}
      >
        <Stack sx={{"&:hover":{backgroundColor:'#F5F5F5',color:'black'}}} height={'80%'} width={'10%'} justifyContent={'center'} alignItems={'center'} borderRadius={2}>Pricing</Stack>
        <Stack sx={{"&:hover":{backgroundColor:'#F5F5F5',color:'black'}}} height={'80%'} width={'10%'} justifyContent={'center'} alignItems={'center'} borderRadius={2}>Features</Stack>
        <Stack sx={{"&:hover":{backgroundColor:'#F5F5F5',color:'black'}}} height={'80%'} width={'10%'} justifyContent={'center'} alignItems={'center'} borderRadius={2}>Forum</Stack>
        <Stack sx={{"&:hover":{backgroundColor:'#F5F5F5',color:'black'}}} height={'80%'} width={'10%'} justifyContent={'center'} alignItems={'center'} borderRadius={2}>Docs</Stack>
      </Stack>
      <Stack
        height={"40px"}
        width={"7%"}
        bgcolor={"#5577ED"}
        borderRadius={2}
        justifyContent={"center"}
        alignItems={"center"}
        color={"white"}
        sx={{
          "&:hover" :{
            backgroundColor:"#2255E4"
          }
        }}
      >
        <Link href={"/"}>Discord</Link>
      </Stack>
      <Stack
        height={"40px"}
        width={"7%"}
        bgcolor={"#000000"}
        borderRadius={2}
        color={"white"}
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={1}
        sx={{
          "&:hover": {
            backgroundColor: "white",
            color: "black",
          },
        }}
      >
        <GitHubIcon />
        <Stack
          sx={{
            "&:hover": {
              backgroundColor: "white",
              color: "black",
            },
          }}
        >
          <Link href={"/"}>Github</Link>
        </Stack>
      </Stack>
      <Stack
        height={"40px"}
        width={"7%"}
        bgcolor={"#000000"}
        borderRadius={2}
        justifyContent={"center"}
        alignItems={"center"}
        color={"white"}
        sx={{
          "&:hover": {
            backgroundColor: "white",
            color: "black",
          },
        }}
      >
        <Link href="/chat">Chat</Link>
      </Stack>
      <Stack
        height={"40px"}
        width={"7%"}
        bgcolor={"#000000"}
        borderRadius={2}
        justifyContent={"center"}
        alignItems={"center"}
        color={"white"}
        sx={{
          "&:hover": {
            backgroundColor: "white",
            color: "black",
          },
        }}
      >
        <Link href="/">Home</Link>
      </Stack>
    </Stack>
  );
}