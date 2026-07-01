import { Box, Button, For, Flex, Text } from "@chakra-ui/react";
import { Tooltip } from "./ui/tooltip";
import { NEW_FILTERS, SFH_HOMES, MFH_HOMES, SFH_MFH_HOMES } from "../constants";

interface FilterHandler {
    currentFilters: Array<string>;
    onFilterClick(filterName?: string): any;
}

export const FilterSelection = ({ currentFilters, onFilterClick }: FilterHandler) => {
    return (
        <Flex gap="1">
            <For each={NEW_FILTERS}>
                {({ subtitle, filters }, index) => (
                    <Flex direction="row" gap="1" alignItems="center">
                        <Text fontSize="xs" fontWeight="semibold" color="fg.subtle" textTransform="uppercase" marginRight="1">{subtitle}</Text>
                        <For each={filters}>
                            {({ filter, buttonTitle, hoverDescription }, index) => {
                                let filterSelected = currentFilters.includes(filter) || (
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
                        (index !== NEW_FILTERS.length - 1) && <div className="vdiv" />
                        }
                        
                    </Flex>)
                }
            </For>
        </Flex>
    )
}
