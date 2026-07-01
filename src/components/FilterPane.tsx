import { useEffect, useState } from "react";
import {
    Button,
    Flex,
    Grid,
    GridItem,
    Text,
    Stack,
} from "@chakra-ui/react";
import { Filters } from "@feltmaps/js-sdk";

import { FilterSelection } from "./FilterSelection";
import { DateRangeSlider } from "./DateRangeSlider";
import { LivingUnitsCategorySelect } from "./LivingUnitsCategorySelect";
import { LandUseCategorySelect } from "./LandUseCategorySelect";
import { GeographicFiltersSelect } from "./GeographicFiltersSelect";

import {
    DEFAULT_BUILT_YEAR_FILTERS,
    FILTERS_TO_FELT_FILTER,
    GEOGRAPHIC_FELT_FILTER_MAP,
    LAND_USE_CATEGORY_FILTER,
    LIVING_UNITS_CATEGORY_FILTER,
    MIN_YEAR_BUILT_FILTER,
    MAX_YEAR_BUILT_FILTER,
    THEME_TO_PARCEL_LAYER_MAP,
} from "../constants";
import { filterUtils } from "../utils";



export const FilterPane = ({ felt, currentTheme }) => {
    const [currentFilters, setCurrentFilters] = useState([]);
    const [currentFilterBuildDate, setCurrentFilterBuildDate] = useState(DEFAULT_BUILT_YEAR_FILTERS);
    const [currentFilterLivingUnitsCategory, setCurrentFilterLivingUnitsCategory] = useState([]);
    const [currentFilterLandUseCategory, setCurrentFilterLandUseCategory] = useState([]);
    const [currentGeographicFilter, setCurrentGeographicFilter] = useState([]);
    const [currentGeoFilteredValues, setCurrentGeoFilteredValues] = useState([]);


    useEffect(() => {
        const updateLayerFilter = async () => {
            if (felt) {

                const allLayerFilters = new Map(FILTERS_TO_FELT_FILTER);
                const allFeltFormattedFilters: Filters[] = currentFilters.map((f) => allLayerFilters.get(f) || null);

                if (currentFilterBuildDate[0] !== DEFAULT_BUILT_YEAR_FILTERS[0]) {
                    let minYearBuiltFilter = MIN_YEAR_BUILT_FILTER;
                    // @ts-ignore
                    minYearBuiltFilter[2] = currentFilterBuildDate[0]
                    allFeltFormattedFilters.push(minYearBuiltFilter)
                }

                if (currentFilterBuildDate[1] !== DEFAULT_BUILT_YEAR_FILTERS[1]) {
                    let maxYearBuiltFilter = MAX_YEAR_BUILT_FILTER;
                    // @ts-ignore
                    maxYearBuiltFilter[2] = currentFilterBuildDate[1]
                    allFeltFormattedFilters.push(maxYearBuiltFilter)
                }

                if (currentFilterLivingUnitsCategory.length) {
                    let livingUnitsCategoryFilter = LIVING_UNITS_CATEGORY_FILTER;
                    // @ts-ignore
                    livingUnitsCategoryFilter[2] = currentFilterLivingUnitsCategory
                    allFeltFormattedFilters.push(livingUnitsCategoryFilter)
                }

                if (currentFilterLandUseCategory.length) {
                    let landUseCategoryFilter = LAND_USE_CATEGORY_FILTER;
                    // @ts-ignore
                    landUseCategoryFilter[2] = currentFilterLandUseCategory
                    allFeltFormattedFilters.push(landUseCategoryFilter)
                }

                if (currentGeoFilteredValues.length) {
                    let currentGeoFilter = GEOGRAPHIC_FELT_FILTER_MAP.get(currentGeographicFilter[0])
                    if (currentGeoFilter) {
                        // @ts-ignore
                        currentGeoFilter[2] = currentGeoFilteredValues
                        allFeltFormattedFilters.push(currentGeoFilter);
                    }
                }

                const newFilters = filterUtils.andMany(allFeltFormattedFilters);

                let layerToUpdate = THEME_TO_PARCEL_LAYER_MAP.get(currentTheme);

                if (layerToUpdate) {
                    await felt.setLayerFilters({
                        layerId: layerToUpdate,
                        filters: newFilters
                    });
                }
            }
        }

        updateLayerFilter().catch(console.error);
    }, [felt, currentFilters, currentFilterBuildDate, currentFilterLandUseCategory, currentGeoFilteredValues, currentFilterLivingUnitsCategory])

    async function handleFilterClick(filter?: string) {
        if (!filter) {
            setCurrentFilters([]);
            setCurrentFilterBuildDate(DEFAULT_BUILT_YEAR_FILTERS);
            setCurrentFilterLivingUnitsCategory([]);
            setCurrentFilterLandUseCategory([]);
            setCurrentGeographicFilter([]);
            setCurrentGeoFilteredValues([]);
            // @ts-ignore
        } else if (!currentFilters.includes(filter)) {
            // @ts-ignore
            setCurrentFilters([...currentFilters, filter]);
        } else {
            setCurrentFilters(currentFilters.filter(x => x !== filter));
        }
    }

    async function handleGeoFilterChange(value: string) {
        // @ts-ignore
        setCurrentGeographicFilter(value);
        setCurrentGeoFilteredValues([]);
    }

    async function handleGeoFilterValueClick(value: Array<string>) {
        // @ts-ignore
        setCurrentGeoFilteredValues(value);
    }

    return (
        <Stack>
            <Flex justify="space-between" paddingBottom="2">
                <Flex align="baseline" gap="4">
                    <FilterSelection
                        currentFilters={currentFilters}
                        onFilterClick={handleFilterClick} />
                    <Grid
                        templateRows="repeat(2, 1fr)"
                        templateColumns="repeat(2, 1fr)"
                        gap={4}
                    >
                        <GridItem colSpan={1}>
                            <DateRangeSlider
                                value={currentFilterBuildDate}
                                onDateSliderChange={setCurrentFilterBuildDate} />
                        </GridItem>
                        <GridItem colSpan={1}>
                            <LivingUnitsCategorySelect
                                value={currentFilterLivingUnitsCategory}
                                onSelectChange={setCurrentFilterLivingUnitsCategory} />
                        </GridItem>
                        <GridItem colSpan={1}>
                            <LandUseCategorySelect
                                value={currentFilterLandUseCategory}
                                onSelectChange={setCurrentFilterLandUseCategory} />
                        </GridItem>
                        <GridItem colSpan={1}>
                            <GeographicFiltersSelect
                                geoFilter={currentGeographicFilter}
                                geoValues={currentGeoFilteredValues}
                                onFilterChange={handleGeoFilterChange}
                                onFilterValueChange={handleGeoFilterValueClick}
                            />
                        </GridItem>
                    </Grid>
                </Flex>
                <Button marginRight="5" onClick={() => handleFilterClick()} variant="subtle">Reset Filters</Button>
            </Flex>
        </Stack>)
}