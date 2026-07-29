import React, { useEffect, useState } from "react";
import {
  Box,
  Checkbox,
  Combobox,
  Portal,
  useFilter,
  useListCollection,
} from "@chakra-ui/react";

interface SearchableComboboxProps {
  value: string[];
  setValue: Function;
  initialItems: string[];
}

const SearchableCombobox = ({ value, setValue, initialItems }: SearchableComboboxProps) => {
  const [open, setOpen] = useState(true);

  const { contains } = useFilter({ sensitivity: "base" });

  const { collection, filter } = useListCollection({
    initialItems: initialItems,
    filter: contains,
  })

  // This is a very stupid hack
  // Current the Land Use / Zoning dropdown opens and closes immediately
  // when a parent filter is chosen
  // I have tried so many things to fix it and nothing works
  // Even tho there's no problem w/ the Geographic Boundary dropdown
  // So this is a janky workaround
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

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
            {collection.items.map((item, index) => (
              <Combobox.Item item={item} key={index}>
                <Box marginY="1">
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

export default SearchableCombobox;
