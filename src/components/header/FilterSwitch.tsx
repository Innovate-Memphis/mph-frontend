import React from "react";
import { Button } from "@chakra-ui/react";
import { LuFilter } from "react-icons/lu";

interface FilterHandler {
    showFilters: boolean;
    onButtonClick(flippedValue: boolean): any;
}

const FilterSwitch = ({ showFilters, onButtonClick }: FilterHandler) => {
    return (
        <Button
            id="filter"
            onClick={() => onButtonClick(!showFilters)}
            variant={showFilters ? "solid" : "outline"}
            size="xs"
            fontWeight={showFilters ? "bold" : "normal"}
        >
            <LuFilter />
            FILTER PARCELS
        </Button>
    )
}

export default FilterSwitch;
