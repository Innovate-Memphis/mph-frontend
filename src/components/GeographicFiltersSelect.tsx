import { createListCollection, Checkbox, HStack, Show, Stack, Select } from "@chakra-ui/react"
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "./ui/select";
import { GEOGRAPHIC_FILTER_MAP } from "../constants";
import { SearchableCombobox } from "./SearchableCombobox";

interface GeographicFilterHandler {
  geoFilter: Array<string>;
  geoValues: Array<string>;
  onFilterChange(geoFilter: unknown): any;
  onFilterValueChange(filteredValues: unknown): any;
}

export const GeographicFiltersSelect = ({ geoFilter = [], geoValues, onFilterChange, onFilterValueChange }: GeographicFilterHandler) => {
  let filterSelected = geoFilter.length !== 0 && GEOGRAPHIC_FILTER_MAP.get(geoFilter[0]) !== undefined;
  let selectedFilterOptions: string[] = [];
  if (filterSelected) {
    // @ts-ignore
    selectedFilterOptions = GEOGRAPHIC_FILTER_MAP.get(geoFilter[0])?.values();
  }
  return (
    <HStack>
      <Stack width="200px">
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
        <Stack width="200px">
          <SearchableCombobox
            initialItems={selectedFilterOptions}
            value={geoValues}
            setValue={onFilterValueChange}
          />
        </Stack>
      }
    </HStack>
  )
}

const geographicFilters = createListCollection({
  items: [...GEOGRAPHIC_FILTER_MAP.keys()]
});
