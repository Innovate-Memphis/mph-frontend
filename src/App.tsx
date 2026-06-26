import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  HStack,
  Link,
  StackSeparator,
  Spinner,
  Stack,
  Text,
  Theme,
  VStack,
} from "@chakra-ui/react";
import { LuRotateCcw } from "react-icons/lu";
import { Filters } from "@feltmaps/js-sdk";
import Joyride, { ACTIONS, EVENTS, CallBackProps } from 'react-joyride';
import { useAuth0 } from '@auth0/auth0-react';
import LogRocket from 'logrocket';

import { ThemeSelect } from "./components/ThemeSelect";
import { FilterSelection } from "./components/FilterSelection";
import { FilterSwitch } from "./components/FilterSwitch";
import { AggregationsSwitch } from "./components/AggregationsSwitch";
import { DateRangeSlider } from "./components/DateRangeSlider";
import { LivingUnitsCategorySelect } from "./components/LivingUnitsCategorySelect";
import { LandUseCategorySelect } from "./components/LandUseCategorySelect";
import { GeographicFiltersSelect } from "./components/GeographicFiltersSelect";
import { HelpMenu } from "./components/HelpMenu";
import { MPHLogo } from "./components/MPHLogo";

// @ts-ignore
import { AlertMessage } from "./components/AlertMessage";
// @ts-ignore
import LoginButton from "./components/LoginButton";
// @ts-ignore
import SignupButton from "./components/SignupButton";
// @ts-ignore
import RequestAccessButton from "./components/RequestAccessButton";

import { useFeltEmbed } from "./feltUtils";
import {
  DEFAULT_BUILT_YEAR_FILTERS,
  EXPLORE,
  FAQ_LINK,
  FAQ_LINK_TEXT,
  FELT_MAP_ID,
  FILTERED_PARCEL_LAYER_ID,
  FILTERS_TO_FELT_FILTER,
  GEOGRAPHIC_FELT_FILTER_MAP,
  GROUP_LAYERS_TO_HIDE,
  LIVING_UNITS_CATEGORY_FILTER,
  LUC_ZONING_FELT_FILTER_MAP,
  LAYERS_TO_HIDE,
  LOGIN_FAILURE_MESSAGE,
  MIN_YEAR_BUILT_FILTER,
  MAX_YEAR_BUILT_FILTER,
  MFH_HOMES,
  SFH_HOMES,
  SFH_MFH_HOMES,
  THEME_TO_GROUP_LAYER_MAP,
  THEME_TO_PARCEL_LAYER_MAP,
  THEMES,
  THEMES_WITHOUT_AGGREGATIONS,
  TOUR_STEPS,
} from "./constants";
import { filterUtils } from "./utils";
import { useState, useEffect } from "react";

export default function Page() {

  LogRocket.init('al94sq/memphis-property-hub');

  const { isLoading, isAuthenticated, error, user } = useAuth0();

  const queryString = window.location.search;

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.log(`Error occured: ${error}`);
    // error.message === "user_not_allowed"
    return (
      <Stack height="100vh" align="center" justify="center" padding="10" gap="5">
        <div>
          {LOGIN_FAILURE_MESSAGE}
          <a style={{ "color": "blue" }} href={FAQ_LINK}>{FAQ_LINK_TEXT}</a>
        </div>
        <RequestAccessButton />
      </Stack>);
  }

  if (queryString === "?signup") {
    return (
      <Stack height="100vh" align="center" justify="center" gap="5">
        <MPHLogo width="250px" />
        <SignupButton />
      </Stack>
    )
  }

  if (!isAuthenticated) {
    return (
      <Stack height="100vh" align="center" justify="center" gap="5">
        <MPHLogo width="250px" />
        <LoginButton />
        <RequestAccessButton />
        <span>Need help? Please visit our <a style={{ "color": "blue" }} href={FAQ_LINK}>{FAQ_LINK_TEXT}</a></span>
      </Stack>
    )
  }

  if (user?.email) {
    LogRocket.identify(user.email);
  }

  let token;
  if (user?.feltToken) {
    token = user.feltToken
  }

  const { felt, mapRef } = useFeltEmbed(FELT_MAP_ID, {
    token,
    uiControls: {
      cooperativeGestures: false,
      fullScreenButton: false,
      showLegend: true,
    },
  });

  const [showFilters, setShowFilters] = useState(true);
  const [showAggregations, setShowAggregations] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(EXPLORE);
  const [currentFilters, setCurrentFilters] = useState([]);
  const [currentFilterBuildDate, setCurrentFilterBuildDate] = useState(DEFAULT_BUILT_YEAR_FILTERS);
  const [currentFilterLivingUnitsCategory, setCurrentFilterLivingUnitsCategory] = useState([]);
  const [currentFilterLandUseCategory, setCurrentFilterLandUseCategory] = useState([]);
  const [currentLandUseZoningFilter, setcurrentLandUseZoningFilter] = useState([]);
  const [currentLandUseZoningValues, setcurrentLandUseZoningValues] = useState([]);
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
        const alwaysShowParcelLayer = THEMES_WITHOUT_AGGREGATIONS.includes(currentTheme)

        const allGroupLayers = new Map(THEME_TO_GROUP_LAYER_MAP);
        const groupsToShow = new Array();

        if (showAggregations && !alwaysShowParcelLayer) {
          const groupForTheme = allGroupLayers.get(currentTheme);
          groupsToShow.push(groupForTheme);
          allGroupLayers.delete(currentTheme)
        }
        let groupsToHide = Array.from(allGroupLayers.values());
        groupsToHide = groupsToHide.concat(GROUP_LAYERS_TO_HIDE);

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

        let layersToHide = Array.from(allParcelLayers.values());
        layersToHide = layersToHide.concat(LAYERS_TO_HIDE)

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

        if (currentFilterLivingUnitsCategory.length) {
          let livingUnitsCategoryFilter = LIVING_UNITS_CATEGORY_FILTER;
          // @ts-ignore
          livingUnitsCategoryFilter[2] = currentFilterLivingUnitsCategory
          allFeltFormattedFilters.push(livingUnitsCategoryFilter)
        }

        if (currentLandUseZoningValues.length) {
          let landUseZoningFilter = LUC_ZONING_FELT_FILTER_MAP.get(currentLandUseZoningFilter[0]);
          if (landUseZoningFilter) {
            // @ts-ignore
            landUseZoningFilter[2] = currentLandUseZoningValues
            allFeltFormattedFilters.push(landUseZoningFilter);
          }
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
  }, [felt, currentFilters, currentFilterBuildDate, currentFilterLandUseCategory, currentGeoFilteredValues, currentFilterLivingUnitsCategory, currentLandUseZoningValues])

  useEffect(() => {
    if (showAggregations && THEMES_WITHOUT_AGGREGATIONS.includes(currentTheme)) {
      return setShowAggregations(false);
    }

    if (THEMES_WITHOUT_AGGREGATIONS.includes(currentTheme)) {
      return setShowFilters(true);
    }

    if (showAggregations) {
      return setShowFilters(false);
    }
  }, [showAggregations, currentTheme]);

  async function handleThemeClick(theme: string) {
    setCurrentTheme(theme);
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

  async function handleLandUseZoningFilterClick(value: Array<string>) {
    // @ts-ignore
    setcurrentLandUseZoningValues(value);
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

  async function handleFilterClick(filter?: string) {
    if (!filter) {
      setCurrentFilters([]);
      setCurrentFilterBuildDate(DEFAULT_BUILT_YEAR_FILTERS);
      setCurrentFilterLivingUnitsCategory([]);
      setCurrentFilterLandUseCategory([]);
      setcurrentLandUseZoningFilter([]);
      setCurrentGeographicFilter([]);
      setCurrentGeoFilteredValues([]);
      // @ts-ignore
    } else if ((filter === MFH_HOMES.filter && currentFilters.includes(SFH_HOMES.filter)) || (filter === SFH_HOMES.filter && currentFilters.includes(MFH_HOMES.filter))) {
      let newFilters: Array<any> = currentFilters.filter(item => item !== SFH_HOMES.filter && item !== MFH_HOMES.filter);
      newFilters.push(SFH_MFH_HOMES.filter);
      // @ts-ignore
      setCurrentFilters(newFilters);
      // @ts-ignore
    } else if (filter === MFH_HOMES.filter && currentFilters.includes(SFH_MFH_HOMES.filter)) {
      let newFilters: Array<any> = currentFilters.filter(item => item !== SFH_MFH_HOMES.filter);
      newFilters.push(SFH_HOMES.filter);
      // @ts-ignore
      setCurrentFilters(newFilters);
      // @ts-ignore
    } else if (filter === SFH_HOMES.filter && currentFilters.includes(SFH_MFH_HOMES.filter)) {
      let newFilters: Array<any> = currentFilters.filter(item => item !== SFH_MFH_HOMES.filter);
      newFilters.push(MFH_HOMES.filter);
      // @ts-ignore
      setCurrentFilters(newFilters);
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
      setShowFilters(false);
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
      setCurrentTheme(THEMES[2].theme) // Evictions Theme
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
          paddingLeft="10px"
        >
          <Stack
            separator={<StackSeparator style={{ marginTop: "0" }} />}>
            <AlertMessage />
            <Flex justify="space-between" paddingRight="10px">
              <HStack>
                <MPHLogo width="150px" />
                <ThemeSelect
                  currentTheme={currentTheme}
                  onThemeClick={handleThemeClick}
                />
              </HStack>
              <HStack>
                {!showAggregations &&
                  <>
                    <FilterSwitch showFilters={showFilters} onButtonClick={setShowFilters} />
                    <Button
                      marginRight="5"
                      onClick={() => handleFilterClick()}
                      variant="outline"
                      size="xs"
                      colorPalette="red"
                    >
                      <LuRotateCcw />
                      RESET FILTERS
                    </Button>
                  </>
                }
                {!THEMES_WITHOUT_AGGREGATIONS.includes(currentTheme) &&
                  <AggregationsSwitch showAggregations={showAggregations} onButtonClick={setShowAggregations} />}
                {/* <LoginButton />
                  <LogoutButton /> */}
                <HelpMenu onResetTour={handleResetTour} />
              </HStack>
            </Flex>
            {showFilters &&
              <Stack>
                <Flex align="baseline" gap="4" wrap="wrap" paddingBottom="2">
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
                      onFilterChange={setCurrentGeographicFilter}
                      onFilterValueChange={handleGeoFilterValueClick}
                    />
                    <LandUseCategorySelect
                      landUseZonFilter={currentLandUseZoningFilter}
                      luzValues={currentLandUseZoningValues}
                      onFilterChange={setcurrentLandUseZoningFilter}
                      onFilterValueChange={handleLandUseZoningFilterClick} />
                  </Flex>
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
          <HStack justify="space-between">
            {dataYear && <Text textStyle="sm">Currently viewing data for {dataYear}</Text>}
            <Text textStyle="sm">Like what you see? <Link colorPalette="green" variant="underline" href="https://secure.givelively.org/donate/mayors-institute-for-excellence-in-government-inc/memphis-property-hub" target="_blank">Help sustain our work!</Link></Text>
          </HStack>
        </Box>
      </Stack >
    </Theme >
  );
}
