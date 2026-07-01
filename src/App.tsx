import {
  Box,
  Center,
  Flex,
  HStack,
  Link,
  StackSeparator,
  Spinner,
  Stack,
  Text,
  Theme,
  VStack,
} from "@chakra-ui/react";
import Joyride, { ACTIONS, EVENTS, CallBackProps } from 'react-joyride';
import { useAuth0 } from '@auth0/auth0-react';
import LogRocket from 'logrocket';

import { ThemeSelect } from "./components/ThemeSelect";
import { FilterSwitch } from "./components/FilterSwitch";
import { AggregationsSwitch } from "./components/AggregationsSwitch";
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
import { FilterPane } from "./components/FilterPane";

import { useFeltEmbed } from "./feltUtils";
import {
  EXPLORE,
  FAQ_LINK,
  FAQ_LINK_TEXT,
  FELT_MAP_ID,
  FILTERED_PARCEL_LAYER_ID,
  GROUP_LAYERS_TO_HIDE,
  LAYERS_TO_HIDE,
  LOGIN_FAILURE_MESSAGE,
  THEME_TO_GROUP_LAYER_MAP,
  THEME_TO_PARCEL_LAYER_MAP,
  THEMES,
  THEMES_WITHOUT_AGGREGATIONS,
  TOUR_STEPS,
} from "./constants";
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
          <a style={{"color": "blue"}} href={FAQ_LINK}>{FAQ_LINK_TEXT}</a>
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
        <span>Need help? Please visit our <a style={{"color": "blue"}} href={FAQ_LINK}>{FAQ_LINK_TEXT}</a></span>
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
          paddingTop="10px"
          paddingLeft="10px"
        >
          <Stack
            separator={<StackSeparator style={{ marginTop: "0" }} />}>
            <AlertMessage />
            <Flex justify="space-between" marginBottom="5px" paddingRight="10px">
              <HStack>
                <MPHLogo width="150px" />
                <ThemeSelect
                  currentTheme={currentTheme}
                  onThemeClick={handleThemeClick}
                />
              </HStack>
              <HStack>
                {!showAggregations &&
                  <FilterSwitch showFilters={showFilters} onButtonClick={setShowFilters} />}
                {!THEMES_WITHOUT_AGGREGATIONS.includes(currentTheme) &&
                  <AggregationsSwitch showAggregations={showAggregations} onButtonClick={setShowAggregations} />}
                {/* <LoginButton />
                  <LogoutButton /> */}
                <HelpMenu onResetTour={handleResetTour} />
              </HStack>
            </Flex>
            {showFilters && <FilterPane felt={felt} currentTheme={currentTheme} />}
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
