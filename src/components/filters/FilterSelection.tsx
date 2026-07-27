import React from "react";
import { Button, For, Flex, Text } from "@chakra-ui/react";

import { Tooltip } from "../ui/tooltip";
import { FILTERS, SFH_HOMES, MFH_HOMES, SFH_MFH_HOMES } from "../../constants";

interface FilterHandler {
    currentFilters: Array<string>;
    onFilterClick(filterName?: string): any;
}

const FilterSelection = ({ currentFilters, onFilterClick }: FilterHandler) =>
    <Flex gap="1">
        <For each={FILTERS}>
            {({ subtitle, filters }, index) => (
                <Flex key={index} direction="row" gap="1" alignItems="center">
                    <Text fontSize="xs" fontWeight="semibold" color="fg.subtle" textTransform="uppercase" marginRight="1">{subtitle}</Text>
                    <For each={filters}>
                        {({ filter, buttonTitle, hoverDescription }, index) => {
                            const filterSelected = currentFilters.includes(filter) || (
                                (filter === SFH_HOMES.filter || filter === MFH_HOMES.filter) && currentFilters.includes(SFH_MFH_HOMES.filter)
                            )
                            return (
                                <Tooltip key={index} content={hoverDescription} openDelay={300}>
                                    <Button
                                        onClick={() => onFilterClick(filter)}
                                        variant={filterSelected ? "solid" : "outline"}
                                        size="xs"
                                        borderRadius="full"
                                        paddingY="0"
                                    >
                                        {buttonTitle}
                                    </Button>
                                </Tooltip>)
                        }}
                    </For>
                    {
                        (index !== FILTERS.length - 1) && <div className="vdiv" key={index} />
                    }

                </Flex>)
            }
        </For>
    </Flex>

export default FilterSelection;
