import React from "react";
import { Badge, Box, IconButton, Menu, Portal, Text } from "@chakra-ui/react";
import { LuUser } from "react-icons/lu";

import { LogoutButton } from "../auth";
import { Tooltip } from "../ui/tooltip";

interface UserMenuProps {
    email: string;
    premium: boolean | false;
}

const UserMenu = ({ email, premium }: UserMenuProps) =>
    <Menu.Root id="help-menu" positioning={({ placement: 'bottom' })}>
        <Menu.Trigger asChild>
            <IconButton area-label="Open User" variant="solid" size="xs" colorPalette="black">
                <Tooltip content="User Menu" openDelay={300}>
                    <LuUser />
                </Tooltip>
            </IconButton>
        </Menu.Trigger>

        <Portal>
            <Menu.Positioner>
                <Menu.Content>
                    
                        <Menu.Item asChild value={email}>
                            {/* <Tooltip content={"Plan description and link to upgrade"} openDelay={300}> */}
                                <Box><Text>{email}</Text> <Badge colorPalette={ premium ? "green" : "blue"} size="sm">{ premium ? "Premium" : "Free"}</Badge></Box>
                            {/* </Tooltip> */}
                        </Menu.Item>
      
                    <Menu.Item value="logout">
                        <LogoutButton />
                    </Menu.Item>
                </Menu.Content>
            </Menu.Positioner>
        </Portal>
    </Menu.Root>

export default UserMenu;
