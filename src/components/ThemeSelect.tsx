import {
    NativeSelectField,
    NativeSelectRoot,
} from "./ui/native-select";
import { THEMES } from "../constants";

interface ThemeHandler {
    currentTheme: string;
    onThemeClick(boundaryName: string): any;
  }

export function ThemeSelect({ currentTheme, onThemeClick }: ThemeHandler) {
    return (
        <NativeSelectRoot>
            <NativeSelectField
                placeholder="Select a theme"
                items={THEMES}
                value={currentTheme}
                onChange={(e) => onThemeClick(e.currentTarget.value)}
            />
        </NativeSelectRoot>
    );
}
