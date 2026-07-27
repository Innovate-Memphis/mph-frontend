import React from "react";
import { Stack } from "@chakra-ui/react";

import { MPHLogo } from "../components/helpers";
import { LoginButton, RequestAccessButton } from "../components/auth";
import { FAQ_LINK, FAQ_LINK_TEXT } from "../constants";

const LoginPage = () =>
      <Stack height="100vh" align="center" justify="center" gap="5">
        <MPHLogo width="250px" />
        <LoginButton />
        <RequestAccessButton />
        <span>Need help? Please visit our <a style={{"color": "blue"}} href={FAQ_LINK}>{FAQ_LINK_TEXT}</a></span>
      </Stack>

export default LoginPage;
