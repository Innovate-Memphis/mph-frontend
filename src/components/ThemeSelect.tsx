import { For, Tabs } from "@chakra-ui/react"
import { THEMES } from "../constants";

interface ThemeHandler {
    currentTheme: string;
    onThemeClick(themeName: string): any;
}

export function ThemeSelect({ currentTheme, onThemeClick }: ThemeHandler) {
    return (
        <Tabs.Root value={currentTheme} onValueChange={(e) => onThemeClick(e.value)} size="md" colorPalette="green">
            <Tabs.List>
                <For each={THEMES}>
                    {(theme) => (
                        <Tabs.Trigger key={theme} value={theme}>
                            {theme.toUpperCase()}
                        </Tabs.Trigger>
                    )}
                </For>
            </Tabs.List>
        </Tabs.Root>
    );
}
