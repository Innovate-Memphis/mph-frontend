import {
    NativeSelectField,
    NativeSelectRoot,
} from "./ui/native-select";

export function BoundariesSelect() {
    return (
        <NativeSelectRoot>
            <NativeSelectField>
                {boundaries.map((boundary) => (
                    <option value={boundary.value} key={boundary.value}>
                        {boundary.label}
                    </option>
                ))}
            </NativeSelectField>
        </NativeSelectRoot>
    );
}

const boundaries = [
    { label: "City Council Districts", value: "council" },
    { label: "Zip Codes", value: "zip" },
    { label: "Census Tracts", value: "census" },
    { label: "Select Your Own", value: "select" },
];
