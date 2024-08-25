import { Box, Stack } from "@mui/material";
import Image from "next/image";
import { TextGenerateEffect } from "../ui/textgenerate_effect";
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
      justifyContent="space-between"
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
          <TextGenerateEffect words={"SalesTranscriptAI"} />
        </Stack>
      </Stack>
      <Stack
        direction="row"
        height={"40px"}
        gap={2}
        alignItems={"center"}
      >
        <Stack
          height={"100%"}
          width={"100px"}
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
        <Stack
          height={"100%"}
          width={"100px"}
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
          <Link href="/chat">Get Started</Link>
        </Stack>
      </Stack>
    </Stack>
  );
}
