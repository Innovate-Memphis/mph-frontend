import { createListCollection, HStack, Stack } from "@chakra-ui/react"
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "./ui/select";
import { LAND_USE_ZONING_FILTER_MAP } from "../constants";

interface LandUseFilterHandler {
  landUseZonFilter: Array<string>;
  luzValues: Array<string>;
  onFilterChange(landUseZonFilter: unknown): any;
  onFilterValueChange(filteredValues: unknown): any;
}

export const LandUseCategorySelect = ({ landUseZonFilter = [], luzValues, onFilterChange, onFilterValueChange }: LandUseFilterHandler) => {
  let filterSelected = landUseZonFilter.length !== 0 && LAND_USE_ZONING_FILTER_MAP.get(landUseZonFilter[0]) !== undefined;
  let selectedFilterOptions = createListCollection({ items: []})
  if (filterSelected) {
    selectedFilterOptions = createListCollection({
      // @ts-ignore
      items: LAND_USE_ZONING_FILTER_MAP.get(landUseZonFilter[0])?.values()
    });
  }
  return (
    <HStack>
      <Stack width="200px">
        <SelectRoot
          collection={lucZonFilters}
          size="sm"
          value={landUseZonFilter}
          onValueChange={(e) => onFilterChange(e.value)}
        >
          <SelectTrigger>
            <SelectValueText placeholder="Land Use / Zoning" />
          </SelectTrigger>
          <SelectContent>
            {lucZonFilters.items.map((filterSelection) => (
              <SelectItem item={filterSelection} key={filterSelection}>
                {filterSelection}
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
            value={luzValues}
            onValueChange={(e) => onFilterValueChange(e.value)}
          >
            <SelectTrigger>
              <SelectValueText placeholder="Select one or more" />
            </SelectTrigger>
            <SelectContent>
              {selectedFilterOptions.items.map((option) => (
                <SelectItem item={{label: option, value: option}} key={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </Stack>
      }
    </HStack>
  )
}

const lucZonFilters = createListCollection({
  items: [ ...LAND_USE_ZONING_FILTER_MAP.keys() ]
});
