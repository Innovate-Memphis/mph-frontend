import { Button } from "@chakra-ui/react";
import { LuCheck } from "react-icons/lu";

interface FilterHandler {
    showFilters: boolean;
    onButtonClick(flippedValue: boolean): any;
}

export const FilterSwitch = ({ showFilters, onButtonClick }: FilterHandler) => {
    return (
        <Button
            id="filter"
            onClick={() => onButtonClick(!showFilters)}
            variant={showFilters ? "outline" : "solid"}
            size="sm"
        >
            {showFilters && <LuCheck />}
            FILTER
        </Button>
    )
}
