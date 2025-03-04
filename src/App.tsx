import {
  Box,
  Center,
  HStack,
  Separator,
  Spinner,
  Stack,
  Text,
  Theme,
  VStack,
} from "@chakra-ui/react";

import { FeltController } from "@feltmaps/js-sdk";
import { LayersList } from "./components/LayersList";
import { ViewportInfo } from "./components/ViewportInfo";
import { ThemeSelect } from "./components/ThemeSelect";
import { FilterSelect } from "./components/FilterSelect";
import { FeltContext, useFeltEmbed } from "./feltUtils";
import { FILTERS_TO_FELT_FILTER, THEME_TO_GROUP_LAYER_MAP, THEME_TO_PARCEL_LAYER_MAP } from "./constants";
import { useState, useEffect } from "react";

export default function Page() {
  const { felt, mapRef } = useFeltEmbed("p9CPdaItsRQm9COaGzgt17WB", {
    uiControls: {
      cooperativeGestures: false,
      fullScreenButton: false,
      showLegend: true,
    },
  });

  const [currentTheme, setCurrentTheme] = useState("");
  const [currentFilter, setCurrentFilter] = useState("");

  useEffect(() => {
    const updateLayerVisibility = async () => {
      if (felt) {
        let allGroupLayers = new Map(THEME_TO_GROUP_LAYER_MAP);
        const groupVisible = allGroupLayers.get(currentTheme);
        const groupsToShow = new Array();
        if (groupVisible) {
          groupsToShow.push(groupVisible);
        }

        if (currentTheme && !groupsToShow.length) {
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

        allParcelLayers.delete(currentTheme)
        const layersToHide = Array.from(allParcelLayers.values())

        // The following is debug code - I'm trying to hide 3 layers from the legend upon app load and can't figure it out
        const items = await felt.getLegendItems();
        // This doesn't return anything

        const items2 = await felt.getLegendItems({ layerIds: ["f0ejhfquQumj9AErURSWWcD"] })
        // evictions by parcel layer ID - f0ejhfquQumj9AErURSWWcD
        // Also doesn't return anything

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

        let allLayerFilters = new Map(FILTERS_TO_FELT_FILTER);
        const layerFilter = allLayerFilters.get(currentFilter) ?? null;

        // TODO: CLEAN UP HARD_CODING
        await felt.setLayerFilters({
          layerId: "f0ejhfquQumj9AErURSWWcD", //evictions
          filters: layerFilter
        });

        await felt.setLayerFilters({
          layerId: "DnA76OKlSseShttdvQj6DA", //vacancy
          filters: layerFilter
        });

        await felt.setLayerFilters({
          layerId: "jKGugNqhTeCtLtxUlCghaD", //ownership
          filters: layerFilter
        });
      }
    }

    updateLayerFilter().catch(console.error);
  }, [felt, currentFilter])

  async function handleThemeClick(theme: string) {
    setCurrentTheme(theme);
  }

  async function handleFilterClick(filter: string) {
    setCurrentFilter(filter);
  }

  return (
    <Theme appearance="light">
      <Stack direction="column" height="100vh" overflow="hidden" gap={0}>
        <Stack
          gap={0}
          borderRight="1px solid"
          borderColor="border.muted"
          userSelect="none"
          w="320px"
          flexShrink={0}
          flexGrow={0}
          overflow="hidden"
        >
          <HStack
            padding="5px">
            <ThemeSelect
              currentTheme={currentTheme}
              onThemeClick={handleThemeClick}
            />
            <FilterSelect
              currentFilter={currentFilter}
              onFilterClick={handleFilterClick}
            />
          </HStack>
          {/* <FeltSidebar felt={felt} /> */}
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
      </Stack>
    </Theme>
  );
}

function FeltSidebar({ felt }: { felt: FeltController | null }) {
  return (
    <Stack
      flex={1}
      gap={0}
      fontSize="md"
      overflow="hidden"
      separator={
        <Separator borderColor="border.muted" css={{ margin: "0!important" }} />
      }
    >
      {felt ? (
        <FeltContext.Provider value={felt}>
          <Stack flex={1} gap={0} overflow="hidden">
            <LayersList />
          </Stack>

          <Stack flexGrow={0} flexShrink={0} gap={0} overflow="hidden">
            <ViewportInfo />
          </Stack>
        </FeltContext.Provider>
      ) : (
        <VStack py={8} gap={3}>
          <Spinner color="fg.subtle" alignSelf="center" />
          <Text fontSize="sm" color="fg.subtle">
            Loading&hellip;
          </Text>
        </VStack>
      )}
    </Stack>
  );
}
