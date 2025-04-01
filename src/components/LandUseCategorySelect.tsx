import { createListCollection, Stack } from "@chakra-ui/react"
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "./ui/select";
import { LAND_USE_CATEGORIES } from "./../constants";

interface LandUseCategoryFilterHandler {
  value: Array<string>;
  onSelectChange(categories: unknown): any;
}

export const LandUseCategorySelect = ({ value, onSelectChange }: LandUseCategoryFilterHandler) => {
  return (
    <Stack width="200px">
      <SelectRoot
        collection={categories}
        multiple
        value={value}
        onValueChange={(e) => onSelectChange(e.value)}
      >
        <SelectTrigger>
          <SelectValueText placeholder="Land Use Category" />
        </SelectTrigger>
        <SelectContent>
          {LAND_USE_CATEGORIES.map((category) => (
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
  items: LAND_USE_CATEGORIES
})
