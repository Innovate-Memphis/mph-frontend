import { useState } from "react";
import { Alert, CloseButton } from "@chakra-ui/react"
import { ALERT_MESSAGE } from "./../constants";


export const AlertMessage = () => {
    const [closed, setClosed] = useState(false);
    if (ALERT_MESSAGE.length < 1 || closed) {
        return;
    }

    return (
        <Alert.Root
            size="sm"
            status="warning"
            borderStartWidth="3px"
            borderStartColor="colorPalette.warning"
            alignItems="center"
            paddingBottom="0"
            paddingTop="0"
        >
            <Alert.Indicator />
            <Alert.Content>
                <Alert.Title textStyle="sm">
                    {ALERT_MESSAGE}
                </Alert.Title>
            </Alert.Content>
            <CloseButton pos="relative" top="+1" insetEnd="-2" onClick={() => setClosed(true)} />
        </Alert.Root>
    )
}

