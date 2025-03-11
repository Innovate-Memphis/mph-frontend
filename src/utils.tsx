import type { Filters } from "@feltmaps/js-sdk";

export const filterUtils = {
    and(a: Filters, b: Filters): Filters {
        if (a === null) return b;
        if (b === null) return a;
        return [a, "and", b];
    },

    andMany(filters: Filters[]): Filters {
        return filters.reduce(filterUtils.and, null as Filters);
    },
}