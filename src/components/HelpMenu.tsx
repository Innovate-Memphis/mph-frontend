import { IconButton, Menu, Portal } from "@chakra-ui/react";
import { LuCircleHelp } from "react-icons/lu";

import { Tooltip } from "./ui/tooltip";

function buildLinks(param: string) {
    return [
        {
            title: "USER GUIDE",
            href: "https://www.datamidsouth.org/user-guide",
        },
        {
            title: "WHAT'S INCLUDED",
            href: "https://www.datamidsouth.org/whats-included",
        },
        {
            title: "DATA RULES",
            href: `https://www.datamidsouth.org/data-rules?#${param}`,
        },
        {
            title: "SUBMIT IDEAS",
            href: "https://www.datamidsouth.org/submit-ideas",
        },
    ];
}

export const HelpMenu = ({ activeTheme }: any) => {
    const links = buildLinks(activeTheme);

    return (
        <Menu.Root positioning={({ placement: 'bottom' })}>
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
                        {links.map((link) => (
                            <Menu.Item key={link.href} asChild value={link.title}>
                                <a href={link.href} target="_blank" rel="noreferrer">
                                    {link.title}
                                </a>
                            </Menu.Item>
                        ))}
                    </Menu.Content>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>)
}