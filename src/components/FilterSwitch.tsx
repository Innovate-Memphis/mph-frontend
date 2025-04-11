import { Button } from "@chakra-ui/react";
import { LuCheck } from "react-icons/lu";

interface FilterHandler {
    showFilters: boolean;
    onButtonClick(flippedValue: boolean): any;
}

export const FilterSwitch = ({ showFilters, onButtonClick }: FilterHandler) => {
    return (
        <Button
            onClick={() => onButtonClick(!showFilters)}
            variant={showFilters ? "outline" : "solid"}
            size="sm"
        >
            {showFilters && <><LuCheck />Applying Filters</>}
            {!showFilters && "Apply Filters"}
        </Button>
    )
}
