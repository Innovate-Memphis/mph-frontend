import { Button } from "@chakra-ui/react";

interface AggregationHandler {
    showAggregations: boolean;
    onButtonClick(flippedValue: boolean): any;
}

export const AggregationsSwitch = ({ showAggregations, onButtonClick }: AggregationHandler) => {
    const text = showAggregations ? "VIEW PARCELS" : "VIEW TRENDS";
    return (
        <Button
            id="filter"
            onClick={() => onButtonClick(!showAggregations)}
            size="sm"
        >
            {text}
        </Button>
    )
}
