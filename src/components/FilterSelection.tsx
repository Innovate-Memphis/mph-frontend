import { Button, For, Flex } from "@chakra-ui/react";
import { Tooltip } from "./ui/tooltip";
import { LuCheck } from "react-icons/lu";
import { FILTERS, FILTER_BUTTON_WIDTH, SFH_HOMES, MFH_HOMES, SFH_MFH_HOMES } from "../constants";

interface FilterHandler {
    currentFilters: Array<string>;
    onFilterClick(filterName?: string): any;
}

export const FilterSelection = ({ currentFilters, onFilterClick }: FilterHandler) => {
    return (
        <Flex gap="4">
            <For each={FILTERS}>
                {(filterCol) => (
                    <Flex direction="column" gap="4" wrap="wrap" maxW="700px">
                        <For each={filterCol}>
                            {({ filter, buttonTitle, hoverDescription }, index) => {
                                let filterSelected = currentFilters.includes(filter) || (
                                    (filter === SFH_HOMES.filter || filter === MFH_HOMES.filter) && currentFilters.includes(SFH_MFH_HOMES.filter)
                                )
                                return (
                                    <Tooltip key={index} content={hoverDescription} openDelay={300}>
                                        <Button
                                            width={FILTER_BUTTON_WIDTH}
                                            onClick={() => onFilterClick(filter)}
                                            variant={filterSelected ? "outline" : "solid"}
                                            size="xs"
                                        >
                                            {filterSelected && <LuCheck />}
                                            {buttonTitle}
                                        </Button>
                                    </Tooltip>
                                )
                            }}
                        </For>
                    </Flex>)
                }
            </For>
        </Flex>
    )
}
