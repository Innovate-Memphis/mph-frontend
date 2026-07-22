import {
    DEFAULT_BUILT_YEAR_FILTERS
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

    currentFilters.forEach(val => newLabels.push({ filter: val, label: val}));

    return newLabels;
}
