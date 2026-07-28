import React from "react";
import {
    Box,
    HStack,
    Link,
    Text,
} from "@chakra-ui/react";

import { DONATE_LINK } from "../../constants";

interface FooterProps {
    dataYear: number | null;
}

const Footer = ({ dataYear }: FooterProps) =>
    <Box padding="2">
        <HStack justify="space-between">
            {dataYear && <Text textStyle="sm">Currently viewing data for {dataYear}</Text>}
            <Text textStyle="sm">Like what you see? <Link colorPalette="green" variant="underline" href={DONATE_LINK} target="_blank">Help sustain our work!</Link></Text>
        </HStack>
    </Box>

export default Footer;
