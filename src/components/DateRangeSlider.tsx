import { HStack, Slider } from "@chakra-ui/react";
import { CURRENT_YEAR, MIN_YEAR } from "./../constants";
import { useState } from "react";

interface DateRangerFilterHandler {
    value: Array<number>;
    onDateSliderChange(dateRange: Array<number>): any;
}

export const DateRangeSlider = ({ value, onDateSliderChange }: DateRangerFilterHandler) => {
    const [slideValue, setSlideValue] = useState([MIN_YEAR, CURRENT_YEAR]);
    return (
        <Slider.Root
            min={MIN_YEAR}
            max={CURRENT_YEAR}
            minW="150px"
            maxW="200px"
            size="sm"
            value={value}
            onValueChange={(e) => setSlideValue(e.value)}
            onValueChangeEnd={(e) => onDateSliderChange(e.value)}
        >
            <HStack justify="space-between">
                <Slider.Label>Built Date:</Slider.Label>
                {`${slideValue[0]} - ${slideValue[1]}`}
            </HStack>
            <Slider.Control>
                <Slider.Track>
                    <Slider.Range />
                </Slider.Track>
                <Slider.Thumbs />
            </Slider.Control>
        </Slider.Root >
    )
};