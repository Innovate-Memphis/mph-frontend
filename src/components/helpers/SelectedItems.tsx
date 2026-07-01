import {
    Badge,
    Wrap,
} from "@chakra-ui/react"

export const SelectedItems = ({ items }) =>
    <Wrap gap="2">
        {items.map((item) => (
            <Badge key={item}>{item}</Badge>
        ))}
    </Wrap>
