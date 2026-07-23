import {
  Box,
  Checkbox,
  Combobox,
  Portal,
  useFilter,
  useListCollection,
} from "@chakra-ui/react";
import { useState } from "react";

interface SearchableComboboxProps {
  value: string[];
  setValue: Function;
  initialItems: string[];
}

export const SearchableCombobox = ({ value, setValue, initialItems }: SearchableComboboxProps) => {
  const [open, setOpen] = useState(true);

  const { contains } = useFilter({ sensitivity: "base" });

  const { collection, filter } = useListCollection({
    initialItems: initialItems,
    filter: contains,
  })

  return (
    <Combobox.Root
      collection={collection}
      onInputValueChange={(e) => filter(e.inputValue)}
      value={value}
      onValueChange={(e) => setValue(e.value)}
      size="xs"
      minWidth="150px"
      multiple
      openOnClick
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
    >
      <Combobox.Control>
        <Combobox.Input placeholder="Type to search" color="black" />
        <Combobox.IndicatorGroup>
          <Combobox.ClearTrigger />
          <Combobox.Trigger />
        </Combobox.IndicatorGroup>
      </Combobox.Control>
      <Portal>
        <Combobox.Positioner>
          <Combobox.Content>
            {collection.items.map((item) => (
              <Combobox.Item item={item} key={item}>
                <Box marginY="1" key={item}>
                  <Checkbox.Root checked={value.includes(item)}>
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                    <Checkbox.Label>{item}</Checkbox.Label>
                  </Checkbox.Root>
                </Box>
              </Combobox.Item>
            ))}
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}