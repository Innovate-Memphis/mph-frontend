import {
  createListCollection,
  Checkbox,
  Popover,
  Portal,
  Stack,
  Text,
} from "@chakra-ui/react"
import { LuChevronRight } from "react-icons/lu";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "./ui/select";
import { GEOGRAPHIC_FILTER_MAP } from "../constants";
import { useState } from "react";

interface GeographicFilterHandler {
  geoFilter: Array<string>;
  geoValues: Array<string>;
  onFilterChange(geoFilter: unknown): any;
  onFilterValueChange(filteredValues: unknown): any;
}

export const GeographicFiltersSelect = ({ geoFilter = [], geoValues, onFilterChange, onFilterValueChange }: GeographicFilterHandler) => {
  function handleFilterSelection(value) {
    onFilterChange(value);
    setOpen(true);
  }
  const [open, setOpen] = useState(false)
  let filterSelected = geoFilter.length !== 0 && GEOGRAPHIC_FILTER_MAP.get(geoFilter[0]) !== undefined;
  let selectedFilterOptions = createListCollection({ items: [] })
  if (filterSelected) {
    // @ts-ignore
    selectedFilterOptions = createListCollection({
      // @ts-ignore
      items: GEOGRAPHIC_FILTER_MAP.get(geoFilter[0])?.values()
    });
  }
  return (
    <>
      <SelectRoot
        collection={geographicFilters}
        size="xs"
        value={geoFilter}
        onValueChange={(e) => handleFilterSelection(e.value)}
        minW="150px"
        closeOnSelect={false}
      >
        <SelectTrigger>
          <SelectValueText placeholder="Geographic" color="black" />
        </SelectTrigger>
        <SelectContent>
          <Text fontSize="xs" fontWeight="semibold" color="fg.subtle" textTransform="uppercase" marginRight="1">Filter By</Text>
          {geographicFilters.items.map((geoSelection) => (
            <SelectItem item={geoSelection} hiddenIndicator={true} key={geoSelection}>
              {geoSelection}
              <LuChevronRight />
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
      {
        filterSelected &&
        <Popover.Root positioning={{ offset: { crossAxis: 200, mainAxis: 0 } }} open={open} onOpenChange={(e) => setOpen(e.open)}>
          <Popover.Trigger />
          <Portal>
            <Popover.Positioner>
              <Popover.Content>
                <Popover.Body>
                    <SelectRoot
                      collection={selectedFilterOptions}
                      size="xs"
                      multiple
                      value={geoValues}
                      onValueChange={(e) => onFilterValueChange(e.value)}
                      composite
                    >
                      <SelectTrigger>
                        <SelectValueText
                          placeholder="Select one or more"
                          color="black"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedFilterOptions.items.map((item) => (
                          <SelectItem item={item} key={item} className="checkbox-filter">
                            <Checkbox.Root
                              checked={geoValues.includes(item)}>
                              <Checkbox.HiddenInput />
                              <Checkbox.Control />
                              <Checkbox.Label>{item}</Checkbox.Label>
                            </Checkbox.Root>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </SelectRoot>
                </Popover.Body>
              </Popover.Content>
            </Popover.Positioner>
          </Portal>
        </Popover.Root>
      }
    </>
  )
}

const geographicFilters = createListCollection({
  items: [...GEOGRAPHIC_FILTER_MAP.keys()]
});
