import { Button, For, HStack } from "@chakra-ui/react";
import { Tooltip } from "./ui/tooltip";
import { LuCheck } from "react-icons/lu";
import { FILTERS, FILTER_BUTTON_WIDTH } from "../constants";

interface FilterHandler {
    currentFilters: Array<string>;
    onFilterClick(filterName?: string): any;
}

export const FilterSelection = ({ currentFilters, onFilterClick }: FilterHandler) => {
    return (
        <HStack>
            <For each={FILTERS}>
                {({filter, buttonTitle, hoverDescription }, index) => (
                    <Tooltip content={hoverDescription} openDelay={300}>
                    <Button
                        width={FILTER_BUTTON_WIDTH}
                        key={index}
                        onClick={() => onFilterClick(filter)}
                        variant={currentFilters.includes(filter) ? "outline" : "solid"}
                        size="sm"
                    >
                        {currentFilters.includes(filter) && <LuCheck />}
                        {buttonTitle}
                    </Button>
                    </Tooltip>
                )}
            </For>
        </HStack>
    )
}
