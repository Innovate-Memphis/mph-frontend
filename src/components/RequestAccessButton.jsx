import { Button } from "@chakra-ui/react";

import { REQUEST_ACCESS_FORM_URL } from "../constants";

const RequestAccessButton = () => {

    return <Button
        size="xl"
        backgroundColor={"#60c9b7"}
        width={250}>
        <a href={REQUEST_ACCESS_FORM_URL}>Request Access</a>
    </Button>
};

export default RequestAccessButton;
