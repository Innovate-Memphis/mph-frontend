import { Button, For, HStack } from "@chakra-ui/react";
import { LuCheck } from "react-icons/lu";
import { FILTERS } from "../constants";

interface FilterHandler {
    currentFilters: Array<string>;
    onFilterClick(filterName?: string): any;
}

export const FilterSelection = ({ currentFilters, onFilterClick }: FilterHandler) => {
    return (
        <HStack>
            <For each={FILTERS}>
                {(filter) => (
                    <Button
                        key={filter}
                        onClick={() => onFilterClick(filter)}
                        variant={currentFilters.includes(filter) ? "outline" : "solid"}
                    >
                        {currentFilters.includes(filter) && <LuCheck />}
                        {filter}
                    </Button>
                )}
            </For>
        </HStack>
    )
}
