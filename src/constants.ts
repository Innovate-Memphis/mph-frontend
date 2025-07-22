import type { Filters } from "@feltmaps/js-sdk";

export const FELT_MAP_ID = "p9CPdaItsRQm9COaGzgt17WB"

export const EXPLORE = "Explore"
const EVICTIONS = "Evictions"
const OCCUPANCY = "Occupancy"
const VACANCY = "Vacant Land"
const OWNERSHIP = "Ownership"

const EVICTIONS_GROUP_LAYER_ID = "n5zmBsz8Rw2wis3xrwtNzB"
const OCCUPANCY_GROUP_LAYER_ID = "ei0grM00S5ebBLimTXnZLA"
const VACANCY_GROUP_LAYER_ID = "4dr5K3ZrTCKK9AWb18v8MEB"
const OWNERSHIP_GROUP_LAYER_ID = "AoKl9AxdERg6pZVDObvxmjC"

const EVICTIONS_PARCEL_LAYER_ID = "CJTXTOzITbGe9BoWDE3y7LB"
const OCCUPANCY_PARCEL_LAYER_ID = "ET1rYYcuQFyvttTCf1VgPA"
const VACANCY_PARCEL_LAYER_ID = "t7PVtMCKQKS2oSSwl9CHIND"
const OWNERSHIP_PARCEL_LAYER_ID = "ipk9AOGZtTFOkCg6BWLRBkC"

export const FILTERED_PARCEL_LAYER_ID = "aLFXLp9B9CTRO9BVGm89BBazLA"

export const THEMES = [
  { theme: EXPLORE,
    tooltip: "View and filter all parcels for all themes and fields",
  },
  {
    theme: OWNERSHIP,
    tooltip: "View trends and parcels for properties owned by investors",
  },
  {
    theme: EVICTIONS,
    tooltip: "View trends and parcels where evictions are happening",
  },
  {
    theme: OCCUPANCY,
    tooltip: "View trends and parcels with vacant homes and buildings",
  },
  {
    theme: VACANCY,
    tooltip: "View trends and parcels with vacant lots with no buildings",
  },
];

export const THEME_TO_GROUP_LAYER_MAP = new Map<string, string>([
  [EVICTIONS, EVICTIONS_GROUP_LAYER_ID],
  [OCCUPANCY, OCCUPANCY_GROUP_LAYER_ID],
  [VACANCY, VACANCY_GROUP_LAYER_ID],
  [OWNERSHIP, OWNERSHIP_GROUP_LAYER_ID],
]);

export const THEME_TO_PARCEL_LAYER_MAP = new Map<string | null, string>([
  [EXPLORE, FILTERED_PARCEL_LAYER_ID],
  [EVICTIONS, EVICTIONS_PARCEL_LAYER_ID],
  [OCCUPANCY, OCCUPANCY_PARCEL_LAYER_ID],
  [VACANCY, VACANCY_PARCEL_LAYER_ID],
  [OWNERSHIP, OWNERSHIP_PARCEL_LAYER_ID],
]);

const EXPLORE_THEME = { filter: "EXPLORE" };
const RECENT_SALE = { filter: "SALE", buttonTitle: "Recent Sale", hoverDescription: "Parcels with a sale in the past 6 months" }
const RECENT_EVICTION = { filter: "EVICT", buttonTitle: "Recent Eviction", hoverDescription: "Parcels with an eviction in the past 6 months" }
const RECENT_VACANCY = { filter: "VACANT", buttonTitle: "Vacant", hoverDescription: "Residential parcels that are marked vacant" }
const INVESTOR_OWNED = { filter: "INVESTOR", buttonTitle: "Investor Owned", hoverDescription: "Residential parcels that are owned by LLCs and other corporations" }
const LONG_TERM_VACANCY = { filter: "LONG_VACANT", buttonTitle: "Long-term Vacant", hoverDescription: "Parcels that have been vacant over 12 months" }
const RECENT_BUILDING_PERMIT = { filter: "RECENT_BUILD_PERMIT", buttonTitle: "Recent Build Permit", hoverDescription: "Parcels that were granted a building permit in the past 1 year" }
const RECENT_DEMO_PERMIT = { filter: "RECENT_DEMO_PERMIT", buttonTitle: "Recent Demo Permit", hoverDescription: "Parcels that were granted a demolition permit in the past 1 year" }
const CONTAINS_IMAGE = { filter: "CONTAINS_IMAGE", buttonTitle: "Contains Image", hoverDescription: "Parcels that have an image on file" }
const OWNER_OCCUPIED = { filter: "OWNER_OCCUPIED", buttonTitle: "Owner Occupied", hoverDescription: "Parcels where owner address matches the address" }
const NON_LOCAL_OWNER = { filter: "NONLOCAL_OWNER", buttonTitle: "Non-Local Owner", hoverDescription: "Parcels where owner address is the Memphis metro area" }

export const FILTER_BUTTON_WIDTH = 125;

export const FILTERS = [
  RECENT_SALE,
  RECENT_EVICTION,
  RECENT_VACANCY,
  LONG_TERM_VACANCY,
  INVESTOR_OWNED,
  RECENT_BUILDING_PERMIT,
  RECENT_DEMO_PERMIT,
  CONTAINS_IMAGE,
  OWNER_OCCUPIED,
  NON_LOCAL_OWNER,
];

export const MIN_YEAR = 1883
export const CURRENT_YEAR = new Date().getFullYear();
export const DEFAULT_BUILT_YEAR_FILTERS = [MIN_YEAR, CURRENT_YEAR];

export const MIN_UNITS = 0;
export const MAX_UNITS = 1000;
export const DEFAULT_UNITS_FILTERS = [MIN_UNITS, MAX_UNITS];

const EXPLORE_FILTER: Filters = ["state", "eq", "TN"]

const RECENT_SALE_FILTER: Filters = ["sales_1yr", "gt", 0];
const RECENT_EVICTION_FILTER: Filters = ["evictions_6mo", "gt", 0];
const RECENT_VACANCY_FILTER: Filters = ["months_vacant", "gt", 0];
const INVESTOR_OWNED_FILTER: Filters = ["investor_owned", "eq", "Y"];
const LONG_TERM_VACANT_FILTER: Filters = ["months_vacant", "gt", 12];
const RECENT_BUILD_PERMIT_FILTER: Filters = ["building_permit_1year", "gt", 0];
const RECENT_DEMO_PERMIT_FILTER: Filters = ["demo_permit_1year", "gt", 0];

const CONTAINS_IMAGE_FILTER: Filters = ["bcs_property_image", "isnt", null];
const OWNER_OCCUPIED_FILTER: Filters = ["owner_occupied", "eq", "Y"];
const NONLOCAL_OWNER_FILTER: Filters = ["owner_location", "eq", "Non-Local"];

export const MIN_YEAR_BUILT_FILTER: Filters = ["year_built", "ge", 1950];
export const MAX_YEAR_BUILT_FILTER: Filters = ["year_built", "le", CURRENT_YEAR];

export const MIN_UNITS_FILTER: Filters = ["living_units", "ge", MIN_UNITS];
export const MAX_UNITS_FILTER: Filters = ["living_units", "le", MAX_UNITS];

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
  [OWNER_OCCUPIED.filter, OWNER_OCCUPIED_FILTER],
  [NON_LOCAL_OWNER.filter, NONLOCAL_OWNER_FILTER],
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

const CENSUS_TRACT = "Census Tract";
const CENSUS_TRACT_OPTIONS = [
  "47157008500",
  "47157020544",
  "47157010001",
  "47157021760",
  "47157007100",
  "47157021547",
  "47157007810",
  "47157021124",
  "47157005700",
  "47157007300",
  "47157020524",
  "47157002600",
  "47157009300",
  "47157007821",
  "47157020901",
  "47157020521",
  "47157007900",
  "47157021430",
  "47157011010",
  "47157020101",
  "47157020523",
  "47157021752",
  "47157008800",
  "47157020652",
  "47157021121",
  "47157021731",
  "47157007500",
  "47157003500",
  "47157022121",
  "47157006400",
  "47157021351",
  "47157005500",
  "47157009202",
  "47157020532",
  "47157022025",
  "47157021420",
  "47157010710",
  "47157021754",
  "47157022700",
  "47157009100",
  "47157980402",
  "47157010610",
  "47157021144",
  "47157020634",
  "47157980100",
  "47157021122",
  "47157010210",
  "47157011600",
  "47157022131",
  "47157021545",
  "47157021744",
  "47157010810",
  "47157020657",
  "47157021141",
  "47157021136",
  "47157000600",
  "47157008110",
  "47157010220",
  "47157021126",
  "47157021355",
  "47157021410",
  "47157021311",
  "47157021751",
  "47157021320",
  "47157021111",
  "47157020700",
  "47157020622",
  "47157021139",
  "47157022330",
  "47157001700",
  "47157008200",
  "47157002500",
  "47157020511",
  "47157021721",
  "47157005800",
  "47157003900",
  "47157007200",
  "47157009800",
  "47157020531",
  "47157004600",
  "47157021021",
  "47157021140",
  "47157009600",
  "47157021613",
  "47157003800",
  "47157011700",
  "47157011300",
  "47157020632",
  "47157004500",
  "47157021357",
  "47157022220",
  "47157001500",
  "47157020654",
  "47157005600",
  "47157004200",
  "47157020633",
  "47157020541",
  "47157020635",
  "47157021022",
  "47157020658",
  "47157021612",
  "47157020651",
  "47157000300",
  "47157000700",
  "47157007400",
  "47157021352",
  "47157010120",
  "47157021757",
  "47157021341",
  "47157020221",
  "47157021113",
  "47157011800",
  "47157022122",
  "47157007000",
  "47157005000",
  "47157021725",
  "47157002400",
  "47157011020",
  "47047060401",
  "47157020542",
  "47157022132",
  "47157022111",
  "47157021747",
  "47157980200",
  "47157000800",
  "47157011401",
  "47157009700",
  "47157021354",
  "47157021745",
  "47157010121",
  "47157000100",
  "47157006700",
  "47157006900",
  "47157002700",
  "47157020210",
  "47157001400",
  "47157004300",
  "47157021753",
  "47157020655",
  "47157021023",
  "47157006300",
  "47157002900",
  "47157010500",
  "47157009501",
  "47157000200",
  "47157020836",
  "47157021611",
  "47157003600",
  "47157021333",
  "47157021125",
  "47157000900",
  "47157021312",
  "47157020400",
  "47157006800",
  "47157022600",
  "47157021759",
  "47157006200",
  "47157020835",
  "47157009502",
  "47157020222",
  "47157010630",
  "47157010820",
  "47157008700",
  "47157008600",
  "47157020834",
  "47157003700",
  "47157008900",
  "47157001300",
  "47157021543",
  "47157011500",
  "47157021530",
  "47157003300",
  "47157010002",
  "47157010720",
  "47157020902",
  "47157020837",
  "47157002100",
  "47157021331",
  "47157011100",
  "47157001100",
  "47157021541",
  "47157021710",
  "47157022310",
  "47157022130",
  "47157003000",
  "47157021142",
  "47157980300",
  "47157021756",
  "47157022210",
  "47157003200",
  "47157003400",
  "47157009902",
  "47157010300",
  "47157002000",
  "47157020610",
  "47157020833",
  "47157022023",
  "47157021546",
  "47157008120",
  "47157021900",
  "47157005900",
  "47157022321",
  "47157001900",
  "47157011200",
  "47157005300",
  "47157022500",
  "47157006500",
  "47157020543",
  "47157002800",
  "47157021356",
  "47157021138",
  "47157021143",
  "47157022322",
  "47157021112",
  "47157022410",
  "47157009400",
  "47157020102",
  "47157021334",
  "47157020302",
  "47157001200",
  "47157006600",
  "47157006000",
  "47157021724",
  "47157021542",
  "47157011402",
  "47157009201",
  "47157021746",
  "47157020301",
  "47157021544",
  "47157010620",
  "47157008000",
  "47157000400",
  "47157021758",
  "47157020653",
  "47157001600",
  "47157021548",
  "47157021200",
  "47157022024",
  "47157021020",
  "47157009901",
  "47157020656",
  "47157003100",
  "47157021620",
  "47157010122",
  "47157022026",
  "47157020621",
  "47157007822",
  "47157021135",
  "47167040302",
  "47167040303",
  "47157021755",
  "47157980401"];

export const GEOGRAPHIC_FILTER_MAP = new Map<string | null, Array<string | number>>([
  [COUNCIL_DISTRICT, COUNCIL_DISTRICT_OPTIONS],
  [SUPER_COUNCIL_DISTRICT, SUPER_COUNCIL_DISTRICT_OPTIONS],
  [ZIPCODE, ZIPCODE_OPTIONS],
  [COUNTY_COMMISSION, COUNTY_COMMISSION_OPTIONS],
  [CENSUS_TRACT, CENSUS_TRACT_OPTIONS]
]);

const CITY_COUNCIL_FILTER: Filters = ["council_district", "in", []];
const SUPER_COUNCIL_FILTER: Filters = ["super_district", "in", []];
const ZIPCODE_FILTER: Filters = ["parzip", "in", []];
const COUNTY_COMMISSION_FILTER: Filters = ["commission_district", "in", []];
const CENSUS_TRACT_FILTER: Filters = ["tract_2020", "in", []];

export const GEOGRAPHIC_FELT_FILTER_MAP = new Map<string, Filters>([
  [COUNCIL_DISTRICT, CITY_COUNCIL_FILTER],
  [SUPER_COUNCIL_DISTRICT, SUPER_COUNCIL_FILTER],
  [ZIPCODE, ZIPCODE_FILTER],
  [COUNTY_COMMISSION, COUNTY_COMMISSION_FILTER],
  [CENSUS_TRACT, CENSUS_TRACT_FILTER],
]);

export const TOUR_STEPS = [
  {
    target: '#filter',
    content: 'FILTER PARCELS: Click here to open the filter panel. Then select one or more criteria—like vacancy status, living-unit type (e.g. “Single-Family”), or zoning—to narrow the map to exactly the parcels you need. Hit RESET to clear all filters.',
  },
  {
    target: '#theme-tabs',
    content: 'CHOOSE A DATA THEME: Click on a housing theme to switch the map and sidebar and explore that topic. Each theme defaults to viewing parcel-level data.',
  },
  {
    target: '.view-trends',
    content: 'VIEW TRENDS: Click here to switch to an aggregated view. Use the slider to pick Heat Map, Census Tracts, ZIP Codes, City Council, or County Commission to see parcel data summarized by those geographies.',
  },
  { target: "iframe", // timing issues with changing to the aggregation level and trying to select the toggle
    content: "Use the geographic slider on the left to change geographic boundaries. Slide the black bar across the dots to change from 'Heatmap' to 'Zipcode' and more.",
    placement: "center",
  },
  { target: '.view-parcels',
    content: 'VIEW PARCELS: Click here to switch back to the parcel-level view.'
  },
  { target: "button[data-uid='help-menu']",
    content: 'HELP MENU: Click here to access the user guide, documentation on what’s included, data rules for each theme, and a link for you submit your ideas and feedback.'
  },
];

export const LOGIN_FAILURE_MESSAGE = "Thank you for your interest in the Memphis Property Hub. Access to this application requires approval. Please submit the access form using the button below and we will get back to you soon.";

export const REQUEST_ACCESS_FORM_URL = "https://forms.office.com/Pages/ResponsePage.aspx?id=v_RNHxm4P0qoQco0jnU1XFhfogR1DkFKj5fBqT0dT8pUQldDVE1JNDdFSUxBQjJTMFBaUkpUMFRIWS4u";
