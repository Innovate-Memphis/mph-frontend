import { DataList, Grid } from "@chakra-ui/react";

import React from "react";
import { useFelt } from "../feltUtils";

export function ViewportInfo() {
  const felt = useFelt();
  const [viewport, setViewport] = React.useState<{
    center: { latitude: number; longitude: number };
    zoom: number;
  } | null>(null);

  React.useEffect(() => {
    felt.getViewport().then(setViewport);

    return felt.onViewportMove({
      handler: (viewport) => {
        setViewport(viewport);
      },
    });
  }, []);

  return (
    <DataList.Root p={3} gap={1} fontVariant="tabular-nums">
      <Grid as={DataList.Item} gridTemplateColumns="1fr auto">
        <DataList.ItemLabel>Center</DataList.ItemLabel>
        <DataList.ItemValue>
          {viewport
            ? viewport?.center.latitude.toFixed(4) +
              ", " +
              viewport?.center.longitude.toFixed(4)
            : "–"}
        </DataList.ItemValue>
      </Grid>
      <Grid as={DataList.Item} gridTemplateColumns="1fr auto">
        <DataList.ItemLabel>Zoom</DataList.ItemLabel>
        <DataList.ItemValue>
          {viewport?.zoom.toFixed(2) ?? "–"}
        </DataList.ItemValue>
      </Grid>
    </DataList.Root>
  );
}
