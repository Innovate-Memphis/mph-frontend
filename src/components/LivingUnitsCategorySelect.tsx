import { createListCollection, Stack } from "@chakra-ui/react"
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "./ui/select";
import { LIVING_UNITS_CATEGORIES } from "./../constants";

interface LivingUnitsCategoryFilterHandler {
  value: Array<string>;
  onSelectChange(categories: unknown): any;
}

export const LivingUnitsCategorySelect = ({ value, onSelectChange }: LivingUnitsCategoryFilterHandler) => {
  return (
    <Stack width="200px">
      <SelectRoot
        collection={categories}
        multiple
        size="sm"
        value={value}
        onValueChange={(e) => onSelectChange(e.value)}
      >
        <SelectTrigger>
          <SelectValueText placeholder="Living Units" />
        </SelectTrigger>
        <SelectContent>
          {LIVING_UNITS_CATEGORIES.map((category) => (
            <SelectItem item={category} key={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    </Stack>
  )
}

const categories = createListCollection({
  items: LIVING_UNITS_CATEGORIES
})
