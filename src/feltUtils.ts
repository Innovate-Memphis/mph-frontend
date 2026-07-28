import {
  Felt,
  FeltController,
  FeltEmbedOptions,
  Layer,
  LayerGroup,
} from "@feltmaps/js-sdk";
import React from "react";

export function useFeltEmbed(mapId: string, embedOptions: FeltEmbedOptions) {
  const [felt, setFelt] = React.useState<FeltController | null>(null);
  const hasLoadedRef = React.useRef(false);
  const mapRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    async function loadFelt() {
      if (hasLoadedRef.current) return;
      if (!mapRef.current) return;

      hasLoadedRef.current = true;
      const felt = await Felt.embed(mapRef.current, mapId, embedOptions);
      setFelt(felt);
    }

    loadFelt();
  }, []);

  return {
    felt,
    mapRef,
  };
}

export const FeltContext = React.createContext<FeltController>(
  {} as FeltController
);
export const useFelt = () => React.useContext(FeltContext);

export function useLiveLayerGroup(
  felt: FeltController,
  initialGroup: LayerGroup
) {
  const [currentGroup, setGroup] = React.useState<LayerGroup | null>(
    initialGroup
  );

  React.useEffect(() => {
    return felt.onLayerGroupChange({
      options: { id: initialGroup.id },
      handler: ({ layerGroup }) => setGroup(layerGroup),
    });
  }, [initialGroup.id]);

  return currentGroup;
}

export function useLiveLayer(felt: FeltController, initialLayer: Layer) {
  const [currentLayer, setLayer] = React.useState<Layer | null>(initialLayer);

  React.useEffect(() => {
    return felt.onLayerChange({
      options: { id: initialLayer.id },
      handler: ({ layer }) => setLayer(layer),
    });
  }, [initialLayer.id]);

  return currentLayer;
}

export type LayerTree = Array<LayerGroupNode | LayerNode>;
export type LayerGroupNode = {
  type: "layerGroup";
  group: LayerGroup;
  layers: Layer[];
};
type LayerNode = { type: "layer"; layer: Layer };
export function assembleLayerTree(
  layers: Layer[],
  layerGroups: LayerGroup[]
): LayerTree {
  const groupsById = new Map<string, LayerGroupNode>();
  const result: LayerTree = [];
  for (const layer of layers) {
    if (!layer.groupId) {
      result.push({
        type: "layer",
        layer,
      });
    } else {
      const group = groupsById.get(layer.groupId);
      if (!group) {
        const node: LayerGroupNode = {
          type: "layerGroup",
          group: layerGroups.find((g) => g.id === layer.groupId)!,
          layers: [layer],
        };

        groupsById.set(layer.groupId, node);
        result.push(groupsById.get(layer.groupId)!);
      } else {
        group.layers.push(layer);
      }
    }
  }
  return result;
}
