import { Button } from "@chakra-ui/react";
import { LuMoveRight } from "react-icons/lu";

interface AggregationHandler {
    showAggregations: boolean;
    onButtonClick(flippedValue: boolean): any;
}

export const AggregationsSwitch = ({ showAggregations, onButtonClick }: AggregationHandler) => {
    const text = showAggregations ? "VIEW PARCELS" : "VIEW TRENDS";
    const displayClass = showAggregations ? "view-parcels" : "view-trends";
    return (
        <Button
            id="aggs"
            className={displayClass}
            onClick={() => onButtonClick(!showAggregations)}
            size="xs"
            variant="outline"
        >
            {text}
            <LuMoveRight />
        </Button>
    )
}
