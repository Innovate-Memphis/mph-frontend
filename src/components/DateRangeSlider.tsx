import { HStack, Slider } from "@chakra-ui/react";
import { CURRENT_YEAR, MIN_YEAR } from "./../constants";

interface DateRangerFilterHandler {
    value: Array<number>;
    onDateSliderChange(dateRange: Array<number>): any;
}

export const DateRangeSlider = ({ value, onDateSliderChange }: DateRangerFilterHandler) => {
    return (
        <Slider.Root
            min={MIN_YEAR}
            max={CURRENT_YEAR}
            minW="150px"
            maxW="200px"
            size="sm"
            value={value}
            onValueChange={(e) => onDateSliderChange(e.value)}
            onValueChangeEnd={(e) => onDateSliderChange(e.value)}
        >
            <HStack justify="space-between">
                <Slider.Label>Built Date:</Slider.Label>
                {`${value[0]} - ${value[1]}`}
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