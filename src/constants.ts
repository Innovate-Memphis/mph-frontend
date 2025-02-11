const EVICTIONS = "evictions"
const VACANCY = "vacancy"
const OWNERSHIP = "ownership"

const EVICTIONS_GROUP_LAYER_ID = ""
const VACANCY_GROUP_LAYER_ID = "4dr5K3ZrTCKK9AWb18v8MEB"
const OWNERSHIP_GROUP_LAYER_ID = "AoKl9AxdERg6pZVDObvxmjC"

export const THEMES = [
    EVICTIONS,
    VACANCY,
    OWNERSHIP,
];

export const THEME_TO_LAYER_MAP = new Map<string, string>([
    // [EVICTIONS, EVICTIONS_GROUP_LAYER_ID],
    [VACANCY, VACANCY_GROUP_LAYER_ID],
    [OWNERSHIP, OWNERSHIP_GROUP_LAYER_ID],
  ]);
