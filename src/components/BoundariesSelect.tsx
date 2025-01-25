import {
    NativeSelectField,
    NativeSelectRoot,
} from "./ui/native-select";
import { layers } from "../constants";

export function BoundariesSelect({ currentBoundary, onBoundaryClick }) {
    return (
        <NativeSelectRoot>
            <NativeSelectField
                placeholder="Select boundaries"
                items={layers}
                value={currentBoundary}
                onChange={(e) => onBoundaryClick(e.currentTarget.value)}
            />
        </NativeSelectRoot>
    );
}
