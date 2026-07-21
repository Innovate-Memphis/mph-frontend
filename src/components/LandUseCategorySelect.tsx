import {
  createListCollection,
  HStack,
  Show,
  Stack,
} from "@chakra-ui/react"
import { LuChevronRight, LuCheck } from "react-icons/lu";
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
            {lucZonFilters.items.map((filterSelection) => (
              <SelectItem item={filterSelection} key={filterSelection} className="checkbox-filter">
                {filterSelection}
                {(landUseZonFilter.length > 0 && landUseZonFilter[0] === filterSelection) ? <LuCheck /> : <LuChevronRight />}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      </Stack>
      <Show when={filterSelected}>
        {/* key forces a component refresh */}
        <Stack minW="250px" key={landUseZonFilter[0] || "a"}>
          <SearchableCombobox
            initialItems={selectedFilterOptions}
            value={luzValues}
            setValue={onFilterValueChange}
          />
        </Stack>
      </Show>
    </HStack>
  )
}

const lucZonFilters = createListCollection({
  items: [...LAND_USE_ZONING_FILTER_MAP.keys()]
});
