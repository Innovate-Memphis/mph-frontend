import {
    NativeSelectField,
    NativeSelectRoot,
} from "./ui/native-select";
import { FILTERS } from "../constants";

interface FilterHandler {
    currentFilter: string;
    onFilterClick(boundaryName: string): any;
  }

export function FilterSelect({ currentFilter, onFilterClick }: FilterHandler) {
    return (
        <NativeSelectRoot size="xl">
            <NativeSelectField
                placeholder="Filter Data"
                items={FILTERS}
                value={currentFilter}
                onChange={(e) => onFilterClick(e.currentTarget.value)}
            />
        </NativeSelectRoot>
    );
}
