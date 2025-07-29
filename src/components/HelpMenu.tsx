import { IconButton, Menu, Portal } from "@chakra-ui/react";
import { LuCircleHelp } from "react-icons/lu";

import { Tooltip } from "./ui/tooltip";

import { HELP_MENU_LINKS } from "../constants";

export const HelpMenu = ({ onResetTour }: any) => {

    return (
        <Menu.Root id="help-menu" positioning={({ placement: 'bottom' })}>
            <Menu.Trigger asChild>
                <IconButton area-label="Open Support">
                    <Tooltip content="Support Menu" openDelay={300}>
                        <LuCircleHelp />
                    </Tooltip>
                </IconButton>
            </Menu.Trigger>

            <Portal>
                <Menu.Positioner>
                    <Menu.Content>
                        {HELP_MENU_LINKS.map((link) => (
                            <Menu.Item key={link.href} asChild value={link.title}>
                                <a href={link.href} target="_blank" rel="noreferrer">
                                    {link.title}
                                </a>
                            </Menu.Item>
                        ))}
                        <Menu.Item onClick={onResetTour} value="reset-tour">
                            RESTART TOUR
                        </Menu.Item>
                    </Menu.Content>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>)
}