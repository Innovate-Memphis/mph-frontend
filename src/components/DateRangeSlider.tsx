import { Button, NumberInput, Flex, HStack, Popover, Portal, Slider, Spacer, Text } from "@chakra-ui/react";
import { LuChevronDown, LuChevronUp, LuMinus } from "react-icons/lu";
import { CURRENT_YEAR, MIN_YEAR } from "./../constants";
import { useState } from "react"

interface DateRangerFilterHandler {
    value: Array<number>;
    onDateSliderChange(dateRange: Array<number>): any;
    onDateInputChange: any;
}

export const DateRangeSlider = ({ value, onDateSliderChange, onDateInputChange }: DateRangerFilterHandler) => {
    const [open, setOpen] = useState(false)
    return (
        <Popover.Root open={open} onOpenChange={(e) => setOpen(e.open)} >
            <Popover.Trigger asChild>
                <Button size="xs" variant="outline">
                    <Text fontSize="xs" fontWeight="semibold" color="fg.subtle" textTransform="uppercase" marginRight="1">Built</Text>
                    {`${value[0]} - ${value[1]}`}
                    {open ? <LuChevronUp /> : <LuChevronDown />}
                </Button>
            </Popover.Trigger>
            <Portal>
                <Popover.Positioner>
                    <Popover.Content width="auto">
                        <Popover.Body padding="3">
                            <Text fontSize="xs" fontWeight="semibold" color="fg.subtle" textTransform="uppercase" marginRight="1">Built Date</Text>
                            <HStack justify="space-between">
                                <NumberInput.Root
                                    value={String(value[0])}
                                    onValueChange={(e) => onDateInputChange(0, e.value)}
                                    size="xs"
                                    min={MIN_YEAR}
                                    max={CURRENT_YEAR}
                                >
                                    <NumberInput.Input />
                                </NumberInput.Root>
                                <LuMinus />
                                <NumberInput.Root
                                    value={String(value[1])}
                                    onValueChange={(e) => onDateInputChange(1, e.value)}
                                    size="xs"
                                    min={MIN_YEAR}
                                    max={CURRENT_YEAR}
                                >
                                    <NumberInput.Input />
                                </NumberInput.Root>
                            </HStack>
                            <Slider.Root
                                min={MIN_YEAR}
                                max={CURRENT_YEAR}
                                size="sm"
                                value={value}
                                onValueChange={(e) => onDateSliderChange(e.value)}
                                onValueChangeEnd={(e) => onDateSliderChange(e.value)}
                                marginX="1"
                                marginY="3"
                            >
                                <Slider.Control>
                                    <Slider.Track>
                                        <Slider.Range />
                                    </Slider.Track>
                                    <Slider.Thumbs />
                                </Slider.Control>
                            </Slider.Root >
                            <Flex >
                                <Text fontSize="xs" fontWeight="semibold" color="fg.subtle">{value[0]}</Text>
                                <Spacer />
                                <Text fontSize="xs" fontWeight="semibold" color="fg.subtle">{value[1]}</Text>
                            </Flex>
                        </Popover.Body>
                    </Popover.Content>
                </Popover.Positioner>
            </Portal>
        </Popover.Root>
    )
};