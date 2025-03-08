import { Tabs } from "@chakra-ui/react"
import { THEMES } from "../constants";

interface ThemeHandler {
    currentTheme: string;
    onThemeClick(boundaryName: string): any;
}

export function ThemeSelect({ currentTheme, onThemeClick }: ThemeHandler) {
    return (
        <Tabs.Root value={currentTheme} variant="plain" onValueChange={(e) => onThemeClick(e.value)} size="lg">
            <Tabs.List bg="bg.muted" rounded="l3" p="1">
                {THEMES.map((theme) => (
                    <Tabs.Trigger value={theme}>
                        {theme.toUpperCase()}
                    </Tabs.Trigger>
                ))}
                <Tabs.Indicator rounded="l2" />
            </Tabs.List>
        </Tabs.Root>
    );
}