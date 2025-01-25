import {
  Box,
  Collapsible,
  For,
  Heading,
  HStack,
  IconButton,
  Separator,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Layer, LayerGroup } from "@feltmaps/js-sdk";
import { useQuery } from "@tanstack/react-query";
import {
  Eye,
  EyeOff,
  Image,
  Layers,
  MapPin,
  Minus,
  Pentagon,
} from "lucide-react";
import {
  assembleLayerTree,
  useFelt,
  useLiveLayer,
  useLiveLayerGroup,
} from "../feltUtils";

export function LayersList() {
  const felt = useFelt();

  const layersQuery = useQuery({
    queryKey: ["layers"],
    queryFn: async () => {
      return Promise.all([
        felt.getLayers().then((layers) => layers.filter(Boolean) as Layer[]),
        felt
          .getLayerGroups()
          .then((groups) => groups.filter(Boolean) as LayerGroup[]),
      ]).then(([layers, layerGroups]) => {
        console.log(layers)
        console.log(layerGroups)
        return assembleLayerTree(layers, layerGroups)
      }
      );
    },
  });

  return (
    <Stack flex={1} gap={0} overflow="hidden">
      <Heading fontSize="md" p={3} py={2} fontWeight="bold">
        Layers
      </Heading>
      <Separator borderColor="border.muted" css={{ margin: "0!important" }} />
      <Stack
        flex={1}
        overflow="hidden"
        overflowY="auto"
        separator={
          <Separator
            borderColor="border.muted"
            css={{ marginBlock: "0!important" }}
          />
        }
      >
        {layersQuery.isLoading && <Spinner alignSelf="center" my={8} />}
        {layersQuery.data &&
          layersQuery.data.map((n) => {
            if (n.type === "layer") {
              return <LayerItem layer={n.layer} key={n.layer.id} />;
            }

            return (
              <LayerGroupItem
                group={n.group}
                layers={n.layers}
                key={n.group.id}
              />
            );
          })}
      </Stack>
    </Stack>
  );
}

function LayerGroupItem({
  group: initialGroup,
  layers,
}: {
  group: LayerGroup;
  layers: Layer[];
}) {
  const felt = useFelt();
  const group = useLiveLayerGroup(felt, initialGroup);
  if (!group) return null;

  return (
    <Stack gap={0} opacity={group.visible ? undefined : 0.4}>
      <HStack
        _hover={{
          "& .layer-visibility-button": {
            visibility: "visible",
          },
        }}
        p={3}
        py={2}
        overflow="hidden"
      >
        <Heading
          flex={1}
          overflow="hidden"
          truncate
          fontSize="md"
          fontWeight="bold"
        >
          {group.name}
        </Heading>
        <IconButton
          className="layer-visibility-button"
          visibility={"hidden"}
          my={-1.5}
          mr={-1.5}
          size="xs"
          variant="ghost"
          onClick={(e) => {
            if (group.visible) {
              felt.setLayerGroupVisibility({ hide: [group.id] });
            } else {
              felt.setLayerGroupVisibility({ show: [group.id] });
            }
          }}
          aria-label={group.visible ? "Hide layer group" : "Show layer group"}
        >
          {group.visible ? <Eye /> : <EyeOff />}
        </IconButton>
      </HStack>
      <Collapsible.Root open={group.visible}>
        <Collapsible.Content as={Stack} gap={0}>
          <For each={layers}>{(l) => <LayerItem layer={l} key={l.id} />}</For>
        </Collapsible.Content>
      </Collapsible.Root>
    </Stack>
  );
}

function LayerItem({ layer }: { layer: Layer }) {
  const felt = useFelt();

  const currentLayer = useLiveLayer(felt, layer);
  if (!currentLayer) return null;

  const Icon = (function (type: Layer["geometryType"]) {
    switch (type) {
      case "Polygon":
        return Pentagon;
      case "Point":
        return MapPin;
      case "Line":
        return Minus;
      case "Raster":
        return Image;
    }

    return Layers;
  })(currentLayer.geometryType);

  return (
    <HStack
      _hover={{
        "& .layer-visibility-button": {
          visibility: "visible",
        },
      }}
      opacity={currentLayer.visible ? undefined : 0.4}
      p={3}
      id={currentLayer.id}
      focusRing="none"
      alignItems="flex-start"
      onDoubleClick={() => {
        if (currentLayer.bounds) {
          felt.fitViewportToBounds({ bounds: currentLayer.bounds });
        }
      }}
    >
      <Box
        as={Icon}
        alignSelf="center"
        flexShrink={0}
        flexGrow={0}
        boxSize={4}
      />
      <Box overflow="hidden" flex={1}>
        <Text
          flex={1}
          overflow="hidden"
          color={currentLayer.name ? undefined : "fg.subtle"}
          truncate
        >
          {currentLayer.name || "(No name)"}
        </Text>
        {currentLayer.caption && (
          <Text color="fg.subtle">{currentLayer.caption}</Text>
        )}
      </Box>

      <IconButton
        className="layer-visibility-button"
        visibility={"hidden"}
        my={-1.5}
        mr={-1.5}
        size="xs"
        variant="ghost"
        aria-label={currentLayer.visible ? "Hide layer" : "Show layer"}
        onDoubleClick={(e) => {
          e.stopPropagation();
        }}
        onClick={() => {
          if (currentLayer.visible) {
            felt.setLayerVisibility({ hide: [currentLayer.id] });
          } else {
            felt.setLayerVisibility({ show: [currentLayer.id] });
          }
        }}
      >
        {currentLayer.visible ? <Eye /> : <EyeOff />}
      </IconButton>
    </HStack>
  );
}
