import {
  createListCollection,
  Checkbox,
  HStack,
  Stack,
} from "@chakra-ui/react"
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
    // @ts-ignore
    selectedFilterOptions = createListCollection({
      // @ts-ignore
      items: LAND_USE_ZONING_FILTER_MAP.get(landUseZonFilter[0])?.values()
    });
  }
  return (
    <HStack>
      <Stack minW="150px">
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
        <Stack minW="150px">
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
              {selectedFilterOptions.items.map((item) => (
                <SelectItem item={{label:item, value:item}} key={item} className="checkbox-filter">
                  <Checkbox.Root
                    checked={luzValues.includes(item)}>
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

const lucZonFilters = createListCollection({
  items: [ ...LAND_USE_ZONING_FILTER_MAP.keys() ]
});
