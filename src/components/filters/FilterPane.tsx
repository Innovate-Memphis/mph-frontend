import React, { useEffect, useState } from "react";
import {
    Flex,
    Stack,
} from "@chakra-ui/react";
import {
    FeltController,
    Filters,
} from "@feltmaps/js-sdk";

import {
    DateRangeSlider,
    FilterSelection,
    GeographicFiltersSelect,
    LandUseCategorySelect,
    LivingUnitsCategorySelect,
} from "./";
import {
    itemLabels,
    SelectedItems
} from "../helpers";

import {
    DEFAULT_BUILT_YEAR_FILTERS,
    FILTERS_TO_FELT_FILTER,
    GEOGRAPHIC_FELT_FILTER_MAP,
    LIVING_UNITS_CATEGORY_FILTER,
    LUC_ZONING_FELT_FILTER_MAP,
    MIN_YEAR_BUILT_FILTER,
    MFH_HOMES,
    MAX_YEAR_BUILT_FILTER,
    SFH_HOMES,
    SFH_MFH_HOMES,
    THEME_TO_PARCEL_LAYER_MAP,
} from "../../constants";
import { filterUtils } from "../../utils";

interface FilterPaneProps {
    felt: FeltController | null;
    currentTheme: string;
}

const FilterPane = ({ currentTheme, felt }: FilterPaneProps) => {
    const [currentFilters, setCurrentFilters] = useState([]);
    const [currentFilterBuildDate, setCurrentFilterBuildDate] = useState(DEFAULT_BUILT_YEAR_FILTERS);
    const [currentFilterLivingUnitsCategory, setCurrentFilterLivingUnitsCategory] = useState([]);
    const [currentLandUseZoningFilter, setCurrentLandUseZoningFilter] = useState([]);
    const [currentLandUseZoningValues, setCurrentLandUseZoningValues] = useState([]);
    const [currentGeographicFilter, setCurrentGeographicFilter] = useState([]);
    const [currentGeoFilteredValues, setCurrentGeoFilteredValues] = useState([]);

    useEffect(() => {
        const updateLayerFilter = async () => {
            if (felt) {

                const allLayerFilters = new Map(FILTERS_TO_FELT_FILTER);
                const allFeltFormattedFilters: Filters[] = currentFilters.map((f) => allLayerFilters.get(f) || null);

                if (currentFilterBuildDate[0] !== DEFAULT_BUILT_YEAR_FILTERS[0]) {
                    const minYearBuiltFilter = MIN_YEAR_BUILT_FILTER;
                    // @ts-expect-error
                    minYearBuiltFilter[2] = currentFilterBuildDate[0]
                    allFeltFormattedFilters.push(minYearBuiltFilter)
                }

                if (currentFilterBuildDate[1] !== DEFAULT_BUILT_YEAR_FILTERS[1]) {
                    const maxYearBuiltFilter = MAX_YEAR_BUILT_FILTER;
                    // @ts-expect-error
                    maxYearBuiltFilter[2] = currentFilterBuildDate[1]
                    allFeltFormattedFilters.push(maxYearBuiltFilter)
                }

                if (currentFilterLivingUnitsCategory.length) {
                    const livingUnitsCategoryFilter = LIVING_UNITS_CATEGORY_FILTER;
                    // @ts-expect-error
                    livingUnitsCategoryFilter[2] = currentFilterLivingUnitsCategory
                    allFeltFormattedFilters.push(livingUnitsCategoryFilter)
                }

                if (currentLandUseZoningValues.length) {
                    const landUseZoningFilter = LUC_ZONING_FELT_FILTER_MAP.get(currentLandUseZoningFilter[0]);
                    if (landUseZoningFilter) {
                        // @ts-expect-error
                        landUseZoningFilter[2] = currentLandUseZoningValues
                        allFeltFormattedFilters.push(landUseZoningFilter);
                    }
                }

                if (currentGeoFilteredValues.length) {
                    const currentGeoFilter = GEOGRAPHIC_FELT_FILTER_MAP.get(currentGeographicFilter[0])
                    if (currentGeoFilter) {
                        // @ts-expect-error
                        currentGeoFilter[2] = currentGeoFilteredValues
                        allFeltFormattedFilters.push(currentGeoFilter);
                    }
                }

                const newFilters = filterUtils.andMany(allFeltFormattedFilters);

                const layerToUpdate = THEME_TO_PARCEL_LAYER_MAP.get(currentTheme);

                if (layerToUpdate) {
                    await felt.setLayerFilters({
                        layerId: layerToUpdate,
                        filters: newFilters
                    });
                }
            }
        }

        updateLayerFilter().catch(console.error);
    }, [felt, currentTheme, currentFilters, currentFilterBuildDate, currentLandUseZoningFilter, currentLandUseZoningValues, currentGeographicFilter, currentGeoFilteredValues, currentFilterLivingUnitsCategory]);

    async function handleGeoFilterChange(value: string) {
        // @ts-expect-error
        setCurrentGeographicFilter(value);
        setCurrentGeoFilteredValues([]);
    }

    async function handleGeoFilterValueClick(value: Array<string>) {
        // @ts-expect-error
        setCurrentGeoFilteredValues(value);
    }

    async function handleLuZFilterChange(value: string) {
        // @ts-expect-error
        setCurrentLandUseZoningFilter(value);
        setCurrentLandUseZoningValues([]);
    }

    async function handleLandUseZoningFilterClick(value: Array<string>) {
        // @ts-expect-error
        setCurrentLandUseZoningValues(value);
    }

    async function handleYearBuiltInputChange(index: number, value: string) {
        if (value.length !== 4) {
            return;
        }
        const newValues = currentFilterBuildDate.map((val, i) => {
            if (i === index) {
                return parseInt(value, 10);
            } else {
                return val;
            }
        });
        return setCurrentFilterBuildDate(newValues);
    }

    async function removeFilter(value: (string | number)) {
        if (currentFilters.includes(value)) {
            setCurrentFilters(currentFilters.filter(v => v != value))
        }
        if (currentGeoFilteredValues.includes(value)) {
            setCurrentGeoFilteredValues(currentGeoFilteredValues.filter(v => v != value))
        }
        if (currentLandUseZoningValues.includes(value)) {
            setCurrentLandUseZoningValues(currentLandUseZoningValues.filter(v => v != value))
        }
        if (currentFilterLivingUnitsCategory.includes(value)) {
            setCurrentFilterLivingUnitsCategory(currentFilterLivingUnitsCategory.filter(v => v != value))
        }

        if (currentFilterBuildDate[0] === value[0] && currentFilterBuildDate[1] === value[1]) {
            setCurrentFilterBuildDate(DEFAULT_BUILT_YEAR_FILTERS);
        }
    }

    async function handleFilterClick(filter?: string) {
        if (!filter) {
            setCurrentFilters([]);
            setCurrentFilterBuildDate(DEFAULT_BUILT_YEAR_FILTERS);
            setCurrentFilterLivingUnitsCategory([]);
            setCurrentLandUseZoningFilter([]);
            setCurrentLandUseZoningValues([])
            setCurrentGeographicFilter([]);
            setCurrentGeoFilteredValues([]);
            // @ts-expect-error
        } else if ((filter === MFH_HOMES.filter && currentFilters.includes(SFH_HOMES.filter)) || (filter === SFH_HOMES.filter && currentFilters.includes(MFH_HOMES.filter))) {
            const newFilters: Array<any> = currentFilters.filter(item => item !== SFH_HOMES.filter && item !== MFH_HOMES.filter);
            newFilters.push(SFH_MFH_HOMES.filter);
            // @ts-expect-error
            setCurrentFilters(newFilters);
            // @ts-expect-error
        } else if (filter === MFH_HOMES.filter && currentFilters.includes(SFH_MFH_HOMES.filter)) {
            const newFilters: Array<any> = currentFilters.filter(item => item !== SFH_MFH_HOMES.filter);
            newFilters.push(SFH_HOMES.filter);
            // @ts-expect-error
            setCurrentFilters(newFilters);
            // @ts-expect-error
        } else if (filter === SFH_HOMES.filter && currentFilters.includes(SFH_MFH_HOMES.filter)) {
            const newFilters: Array<any> = currentFilters.filter(item => item !== SFH_MFH_HOMES.filter);
            newFilters.push(MFH_HOMES.filter);
            // @ts-expect-error
            setCurrentFilters(newFilters);
            // @ts-expect-error
        } else if (!currentFilters.includes(filter)) {
            // @ts-expect-error
            setCurrentFilters([...currentFilters, filter]);
        } else {
            setCurrentFilters(currentFilters.filter(x => x !== filter));
        }
    }

    return (
        <Stack>
            <Flex align="baseline" gap="4" wrap="wrap">
                <FilterSelection
                    currentFilters={currentFilters}
                    onFilterClick={handleFilterClick} />
                <Flex gap="1">
                    <DateRangeSlider
                        value={currentFilterBuildDate}
                        onDateSliderChange={setCurrentFilterBuildDate}
                        onDateInputChange={handleYearBuiltInputChange}
                    />
                    <LivingUnitsCategorySelect
                        value={currentFilterLivingUnitsCategory}
                        onSelectChange={setCurrentFilterLivingUnitsCategory} />
                    <GeographicFiltersSelect
                        geoFilter={currentGeographicFilter}
                        geoValues={currentGeoFilteredValues}
                        onFilterChange={handleGeoFilterChange}
                        onFilterValueChange={handleGeoFilterValueClick}
                    />
                    <LandUseCategorySelect
                        landUseZonFilter={currentLandUseZoningFilter}
                        luzValues={currentLandUseZoningValues}
                        onFilterChange={handleLuZFilterChange}
                        onFilterValueChange={handleLandUseZoningFilterClick} />
                </Flex>
            </Flex>
            <SelectedItems
                handleOnXClick={removeFilter}
                items={
                    itemLabels(
                        currentFilterBuildDate,
                        currentFilters,
                        currentGeographicFilter,
                        currentGeoFilteredValues,
                        currentFilterLivingUnitsCategory,
                        currentLandUseZoningFilter,
                        currentLandUseZoningValues)
                } />
        </Stack>
    )

}

export default FilterPane;
