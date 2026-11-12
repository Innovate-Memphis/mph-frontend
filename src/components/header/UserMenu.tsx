import React from "react";
import { Badge, Box, IconButton, Link, Menu, Portal, Text } from "@chakra-ui/react";
import { LuUser } from "react-icons/lu";

import { LogoutButton } from "../auth";
import { Tooltip } from "../ui/tooltip";
import { PREMIUM_PLAN_LINK } from "../../constants";

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
                        <Box>
                            <Text>{email}</Text>{" "}
                            <Link href={PREMIUM_PLAN_LINK} target="_blank">
                                <Tooltip content={"Click here to learn about our premium plan"} openDelay={300} >
                                    <Badge colorPalette={premium ? "green" : "blue"} size="sm">
                                        {premium ? "Premium" : "Free"}
                                    </Badge>
                                </Tooltip>
                            </Link>
                        </Box>
                    </Menu.Item>
                    <Menu.Item value="logout">
                        <LogoutButton />
                    </Menu.Item>
                </Menu.Content>
            </Menu.Positioner>
        </Portal>
    </Menu.Root >

export default UserMenu;
