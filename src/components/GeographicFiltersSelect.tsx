import { createListCollection, Checkbox, HStack, Show, Stack, Select } from "@chakra-ui/react"
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "./ui/select";
import { GEOGRAPHIC_FILTER_MAP } from "../constants";

interface GeographicFilterHandler {
  geoFilter: Array<string>;
  geoValues: Array<string>;
  onFilterChange(geoFilter: unknown): any;
  onFilterValueChange(filteredValues: unknown): any;
}

export const GeographicFiltersSelect = ({ geoFilter = [], geoValues, onFilterChange, onFilterValueChange }: GeographicFilterHandler) => {
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
    <HStack>
      <Stack minW="150px">
        <SelectRoot
          collection={geographicFilters}
          size="sm"
          value={geoFilter}
          onValueChange={(e) => onFilterChange(e.value)}
        >
          <SelectTrigger>
            <SelectValueText placeholder="Geographic Boundary" />
          </SelectTrigger>
          <SelectContent>
            {geographicFilters.items.map((geoSelection) => (
              <SelectItem item={geoSelection} key={geoSelection}>
                {geoSelection}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      </Stack>
      {filterSelected &&
        <Stack minW="150px">
          <SelectRoot
            collection={selectedFilterOptions}
            multiple
            value={geoValues}
            onValueChange={(e) => onFilterValueChange(e.value)}
            composite
          >
            <SelectTrigger>
              <SelectValueText placeholder="Select one or more" />
            </SelectTrigger>
            <SelectContent>
              {selectedFilterOptions.items.map((item) => (
                <SelectItem item={item} key={item} className="geo-filter">
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
        </Stack>
      }
    </HStack>
  )
}

const geographicFilters = createListCollection({
  items: [...GEOGRAPHIC_FILTER_MAP.keys()]
});
