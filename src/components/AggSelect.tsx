import { For, Tabs } from "@chakra-ui/react"
import { AGGS } from "../constants";
import { WiNightAltStormShowers } from "react-icons/wi";
import { version } from "react";
import { TiAdjustBrightness } from "react-icons/ti";

interface AggHandler {
    currentAgg: string;
    onAggClick(aggName: string): any;
}

export function AggSelect({ currentAgg, onAggClick }: AggHandler) {
    return (
        <Tabs.Root value={currentAgg} variant="plain" onValueChange={(e) => onAggClick(e.value)} size="lg">
            <Tabs.List bg="bg.muted" rounded="l3" p="1">
                <For each={AGGS}>
                {(agg) => (
                    <Tabs.Trigger key={agg} value={agg}>
                        {agg.toUpperCase()}
                    </Tabs.Trigger>
                )}
                </For>
                <Tabs.Indicator rounded="l2" />
            </Tabs.List>
        </Tabs.Root>
    );
}
