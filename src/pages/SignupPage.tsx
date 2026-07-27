import React from "react";
import { Stack } from "@chakra-ui/react";

import { MPHLogo } from "../components/helpers";
import { SignupButton } from "../components/auth";

const SignupPage = () =>
    <Stack height="100vh" align="center" justify="center" gap="5">
        <MPHLogo width="250px" />
        <SignupButton />
    </Stack>

export default SignupPage;
