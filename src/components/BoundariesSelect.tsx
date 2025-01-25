import {
    NativeSelectField,
    NativeSelectRoot,
} from "./ui/native-select";

export function BoundariesSelect({ currentBoundary, onBoundaryClick }) {
    return (
        <NativeSelectRoot>
            <NativeSelectField
                placeholder="Select boundaries"
                items={boundaries}
                value={currentBoundary}
                onChange={(e) => onBoundaryClick(e.currentTarget.value)}
            />
        </NativeSelectRoot>
    );
}

const boundaries = [
    { label: "City Council Districts", value: "council" },
    { label: "Zip Codes", value: "zip" },
    { label: "Census Tracts", value: "census" },
    { label: "Select Your Own", value: "select" },
];
