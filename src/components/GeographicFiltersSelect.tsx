import {
  createListCollection,
  HStack,
  Show,
  Stack,
  Text,
} from "@chakra-ui/react";
import { LuChevronRight, LuCheck } from "react-icons/lu";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "./ui/select";
import { GEOGRAPHIC_FILTER_MAP } from "../constants";
import { SearchableCombobox } from "./helpers/SearchableCombobox";

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
    selectedFilterOptions = GEOGRAPHIC_FILTER_MAP.get(geoFilter[0]);
  }
  return (
    <HStack>
      <Stack width="200px">
        <SelectRoot
          collection={geographicFilters}
          size="xs"
          value={geoFilter}
          onValueChange={(e) => onFilterChange(e.value)}
          minW="150px"
        >
          <SelectTrigger>
            <SelectValueText placeholder="Geographic Boundary" color="black" />
          </SelectTrigger>
          <SelectContent>
            <Text fontSize="xs" fontWeight="semibold" color="fg.subtle" textTransform="uppercase" marginRight="1">Filter By</Text>
            {geographicFilters.items.map((geoSelection) => (
              <SelectItem item={geoSelection} key={geoSelection} className="menu-checkbox-filter">
                {geoSelection}
                {(geoFilter.length > 0 && geoFilter[0] === geoSelection) ? <LuCheck /> : <LuChevronRight />}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      </Stack>
      {
        <Show when={filterSelected}>
          <Stack minW="250px">
            {/* key forces a component refresh */}
            <SearchableCombobox
              key={geoFilter[0] || "a"}
              initialItems={selectedFilterOptions}
              value={geoValues}
              setValue={onFilterValueChange}
            />
          </Stack>
        </Show>
      }
    </HStack>
  )
}

const geographicFilters = createListCollection({
  items: [...GEOGRAPHIC_FILTER_MAP.keys()]
});
