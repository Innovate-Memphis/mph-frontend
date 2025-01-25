import {
    NativeSelectField,
    NativeSelectRoot,
} from "./ui/native-select";
import { layers } from "../constants";

interface BoundaryHandler {
    currentBoundary: string;
    onBoundaryClick(boundaryName: string): any;
  }

export function BoundariesSelect({ currentBoundary, onBoundaryClick }: BoundaryHandler) {
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
