import React from "react";
import {
    Center,
    Spinner,
    Text,
    VStack,
} from "@chakra-ui/react";

const LoadingMap = () =>
    <Center zIndex={0} position="absolute" inset={0}>
        <VStack gap={3}>
            <Spinner color="fg.subtle" />
            <Text fontSize="sm" color="fg.subtle">
                Loading map&hellip;
            </Text>
        </VStack>
    </Center>

export default LoadingMap;
