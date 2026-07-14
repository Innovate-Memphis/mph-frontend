import {
  Box,
  Checkbox,
  Combobox,
  Portal,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"

interface SearchableComboboxProps {
  value: string[];
  setValue: Function;
  initialItems: string[];
}

export const SearchableCombobox = ({ value, setValue, initialItems }: SearchableComboboxProps) => {
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
    >
      <Combobox.Control>
        <Combobox.Input placeholder="Type to search" />
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
                  <Checkbox.Root
                  >
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