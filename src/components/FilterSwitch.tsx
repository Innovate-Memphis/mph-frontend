import { Button } from "@chakra-ui/react";
import { LuFilter } from "react-icons/lu";

interface FilterHandler {
    showFilters: boolean;
    onButtonClick(flippedValue: boolean): any;
}

export const FilterSwitch = ({ showFilters, onButtonClick }: FilterHandler) => {
    return (
        <Button
            id="filter"
            onClick={() => onButtonClick(!showFilters)}
            variant={showFilters ? "surface" : "outline"}
            size="xs"
            colorPalette="green"
        >
            <LuFilter />
            FILTER PARCELS
        </Button>
    )
}
