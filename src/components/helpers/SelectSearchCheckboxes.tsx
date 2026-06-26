import {
    Box,
    Checkbox,
    Combobox,
    Portal,
    createListCollection,
} from "@chakra-ui/react"
import { useMemo, useState } from "react"

export const SelectSearchCheckboxes = ({ items, name }) => {
    const [searchValue, setSearchValue] = useState("")
    const [selectedItems, setSelectedItems] = useState<string[]>([])

    const filteredItems = useMemo(
        () =>
            items.filter((item) =>
                item.toLowerCase().includes(searchValue.toLowerCase()),
            ),
        [searchValue],
    )

    const collection = useMemo(
        () => createListCollection({ items: filteredItems }),
        [filteredItems],
    )

    const handleValueChange = (details: Combobox.ValueChangeDetails) => {
        setSelectedItems(details.value)
    }

    return (
        <Combobox.Root
            multiple
            size="xs"
            minWidth="150px"
            value={selectedItems}
            collection={collection}
            onValueChange={handleValueChange}
            onInputValueChange={(details) => setSearchValue(details.inputValue)}
            placeholder={name}
        >

            <Combobox.Control>
                <Combobox.Input />
                <Combobox.IndicatorGroup>
                    <Combobox.Trigger />
                </Combobox.IndicatorGroup>
            </Combobox.Control>

            <Portal>
                <Combobox.Positioner>
                    <Combobox.Content>
                        <Combobox.ItemGroup>
                            {filteredItems.map((item) => (
                                <Box marginY="1">
                                    <Checkbox.Root
                                    >
                                        <Checkbox.HiddenInput />
                                        <Checkbox.Control />
                                        <Checkbox.Label>{item}</Checkbox.Label>
                                    </Checkbox.Root>
                                </Box>
                            ))}
                            <Combobox.Empty>Not found</Combobox.Empty>
                        </Combobox.ItemGroup>
                    </Combobox.Content>
                </Combobox.Positioner>
            </Portal>
        </Combobox.Root>
    )
}
