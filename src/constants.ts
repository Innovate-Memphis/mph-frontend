import type { Filters } from "@feltmaps/js-sdk";

export const FELT_MAP_ID = "p9CPdaItsRQm9COaGzgt17WB"

export const EXPLORE = "Explore"
const EVICTIONS = "Evictions"
const VACANCY = "Vacancy"
const OWNERSHIP = "Ownership"

const EVICTIONS_GROUP_LAYER_ID = "n5zmBsz8Rw2wis3xrwtNzB"
const VACANCY_GROUP_LAYER_ID = "4dr5K3ZrTCKK9AWb18v8MEB"
const OWNERSHIP_GROUP_LAYER_ID = "AoKl9AxdERg6pZVDObvxmjC"

const EVICTIONS_PARCEL_LAYER_ID = "PlRKU27xT5O9Btg66aI3uhD"
const VACANCY_PARCEL_LAYER_ID = "r5slc7q8TYi4U5Ts29AyMBB"
const OWNERSHIP_PARCEL_LAYER_ID = "vJqTqosmS1GOhuvwue9AcfC"

export const FILTERED_PARCEL_LAYER_ID = "VHBjOKqIQBuydqkCtCw9AWD"

export const THEMES = [
    EXPLORE,
    EVICTIONS,
    VACANCY,
    OWNERSHIP,
];

export const THEME_TO_GROUP_LAYER_MAP = new Map<string, string>([
    [EVICTIONS, EVICTIONS_GROUP_LAYER_ID],
    [VACANCY, VACANCY_GROUP_LAYER_ID],
    [OWNERSHIP, OWNERSHIP_GROUP_LAYER_ID],
  ]);

export const THEME_TO_PARCEL_LAYER_MAP = new Map<string | null, string>([
  [EVICTIONS, EVICTIONS_PARCEL_LAYER_ID],
  [VACANCY, VACANCY_PARCEL_LAYER_ID],
  [OWNERSHIP, OWNERSHIP_PARCEL_LAYER_ID],
  [EXPLORE, FILTERED_PARCEL_LAYER_ID],
]);

export const PARCEL_LAYERS_ZOOM_LEVEL = 14.8;

const RECENT_SALE = "Sale in last 6 months"
const RECENT_EVICTION = "Eviction in last 6 months"
const RECENT_VACANCY = "Vacant for last 6 months"
const INVESTOR_OWNED = "Investor Owned"

export const FILTERS = [
  RECENT_SALE,
  RECENT_EVICTION,
  RECENT_VACANCY,
  INVESTOR_OWNED
];

export const MIN_YEAR = 1883
export const CURRENT_YEAR = new Date().getFullYear();
export const DEFAULT_BUILT_YEAR_FILTERS = [MIN_YEAR, CURRENT_YEAR];

const RECENT_SALE_FILTER: Filters = ["sales_1yr", "gt", 0];
const RECENT_EVICTION_FILTER: Filters = ["evict_6mo", "gt", 0];
const RECENT_VACANCY_FILTER: Filters = ["long_term_vacancy", "eq", 1];
const INVESTOR_OWNED_FILTER: Filters = ["owner_occupied", "eq", "N"];

export const MIN_YEAR_BUILT_FILTER: Filters = ["dwel_yrblt", "ge", 1950];
export const MAX_YEAR_BUILT_FILTER: Filters = ["dwel_yrblt", "le", CURRENT_YEAR];

export const LAND_USE_CATEGORY_FILTER: Filters = ["lu_category", "in", []]

export const FILTERS_TO_FELT_FILTER = new Map<string, Filters>([
  [RECENT_SALE, RECENT_SALE_FILTER],
  [RECENT_EVICTION, RECENT_EVICTION_FILTER],
  [RECENT_VACANCY, RECENT_VACANCY_FILTER],
  [INVESTOR_OWNED, INVESTOR_OWNED_FILTER],
]);

const VACANT = "Vacant";
const RESIDENTIAL = "Residential";
const COMMERCIAL = "Commercial";
const INDUSTRIAL = "Industrial";
const INSTITUTIONAL = "Institutional";
const RECREATIONAL = "Recreational";
const EXEMPT = "Exempt";
const OTHER = "Other";

export const LAND_USE_CATEGORIES = [VACANT, RESIDENTIAL, COMMERCIAL, INDUSTRIAL, INSTITUTIONAL, RECREATIONAL, EXEMPT, OTHER];
