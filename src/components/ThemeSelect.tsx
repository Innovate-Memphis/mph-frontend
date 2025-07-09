import { For, Tabs } from "@chakra-ui/react"
import { THEMES } from "../constants";

import { Tooltip } from "./ui/tooltip";

interface ThemeHandler {
    currentTheme: string;
    onThemeClick(themeName: string): any;
}

export function ThemeSelect({ currentTheme, onThemeClick }: ThemeHandler) {
    return (
        <Tabs.Root value={currentTheme} onValueChange={(e) => onThemeClick(e.value)} size="md" colorPalette="green">
            <Tabs.List id="theme-tabs">
                <For each={THEMES}>
                    {({ theme, tooltip }) => (
                        <Tooltip key={theme} content={tooltip} openDelay={300}>
                            <Tabs.Trigger value={theme}>
                                {theme.toUpperCase()}
                            </Tabs.Trigger>
                        </Tooltip>
                    )}
                </For>
            </Tabs.List>
        </Tabs.Root>
    );
}
