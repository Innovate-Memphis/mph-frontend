import type { Filters } from "@feltmaps/js-sdk";

export const FELT_MAP_ID = "p9CPdaItsRQm9COaGzgt17WB"

export const EXPLORE = "Explore"
const EVICTIONS = "Evictions"
const VACANCY = "Vacancy"
const OWNERSHIP = "Ownership"

const EVICTIONS_GROUP_LAYER_ID = "n5zmBsz8Rw2wis3xrwtNzB"
const VACANCY_GROUP_LAYER_ID = "4dr5K3ZrTCKK9AWb18v8MEB"
const OWNERSHIP_GROUP_LAYER_ID = "AoKl9AxdERg6pZVDObvxmjC"

const EVICTIONS_PARCEL_LAYER_ID = "CJTXTOzITbGe9BoWDE3y7LB"
const VACANCY_PARCEL_LAYER_ID = "t7PVtMCKQKS2oSSwl9CHIND"
const OWNERSHIP_PARCEL_LAYER_ID = "ipk9AOGZtTFOkCg6BWLRBkC"

export const FILTERED_PARCEL_LAYER_ID = "aLFXLp9B9CTRO9BVGm89BBazLA"

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
  [EXPLORE, FILTERED_PARCEL_LAYER_ID],
  [EVICTIONS, EVICTIONS_PARCEL_LAYER_ID],
  [VACANCY, VACANCY_PARCEL_LAYER_ID],
  [OWNERSHIP, OWNERSHIP_PARCEL_LAYER_ID],
]);

const EXPLORE_THEME = { filter: "EXPLORE" };
const RECENT_SALE = { filter: "SALE", buttonTitle: "Recent Sale", hoverDescription: "Parcels with a sale in the past 6 months" }
const RECENT_EVICTION = { filter: "EVICT", buttonTitle: "Recent Eviction", hoverDescription: "Parcels with an eviction in the past 6 months" }
const RECENT_VACANCY = { filter: "VACANT", buttonTitle: "Vacant", hoverDescription: "Parcels that have a vacant land use code" }
const INVESTOR_OWNED = { filter: "INVESTOR", buttonTitle: "Investor Owned", hoverDescription: "Residential parcels that are owned by LLCs and other corporations" }
const LONG_TERM_VACANCY = { filter: "LONG_VACANT", buttonTitle: "Long-term Vacant", hoverDescription: "Parcels that have been vacant over 12 months" }
const RECENT_BUILDING_PERMIT = { filter: "RECENT_BUILD_PERMIT", buttonTitle: "Recent Build Permit", hoverDescription: "Parcels that were granted a building permit in the past 1 year" }
const RECENT_DEMO_PERMIT = { filter: "RECENT_DEMO_PERMIT", buttonTitle: "Recent Demo Permit", hoverDescription: "Parcels that were granted a demolition permit in the past 1 year" }
const CONTAINS_IMAGE = { filter: "CONTAINS_IMAGE", buttonTitle: "Contains Image", hoverDescription: "Parcels that have an image on file" }

export const FILTER_BUTTON_WIDTH = 125;

export const FILTERS = [
  RECENT_SALE,
  RECENT_EVICTION,
  RECENT_VACANCY,
  RECENT_BUILDING_PERMIT,
  RECENT_DEMO_PERMIT,
  LONG_TERM_VACANCY,
  INVESTOR_OWNED,
  CONTAINS_IMAGE,
];

export const MIN_YEAR = 1883
export const CURRENT_YEAR = new Date().getFullYear();
export const DEFAULT_BUILT_YEAR_FILTERS = [MIN_YEAR, CURRENT_YEAR];

const EXPLORE_FILTER: Filters = ["state", "eq", "TN"]

const RECENT_SALE_FILTER: Filters = ["sales_1yr", "gt", 0];
const RECENT_EVICTION_FILTER: Filters = ["evictions_6mo", "gt", 0];
const RECENT_VACANCY_FILTER: Filters = ["prop_lucdesc", "eq", "VACANTLAND"];
const INVESTOR_OWNED_FILTER: Filters = ["owner_occupied", "eq", "N"];
const LONG_TERM_VACANT_FILTER: Filters = ["months_vacant", "gt", 12];
const RECENT_BUILD_PERMIT_FILTER: Filters = ["building_permit_1year", "gt", 0];
const RECENT_DEMO_PERMIT_FILTER: Filters = ["demo_permit_1year", "gt", 0];

const CONTAINS_IMAGE_FILTER: Filters = ["bcs_property_image", "isnt", null];

export const MIN_YEAR_BUILT_FILTER: Filters = ["year_built", "ge", 1950];
export const MAX_YEAR_BUILT_FILTER: Filters = ["year_built", "le", CURRENT_YEAR];

export const LAND_USE_CATEGORY_FILTER: Filters = ["land_use_category", "in", []]

export const FILTERS_TO_FELT_FILTER = new Map<string, Filters>([
  [EXPLORE_THEME.filter, EXPLORE_FILTER],
  [RECENT_SALE.filter, RECENT_SALE_FILTER],
  [RECENT_EVICTION.filter, RECENT_EVICTION_FILTER],
  [RECENT_VACANCY.filter, RECENT_VACANCY_FILTER],
  [LONG_TERM_VACANCY.filter, LONG_TERM_VACANT_FILTER],
  [INVESTOR_OWNED.filter, INVESTOR_OWNED_FILTER],
  [RECENT_BUILDING_PERMIT.filter, RECENT_BUILD_PERMIT_FILTER],
  [RECENT_DEMO_PERMIT.filter, RECENT_DEMO_PERMIT_FILTER],
  [CONTAINS_IMAGE.filter, CONTAINS_IMAGE_FILTER],
]);

export const THEME_TO_DEFAULT_FILTER_MAP = new Map<string, string>([
  [EXPLORE, EXPLORE_THEME.filter],
  [EVICTIONS, RECENT_EVICTION.filter],
  [VACANCY, RECENT_VACANCY.filter],
  [OWNERSHIP, INVESTOR_OWNED.filter],
]);

const VACANT = "Vacant Land";
const RESIDENTIAL = "Residential";
const COMMERCIAL = "Commercial";
const INDUSTRIAL = "Industrial";
const INSTITUTIONAL = "Institutional";
const RECREATIONAL = "Recreational";
const EXEMPT = "Exempt";
const OTHER = "Other";

export const LAND_USE_CATEGORIES = [VACANT, RESIDENTIAL, COMMERCIAL, INDUSTRIAL, INSTITUTIONAL, RECREATIONAL, EXEMPT, OTHER];

const COUNCIL_DISTRICT = "City Council District"
const COUNCIL_DISTRICT_OPTIONS = ["1", "2", "3", "4", "5", "6", "7"]
const SUPER_COUNCIL_DISTRICT = "Super Council District"
const SUPER_COUNCIL_DISTRICT_OPTIONS = ["8", "9"]
const ZIPCODE = "Zipcode"
const ZIPCODE_OPTIONS = [
  "37501",
  "37544",
  "38101",
  "38103",
  "38104",
  "38105",
  "38106",
  "38107",
  "38108",
  "38109",
  "38111",
  "38112",
  "38113",
  "38114",
  "38115",
  "38116",
  "38117",
  "38118",
  "38119",
  "38120",
  "38122",
  "38124",
  "38125",
  "38126",
  "38127",
  "38128",
  "38130",
  "38131",
  "38132",
  "38133",
  "38134",
  "38135",
  "38136",
  "38137",
  "38138",
  "38139",
  "38141",
  "38145",
  "38148",
  "38150",
  "38151",
  "38152",
  "38157",
  "38159",
  "38161",
  "38163",
  "38166",
  "38167",
  "38168",
  "38173",
  "38174",
  "38175",
  "38177",
  "38181",
  "38182",
  "38184",
  "38186",
  "38187",
  "38188",
  "38190",
  "38193",
  "38194",
 " 38197"
];
const COUNTY_COMMISSION = "Shelby County Commission";
const COUNTY_COMMISSION_OPTIONS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"];

export const GEOGRAPHIC_FILTER_MAP = new Map<string | null, Array<string | number>>([
  [COUNCIL_DISTRICT, COUNCIL_DISTRICT_OPTIONS],
  [SUPER_COUNCIL_DISTRICT, SUPER_COUNCIL_DISTRICT_OPTIONS],
  [ZIPCODE, ZIPCODE_OPTIONS],
  [COUNTY_COMMISSION, COUNTY_COMMISSION_OPTIONS],
]);

const CITY_COUNCIL_FILTER: Filters = ["council_district", "in", []];
const SUPER_COUNCIL_FILTER: Filters = ["super_district", "in", []];
const ZIPCODE_FILTER: Filters = ["parzip", "in", []];
const COUNTY_COMMISSION_FILTER: Filters = ["commission_district", "in", []]

export const GEOGRAPHIC_FELT_FILTER_MAP = new Map<string, Filters>([
  [COUNCIL_DISTRICT, CITY_COUNCIL_FILTER],
  [SUPER_COUNCIL_DISTRICT, SUPER_COUNCIL_FILTER],
  [ZIPCODE, ZIPCODE_FILTER],
  [COUNTY_COMMISSION, COUNTY_COMMISSION_FILTER],
]);

