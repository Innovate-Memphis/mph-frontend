import { HStack, Slider } from "@chakra-ui/react";
import { MIN_UNITS, MAX_UNITS } from "./../constants";

interface DateRangerFilterHandler {
    value: Array<number>;
    onUnitsSliderChange(dateRange: Array<number>): any;
}

export const LivingUnitsSlider = ({ value, onUnitsSliderChange }: DateRangerFilterHandler) => {
    return (
        <Slider.Root
            min={MIN_UNITS}
            max={MAX_UNITS}
            minW="150px"
            maxW="200px"
            size="sm"
            value={value}
            onValueChange={(e) => onUnitsSliderChange(e.value)}
            onValueChangeEnd={(e) => onUnitsSliderChange(e.value)}
        >
            <HStack justify="space-between">
                <Slider.Label># Living Units:</Slider.Label>
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