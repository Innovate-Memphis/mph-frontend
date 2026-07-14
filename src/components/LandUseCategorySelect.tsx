import {
  createListCollection,
  Checkbox,
  HStack,
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
import { LAND_USE_ZONING_FILTER_MAP } from "../constants";
import { SearchableCombobox } from "./helpers/SearchableCombobox";

interface LandUseFilterHandler {
  landUseZonFilter: Array<string>;
  luzValues: Array<string>;
  onFilterChange(landUseZonFilter: unknown): any;
  onFilterValueChange(filteredValues: unknown): any;
}

export const LandUseCategorySelect = ({ landUseZonFilter = [], luzValues, onFilterChange, onFilterValueChange }: LandUseFilterHandler) => {
  let filterSelected = landUseZonFilter.length !== 0 && LAND_USE_ZONING_FILTER_MAP.get(landUseZonFilter[0]) !== undefined;
  let selectedFilterOptions: string[] = [];
  if (filterSelected) {
    // @ts-ignore
    selectedFilterOptions = LAND_USE_ZONING_FILTER_MAP.get(landUseZonFilter[0]);
  }
  return (
    <HStack>
      <Stack minW="150px">
        <SelectRoot
          collection={lucZonFilters}
          size="xs"
          value={landUseZonFilter}
          onValueChange={(e) => onFilterChange(e.value)}
          closeOnSelect={false}
        >
          <SelectTrigger>
            <SelectValueText
              placeholder="Land Use / Zoning"
              color="black"
            />
          </SelectTrigger>
          <SelectContent>
            <Text fontSize="xs" fontWeight="semibold" color="fg.subtle" textTransform="uppercase" marginRight="1">Category</Text>
            {lucZonFilters.items.map((filterSelection) => (
              <SelectItem item={filterSelection} hiddenIndicator={true} key={filterSelection}>
                {filterSelection}
                <LuChevronRight />
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      </Stack>
      {filterSelected &&
        <Stack minW="250px">
          <SearchableCombobox
            initialItems={selectedFilterOptions}
            value={luzValues}
            setValue={onFilterValueChange}
          />
        </Stack>
      }
    </HStack>
  )
}

const lucZonFilters = createListCollection({
  items: [...LAND_USE_ZONING_FILTER_MAP.keys()]
});
