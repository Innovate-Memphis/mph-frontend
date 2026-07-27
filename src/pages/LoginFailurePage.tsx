import React from "react";
import { Stack } from "@chakra-ui/react";

import { RequestAccessButton } from "../components/auth";

import { FAQ_LINK, FAQ_LINK_TEXT, LOGIN_FAILURE_MESSAGE } from "../constants";

const LoginFailurePage = () =>
    <Stack height="100vh" align="center" justify="center" padding="10" gap="5">
        <div>
            {LOGIN_FAILURE_MESSAGE}
            <a style={{ "color": "blue" }} href={FAQ_LINK}>{FAQ_LINK_TEXT}</a>
        </div>
        <RequestAccessButton />
    </Stack>

export default LoginFailurePage;