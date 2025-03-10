import { Button, For, HStack } from "@chakra-ui/react";
import { LuCheck } from "react-icons/lu";
import {
    DrawerActionTrigger,
    DrawerBackdrop,
    DrawerBody,
    DrawerCloseTrigger,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerRoot,
    DrawerTitle,
    DrawerTrigger,
} from "./ui/drawer";
import { FILTERS } from "../constants";

interface FilterHandler {
    currentFilters: Array<string>;
    onFilterClick(filterName: string): any;
}

export const FilterDrawer = ({ currentFilters, onFilterClick }: FilterHandler) => {
    return (
        <DrawerRoot placement="top">
            <DrawerBackdrop />
            <DrawerTrigger asChild>
                <Button variant="outline" size="xl">
                    Filter Data
                </Button>
            </DrawerTrigger>
            <DrawerContent
                roundedBottom="l3"
            >
                <DrawerHeader>
                    <DrawerTitle>Filters</DrawerTitle>
                </DrawerHeader>
                <DrawerBody>
                    Use these filters to narrow down the properties shown on the map.
                    <HStack>
                        <For each={FILTERS}>
                            {(filter) => (
                                <Button
                                    key={filter}
                                    onClick={() => onFilterClick(filter)}
                                    variant={currentFilters.includes(filter) ? "outline" : "solid"}
                                >
                                    {currentFilters.includes(filter) && <LuCheck />}
                                    {filter}
                                </Button>
                            )}
                        </For>
                    </HStack>
                </DrawerBody>
                <DrawerFooter>
                    <DrawerActionTrigger asChild>
                        <Button variant="outline">Close Filter Drawer</Button>
                    </DrawerActionTrigger>
                </DrawerFooter>
                <DrawerCloseTrigger />
            </DrawerContent>
        </DrawerRoot>
    )
}
