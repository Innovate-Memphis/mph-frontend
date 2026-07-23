// This is very ugly code
// Ideally this would be refactored completely
// and in the Constants file, FILTERS would be set up more like this:
// filters = [{ name: FILTER, label: "Display Value", feltFilter: RECENT_SALE_FILTER, defaultValue: null, options: ZIPCODE_OPTIONS }]


import {
    DEFAULT_BUILT_YEAR_FILTERS,
    ALL_FILTERS,
} from "../../constants";

export const itemLabels = (
    currentFilterBuildDate,
    currentFilters,
    currentGeographicFilter,
    currentGeoFilteredValues,
    currentFilterLivingUnitsCategory,
    currentLandUseZoningFilter,
    currentLandUseZoningValues,
) => {
    const newLabels = [];
    if (currentFilterBuildDate[0] !== DEFAULT_BUILT_YEAR_FILTERS[0] || currentFilterBuildDate[1] !== DEFAULT_BUILT_YEAR_FILTERS[1]) {
        newLabels.push({ filter: currentFilterBuildDate, label: `Built Date: ${currentFilterBuildDate[0]} - ${currentFilterBuildDate[1]}`});
    }

    currentFilterLivingUnitsCategory.forEach(category => newLabels.push({ filter: category, label: `Living Units: ${category}`}));

    currentGeoFilteredValues.forEach(val => newLabels.push({ filter: val, label: `${currentGeographicFilter}: ${val}`}));

    currentLandUseZoningValues.forEach(val => newLabels.push({ filter: val, label: `${currentLandUseZoningFilter}: ${val}`}));

    currentFilters.forEach(val => newLabels.push({ filter: val, label: ALL_FILTERS.find(filter => filter.filter === val)?.buttonTitle}));

    return newLabels;
}
