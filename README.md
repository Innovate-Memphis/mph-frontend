# Background

This repo was forked from the [Felt JS SDK React Starter](https://github.com/felt/js-sdk).
- [SDK Documentation](https://developers.felt.com/js-sdk)
- [API Reference](https://developers.felt.com/js-sdk-api-reference)

The starter uses `vite` to run the project.

It uses [Chakra-UI](https://chakra-ui.com/) for styling, which was kept as the styling library for simplicity.
The Felt team noted that to use Chakra UI, you'll probably need to consult these parts of the docs:

- [Components](https://www.chakra-ui.com/docs/components/concepts/overview)
- [Styling](https://www.chakra-ui.com/docs/styling/overview)
- [Theming](https://www.chakra-ui.com/docs/theming/overview)

## Getting started

To run the project, run `npm install` and then `npm run dev`.

## Development Workflow

### Testing new Felt layers / components
If testing new Felt layers, components, or anything else that's within the Felt map, you will want to test in the [Memphis Property Hub DEV map](https://felt.com/map/Memphis-Property-Hub-DEV-2pjfh9ClOTymZRWajPdjFoA?loc=35.17449,-89.95831,13.44z). This is because changes made in a Felt map are immediate and affect all users. To do this, in `src\constants.ts`, change `FELT_MAP_ID` to the `DEV_ID`.

Testing database changes should be done in the `(DEV) write property hub` workbook in Databricks prior to moving those changes into the `PROD` script.

The DEV map should be isolated to just one zip code, so as not to use up all the monthly allowance of GB in the Felt account. This is done in the Custom SQL for the Felt layer by adding `where mph.zipcode = 38108` (Or whatever zipcode you want).

All layers in PROD must be accounted for in the code. This is because the code is setup to hide all layers except the active one(s) for that theme. If you need to build layers in PROD prior to making them visible, you can add them to `LAYERS_TO_HIDE` in `src\constants.ts`. There is currently not a way to hide a group layer ID but surely that could be possible as well.

### Testing new filters

If you're only adding new filters or some other functionality that doesn't require a change to the Felt map, you can test using the PROD Memphis Property hub map locally. Just keep the `FELT_MAP_ID` set to `PROD_ID`.

### Testing tooltip changes

Tooltip changes should be tested in the DEV Felt map. The final changes should be saved and committed to `tooltip.html` simply for change log purposes. There is no benefit to testing the tooltip locally.

## Deployment

This app is deployed as a static site to Github Pages. Whenever code is pushed to main, a Github action builds the app and deploys it.

The Github action code was copied from [vite's Github documentation](https://vite.dev/guide/static-deploy) and is located in `.github/workflows/vite.yml`.

It would be ideal to have a separate `dev` environment that deploys to a URL such as `https://mphdev.datamidsouth.org/`. An attempt was started in the `dev` branch, based on instructions that someone got from a `Claude AI` prompt. More testing needs done to get this fully working. The `dev` environment would allow others who cannot run the app locally to test changes prior to production deployment. A workaround is to instead record the workflow using the Snipping Tool and send that to necessary people for review.