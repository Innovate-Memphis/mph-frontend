import {
  Box,
  Center,
  Heading,
  HStack,
  StackSeparator,
  Spinner,
  Stack,
  Text,
  Theme,
  VStack,
} from "@chakra-ui/react";

import { Filters } from "@feltmaps/js-sdk";
import { ThemeSelect } from "./components/ThemeSelect";
import { FilterSelection } from "./components/FilterSelection";
import { DateRangeSlider } from "./components/DateRangeSlider";
import { LandUseCategorySelect } from "./components/LandUseCategorySelect";
import { useFeltEmbed } from "./feltUtils";
import {
  DEFAULT_BUILT_YEAR_FILTERS,
  EXPLORE,
  FELT_MAP_ID,
  FILTERS_TO_FELT_FILTER,
  LAND_USE_CATEGORY_FILTER,
  MIN_YEAR_BUILT_FILTER,
  MAX_YEAR_BUILT_FILTER,
  PARCEL_LAYERS_ZOOM_LEVEL,
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

        const newFilters = filterUtils.andMany(allFeltFormattedFilters);

        const allParcelLayers = new Map(THEME_TO_PARCEL_LAYER_MAP).values();

        allParcelLayers.forEach(async (layerId) => {
          await felt.setLayerFilters({
            layerId: layerId,
            filters: newFilters
          });
        });

        if (currentTheme !== EXPLORE) {
          const viewport = await felt.getViewport();
          if (viewport.zoom < PARCEL_LAYERS_ZOOM_LEVEL) {
            felt.setViewport({
              zoom: PARCEL_LAYERS_ZOOM_LEVEL
            });
          }
        }
      }
    }

    updateLayerFilter().catch(console.error);
  }, [felt, currentFilters, currentFilterBuildDate, currentFilterLandUseCategory])

  async function handleThemeClick(theme: string) {
    setCurrentTheme(theme);
  }

  async function handleFilterClick(filter?: string) {
    if (!filter) {
      setCurrentFilters([]);
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
          padding="10px"
        >
          <HStack
            gap="25px"
            separator={<StackSeparator />}>
            <Stack>
              <Heading>Explore parcels or select a theme:</Heading>
              <ThemeSelect
                currentTheme={currentTheme}
                onThemeClick={handleThemeClick}
              />
              {currentTheme !== EXPLORE && (currentFilters.length > 0 || currentFilterBuildDate !== DEFAULT_BUILT_YEAR_FILTERS || currentFilterLandUseCategory.length > 0) &&
                <span style={{ fontStyle: "italic" }}>Filters do not apply to geographic aggregations</span>
              }
            </Stack>
            <Stack>
              <Heading>Filter Properties by:</Heading>
              <FilterSelection
                currentFilters={currentFilters}
                onFilterClick={handleFilterClick} />
              <HStack gap="15px">
                <DateRangeSlider
                  value={currentFilterBuildDate}
                  onDateSliderChange={setCurrentFilterBuildDate} />
                <LandUseCategorySelect
                  value={currentFilterLandUseCategory}
                  onSelectChange={setCurrentFilterLandUseCategory} />
              </HStack>
            </Stack>
          </HStack>
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
