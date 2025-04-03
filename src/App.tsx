import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  StackSeparator,
  Spinner,
  Stack,
  Text,
  Theme,
  VStack,
} from "@chakra-ui/react";
import mphLogoUrl from './assets/mph_logo.png';
import { Filters } from "@feltmaps/js-sdk";
import { ThemeSelect } from "./components/ThemeSelect";
import { FilterSelection } from "./components/FilterSelection";
import { DateRangeSlider } from "./components/DateRangeSlider";
import { LandUseCategorySelect } from "./components/LandUseCategorySelect";
import { GeographicFiltersSelect } from "./components/GeographicFiltersSelect";
import { useFeltEmbed } from "./feltUtils";
import {
  DEFAULT_BUILT_YEAR_FILTERS,
  EXPLORE,
  FELT_MAP_ID,
  FILTERS_TO_FELT_FILTER,
  GEOGRAPHIC_FELT_FILTER_MAP,
  LAND_USE_CATEGORY_FILTER,
  MIN_YEAR_BUILT_FILTER,
  MAX_YEAR_BUILT_FILTER,
  THEME_TO_DEFAULT_FILTER_MAP,
  THEME_TO_GROUP_LAYER_MAP,
  THEME_TO_PARCEL_LAYER_MAP
} from "./constants";
import { filterUtils } from "./utils";
import { useState, useEffect } from "react";

export default function Page() {
  const { felt, mapRef } = useFeltEmbed(FELT_MAP_ID, {
    uiControls: {
      cooperativeGestures: false,
      fullScreenButton: false,
      showLegend: true,
    },
  });

  const [currentTheme, setCurrentTheme] = useState(EXPLORE);
  const [currentFilters, setCurrentFilters] = useState([]);
  const [currentFilterBuildDate, setCurrentFilterBuildDate] = useState(DEFAULT_BUILT_YEAR_FILTERS);
  const [currentFilterLandUseCategory, setCurrentFilterLandUseCategory] = useState([]);
  const [currentGeographicFilter, setCurrentGeographicFilter] = useState([]);
  const [currentGeoFilteredValues, setCurrentGeoFilteredValues] = useState([]);

  useEffect(() => {
    const updateLayerVisibility = async () => {
      if (felt) {
        let allGroupLayers = new Map(THEME_TO_GROUP_LAYER_MAP);
        const groupVisible = allGroupLayers.get(currentTheme);
        const groupsToShow = new Array();
        if (groupVisible) {
          groupsToShow.push(groupVisible);
        }

        if (currentTheme !== EXPLORE && !groupsToShow.length) {
          console.warn("ERROR: Group layer not found for theme");
          return;
        }

        allGroupLayers.delete(currentTheme)
        const groupsToHide = Array.from(allGroupLayers.values());

        await felt.setLayerGroupVisibility({
          show: groupsToShow,
          hide: groupsToHide,
        });

        await felt.setLayerGroupLegendVisibility({
          show: groupsToShow,
          hide: groupsToHide,
        });

        let allParcelLayers = new Map(THEME_TO_PARCEL_LAYER_MAP);
        const parcelsVisible = allParcelLayers.get(currentTheme);
        const layersToShow = new Array();
        if (parcelsVisible) {
          layersToShow.push(parcelsVisible);
        }

        if (currentTheme && !layersToShow.length) {
          console.warn("ERROR: Parcel layer not found for theme");
          return;
        }

        allParcelLayers.delete(currentTheme);
        const layersToHide = Array.from(allParcelLayers.values());

        await felt.setLayerVisibility({
          show: layersToShow,
          hide: layersToHide,
        });

        await felt.setLayerLegendVisibility({
          show: layersToShow,
          hide: layersToHide,
        });

        let themeFilter = THEME_TO_DEFAULT_FILTER_MAP.get(currentTheme);
        if (themeFilter) {
          // Reset all filters except theme filter
          // @ts-ignore
          setCurrentFilters([themeFilter]);
          setCurrentFilterBuildDate(DEFAULT_BUILT_YEAR_FILTERS);
          setCurrentFilterLandUseCategory([]);
          setCurrentGeographicFilter([]);
          setCurrentGeoFilteredValues([]);
        } else {
          setCurrentFilters([]);
        }
      }
    }

    updateLayerVisibility().catch(console.error);
  }, [felt, currentTheme]);

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

        const allParcelLayers = new Map(THEME_TO_PARCEL_LAYER_MAP).values();

        allParcelLayers.forEach(async (layerId) => {
          await felt.setLayerFilters({
            layerId: layerId,
            filters: newFilters
          });
        });

        if (currentTheme !== EXPLORE) {
          // const viewport = await felt.getViewport();
          // if (viewport.zoom < PARCEL_LAYERS_ZOOM_LEVEL) {
          //   felt.setViewport({
          //     zoom: PARCEL_LAYERS_ZOOM_LEVEL
          //   });
          // }
        }
      }
    }

    updateLayerFilter().catch(console.error);
  }, [felt, currentFilters, currentFilterBuildDate, currentFilterLandUseCategory, currentGeoFilteredValues])

  async function handleThemeClick(theme: string) {
    setCurrentTheme(theme);
  }

  async function handleGeoFilterValueClick(value: Array<string>) {
    // @ts-ignore
    setCurrentGeoFilteredValues(value);
  }

  async function handleFilterClick(filter?: string) {
    if (!filter) {
      setCurrentFilters([]);
      setCurrentFilterBuildDate(DEFAULT_BUILT_YEAR_FILTERS);
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

  return (
    <Theme appearance="light">
      <Stack direction="column" height="100vh" overflow="hidden" gap={0}>
        <Stack
          gap={0}
          borderRight="1px solid"
          borderColor="border.muted"
          userSelect="none"
          flexShrink={0}
          flexGrow={0}
          overflow="hidden"
          paddingTop="10px"
          paddingLeft="10px"
        >
          <Stack
            separator={<StackSeparator style={{ marginTop: "0" }} />}>
            <HStack>
              <img src={mphLogoUrl} style={{ width: "150px" }} />
              <ThemeSelect
                currentTheme={currentTheme}
                onThemeClick={handleThemeClick}
              />
              {currentTheme !== EXPLORE && (currentFilters.length > 0 || currentFilterBuildDate !== DEFAULT_BUILT_YEAR_FILTERS || currentFilterLandUseCategory.length > 0) &&
                <span style={{ fontStyle: "italic" }}>Filters do not apply to geographic aggregations</span>
              }
            </HStack>
            <Stack>
              <b><Text fontSize={12}>FILTERS</Text></b>
              <Flex justify="space-between" paddingBottom="2">
                <HStack>
                  <FilterSelection
                    currentFilters={currentFilters}
                    onFilterClick={handleFilterClick} />
                  <DateRangeSlider
                    value={currentFilterBuildDate}
                    onDateSliderChange={setCurrentFilterBuildDate} />
                  <LandUseCategorySelect
                    value={currentFilterLandUseCategory}
                    onSelectChange={setCurrentFilterLandUseCategory} />
                </HStack>
                <Button marginRight="5" onClick={() => handleFilterClick()} variant="subtle">Reset Filters</Button>
              </Flex>
              <HStack paddingBottom="2">
                <GeographicFiltersSelect
                  geoFilter={currentGeographicFilter}
                  geoValues={currentGeoFilteredValues}
                  onFilterChange={setCurrentGeographicFilter}
                  onFilterValueChange={handleGeoFilterValueClick}
                />
              </HStack>
            </Stack>
          </Stack>
        </Stack>
        <Box
          bg="gray.100"
          css={{
            "& > iframe": {
              position: "relative",
              zIndex: 1,
            },
          }}
          position="relative"
          ref={mapRef}
          flex={1}
        >
          {!felt && (
            <Center zIndex={0} position="absolute" inset={0}>
              <VStack gap={3}>
                <Spinner color="fg.subtle" />
                <Text fontSize="sm" color="fg.subtle">
                  Loading map&hellip;
                </Text>
              </VStack>
            </Center>
          )}
        </Box>
      </Stack >
    </Theme >
  );
}
