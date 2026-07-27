import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    Flex,
    HStack,
    Stack,
    Theme,
} from "@chakra-ui/react";
import { LuRotateCcw } from "react-icons/lu";
import Joyride, { ACTIONS, EVENTS, CallBackProps } from "react-joyride";
import { FELT_MAP_ID } from "../constants";
import { useFeltEmbed } from "../feltUtils";

import { LoadingMap } from "../components/felt";
import { FilterPane } from "../components/filters";
import { Footer } from "../components/footer";
import {
    AggregationsSwitch,
    AlertMessage,
    FilterSwitch,
    HelpMenu,
    ThemeSelect,
} from "../components/header";
import { MPHLogo } from "../components/helpers";

import {
    EXPLORE,
    FILTERED_PARCEL_LAYER_ID,
    GROUP_LAYERS_TO_HIDE,
    LAYERS_TO_HIDE,
    THEME_TO_GROUP_LAYER_MAP,
    THEME_TO_PARCEL_LAYER_MAP,
    THEMES,
    THEMES_WITHOUT_AGGREGATIONS,
    TOUR_STEPS,
} from "../constants";

interface MainPageProps {
    token: string
}

const MainPage = ({ token }: MainPageProps) => {
    const [showFilters, setShowFilters] = useState(true);
    const [showAggregations, setShowAggregations] = useState(false);
    const [currentTheme, setCurrentTheme] = useState(EXPLORE);
    const [dataYear, setDataYear] = useState<null | number>(null);
    const [run, setRun] = useState(false);
    const [stepIndex, setStepIndex] = useState(0);
    // changing the key prop causes the component to re-render. This is used to reset the filters.
    const [filterKey, setFilterKey] = useState(0);

    const { felt, mapRef } = useFeltEmbed(FELT_MAP_ID, {
        token,
        uiControls: {
            cooperativeGestures: false,
            fullScreenButton: false,
            showLegend: true,
        },
    });

    const hasRanTour = localStorage.getItem("tour");
    if (!hasRanTour) {
        setRun(true);
    }

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
    }, [felt]);

    useEffect(() => {
        const updateLayerVisibility = async () => {
            if (felt) {
                const alwaysShowParcelLayer = THEMES_WITHOUT_AGGREGATIONS.includes(currentTheme)

                const allGroupLayers = new Map(THEME_TO_GROUP_LAYER_MAP);
                const groupsToShow = [];

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
                const layersToShow = [];

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

    async function handleThemeClick(theme: string) {
        setCurrentTheme(theme);
        if (showAggregations && THEMES_WITHOUT_AGGREGATIONS.includes(theme)) {
            setShowAggregations(false);
        }
        if (THEMES_WITHOUT_AGGREGATIONS.includes(theme)) {
            return setShowFilters(true);
        }
        if (showAggregations) {
            setShowFilters(false);
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

        // @ts-expect-error
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
                 // @ts-expect-error  idk what this typescript error is about... */
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
                    <Stack marginY="1">
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
                                            onClick={() => setFilterKey(filterKey => filterKey + 1)}
                                            variant="surface"
                                            size="xs"
                                        >
                                            <LuRotateCcw />
                                            RESET FILTERS
                                        </Button>
                                    </>}
                                {!THEMES_WITHOUT_AGGREGATIONS.includes(currentTheme) &&
                                    <AggregationsSwitch showAggregations={showAggregations} onButtonClick={setShowAggregations} />}
                                {/* <LoginButton />
                  <LogoutButton /> */}
                                <HelpMenu onResetTour={handleResetTour} />
                            </HStack>
                        </Flex>
                        {showFilters && <FilterPane key={filterKey} felt={felt} currentTheme={currentTheme} />}
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
                    {!felt && <LoadingMap />}
                </Box>
                <Footer dataYear={dataYear} />
            </Stack >
        </Theme >
    );
}

export default MainPage;
