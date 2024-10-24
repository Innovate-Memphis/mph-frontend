import {
  Box,
  Center,
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
import { FeltContext, useFeltEmbed } from "./feltUtils";

export default function Page() {
  const { felt, mapRef } = useFeltEmbed("w9BxV0EmdR2u5C4AyrTke9CB", {
    uiControls: {
      cooperativeGestures: false,
      fullScreenButton: false,
      showLegend: false,
    },
  });

  return (
    <Theme appearance="light">
      <Stack direction="row" height="100vh" overflow="hidden" gap={0}>
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
          <FeltSidebar felt={felt} />
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
