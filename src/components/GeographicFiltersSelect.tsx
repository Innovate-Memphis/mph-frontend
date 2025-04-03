import { createListCollection, HStack, Stack } from "@chakra-ui/react"
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
  let selectedFilterOptions = createListCollection({ items: []})
  if (filterSelected) {
    selectedFilterOptions = createListCollection({
      // @ts-ignore
      items: GEOGRAPHIC_FILTER_MAP.get(geoFilter[0])?.values()
    });
  }
  return (
    <HStack>
      <Stack width="200px">
        <SelectRoot
          collection={geographicFilters}
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
        <Stack width="200px">
          <SelectRoot
            collection={selectedFilterOptions}
            multiple
            value={geoValues}
            onValueChange={(e) => onFilterValueChange(e.value)}
          >
            <SelectTrigger>
              <SelectValueText placeholder="Select one or more" />
            </SelectTrigger>
            <SelectContent>
              {selectedFilterOptions.items.map((geoOption) => (
                <SelectItem item={{label: geoOption, value: geoOption}} key={geoOption}>
                  {geoOption}
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
  items: [ ...GEOGRAPHIC_FILTER_MAP.keys() ]
});
