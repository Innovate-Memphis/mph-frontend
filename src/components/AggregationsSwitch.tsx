import { Button } from "@chakra-ui/react";

interface AggregationHandler {
    showAggregations: boolean;
    onButtonClick(flippedValue: boolean): any;
}

export const AggregationsSwitch = ({ showAggregations, onButtonClick }: AggregationHandler) => {
    const text = showAggregations ? "VIEW PARCELS" : "VIEW TRENDS";
    const displayClass = showAggregations ? "view-parcels" : "view-trends";
    return (
        <Button
            id="filter"
            className={displayClass}
            onClick={() => onButtonClick(!showAggregations)}
            size="sm"
        >
            {text}
        </Button>
    )
}
