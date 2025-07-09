import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
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
import Joyride, { ACTIONS, EVENTS, CallBackProps } from 'react-joyride';

import { ThemeSelect } from "./components/ThemeSelect";
import { FilterSelection } from "./components/FilterSelection";
import { FilterSwitch } from "./components/FilterSwitch";
import { AggregationsSwitch } from "./components/AggregationsSwitch";
import { DateRangeSlider } from "./components/DateRangeSlider";
import { LivingUnitsSlider } from "./components/LivingUnitsSlider";
import { LandUseCategorySelect } from "./components/LandUseCategorySelect";
import { GeographicFiltersSelect } from "./components/GeographicFiltersSelect";
import { HelpMenu } from "./components/HelpMenu";
// import LoginButton from "./components/LoginButton";
// import LogoutButton from "./components/LogoutButton";

import { useFeltEmbed } from "./feltUtils";
import {
  DEFAULT_BUILT_YEAR_FILTERS,
  DEFAULT_UNITS_FILTERS,
  EXPLORE,
  FELT_MAP_ID,
  FILTERED_PARCEL_LAYER_ID,
  FILTERS_TO_FELT_FILTER,
  GEOGRAPHIC_FELT_FILTER_MAP,
  LAND_USE_CATEGORY_FILTER,
  MIN_YEAR_BUILT_FILTER,
  MAX_YEAR_BUILT_FILTER,
  THEME_TO_GROUP_LAYER_MAP,
  THEME_TO_PARCEL_LAYER_MAP,
  THEMES,
  TOUR_STEPS,
  MIN_UNITS_FILTER,
  MAX_UNITS_FILTER,
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

  const [showFilters, setShowFilters] = useState(false);
  const [showAggregations, setShowAggregations] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(EXPLORE);
  const [currentFilters, setCurrentFilters] = useState([]);
  const [currentFilterBuildDate, setCurrentFilterBuildDate] = useState(DEFAULT_BUILT_YEAR_FILTERS);
  const [currentFilterUnits, setCurrentFilterUnits] = useState(DEFAULT_UNITS_FILTERS);
  const [currentFilterLandUseCategory, setCurrentFilterLandUseCategory] = useState([]);
  const [currentGeographicFilter, setCurrentGeographicFilter] = useState([]);
  const [currentGeoFilteredValues, setCurrentGeoFilteredValues] = useState([]);
  const [dataYear, setDataYear] = useState<null | number>(null);
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const getMaxYearData = async () => {
      if (felt) {
        const { max } = await felt.getAggregates({
          layerId: FILTERED_PARCEL_LAYER_ID,
          aggregation: {
            methods: ["max"],
            attribute: "taxyr"
          }
        });
        setDataYear(max);
      }
    }
    getMaxYearData();

    const hasRanTour = localStorage.getItem("tour");
    if (!hasRanTour) {
      setRun(true);
    }
  }, [felt]);

  useEffect(() => {
    const updateLayerVisibility = async () => {
      if (felt) {
        const alwaysShowParcelLayer = currentTheme === EXPLORE

        const allGroupLayers = new Map(THEME_TO_GROUP_LAYER_MAP);
        const groupsToShow = new Array();

        if (showAggregations && !alwaysShowParcelLayer) {
          const groupForTheme = allGroupLayers.get(currentTheme);
          groupsToShow.push(groupForTheme);
          allGroupLayers.delete(currentTheme)
        }
        const groupsToHide = Array.from(allGroupLayers.values());

        await felt.setLayerGroupVisibility({
          show: groupsToShow,
          hide: groupsToHide,
        });

        await felt.setLayerGroupLegendVisibility({
          show: groupsToShow,
          hide: groupsToHide,
        });

        const allParcelLayers = new Map(THEME_TO_PARCEL_LAYER_MAP);
        const layersToShow = new Array();

        if (!showAggregations || alwaysShowParcelLayer) {
          const layerForTheme = allParcelLayers.get(currentTheme);
          layersToShow.push(layerForTheme);
          allParcelLayers.delete(currentTheme);
        }

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
  }, [felt, currentTheme, showAggregations]);

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

        if (currentFilterUnits[0] !== DEFAULT_UNITS_FILTERS[0]) {
          let minUnitsFilter = MIN_UNITS_FILTER;
          // @ts-ignore
          minUnitsFilter[2] = currentFilterUnits[0]
          allFeltFormattedFilters.push(minUnitsFilter)
        }

        if (currentFilterUnits[1] !== DEFAULT_UNITS_FILTERS[1]) {
          let maxUnitsFilter = MAX_UNITS_FILTER;
          // @ts-ignore
          maxUnitsFilter[2] = currentFilterUnits[1]
          allFeltFormattedFilters.push(maxUnitsFilter)
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
  }, [felt, currentFilters, currentFilterBuildDate, currentFilterLandUseCategory, currentGeoFilteredValues])

  useEffect(() => {
    if (showAggregations) {
      return setShowFilters(false);
    }

    if (currentTheme !== EXPLORE) {
      return setShowFilters(true);
    }
  }, [showAggregations, currentTheme]);

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

  function handleResetTour() {
    localStorage.removeItem("tour")
    setRun(true);
  }

  const handleJoyrideCallback = async (data: CallBackProps) => {
    const { action, index, step, type } = data;

    if (action === ACTIONS.START) {
      localStorage.setItem("tour", "ok");
    }

    if (action === ACTIONS.CLOSE && type === "step:after" && step.target === ".view-trends") {
      setShowAggregations(true);
    }

    if (action === ACTIONS.CLOSE && type === "step:after" && step.target === ".view-parcels") {
      setShowAggregations(false);
    }

    if (action === ACTIONS.CLOSE && type === "step:after" && step.target === "#filter") {
      setShowFilters(true)
    }

    if (action === ACTIONS.CLOSE && type === "step:after" && step.target === "#theme-tabs") {
      setCurrentTheme(THEMES[2]) // Evictions Theme
    }

    if (action === ACTIONS.CLOSE && type === "step:after" && step.target === "button[data-uid='help-menu']") {
      setCurrentTheme(EXPLORE)
    }

    // @ts-ignore
    if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
      // Update state to advance the tour
      setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1));
    }
  }

return (
  <Theme appearance="light">
    <Joyride
     callback={handleJoyrideCallback}
     run={run}
     stepIndex={stepIndex}
     /*
      // @ts-ignore  idk what this typescript error is about... */
     steps={TOUR_STEPS}
    />
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
          <Flex justify="space-between" marginBottom="5px" paddingRight="10px">
            <HStack>
              <img src={mphLogoUrl} style={{ width: "150px" }} />
              <ThemeSelect
                currentTheme={currentTheme}
                onThemeClick={handleThemeClick}
              />
            </HStack>
            <HStack>
              {!showAggregations &&
                <FilterSwitch showFilters={showFilters} onButtonClick={setShowFilters} />}
              {currentTheme !== EXPLORE &&
                <AggregationsSwitch showAggregations={showAggregations} onButtonClick={setShowAggregations} />}
              {/* <LoginButton />
                  <LogoutButton /> */}
              <HelpMenu onResetTour={handleResetTour} />
            </HStack>
          </Flex>
          {showFilters &&
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
                      <LivingUnitsSlider
                        value={currentFilterUnits}
                        onUnitsSliderChange={setCurrentFilterUnits} />
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
                        onFilterChange={setCurrentGeographicFilter}
                        onFilterValueChange={handleGeoFilterValueClick}
                      />
                    </GridItem>
                  </Grid>
                </Flex>
                <Button marginRight="5" onClick={() => handleFilterClick()} variant="subtle">Reset Filters</Button>
              </Flex>
            </Stack>}
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
      <Box padding="2">
        {dataYear && <Text textStyle="sm">Currently viewing data for {dataYear}</Text>}
      </Box>
    </Stack >
  </Theme >
);
}
