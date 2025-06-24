import { Button } from "@chakra-ui/react";
import { LuCheck } from "react-icons/lu";

interface AggregationHandler {
    showAggregations: boolean;
    onButtonClick(flippedValue: boolean): any;
}

export const AggregationsSwitch = ({ showAggregations, onButtonClick }: AggregationHandler) => {
    return (
        <Button
            id="filter"
            onClick={() => onButtonClick(!showAggregations)}
            variant={showAggregations ? "outline" : "solid"}
            size="sm"
        >
            {showAggregations && <LuCheck />}
            Show Aggregations
        </Button>
    )
}
