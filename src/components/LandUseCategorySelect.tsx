import { createListCollection } from "@chakra-ui/react"
import {
  SelectContent,
  SelectItem,
  SelectLabel,
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
    <SelectRoot
      collection={categories}
      multiple
      value={value}
      onValueChange={(e) => onSelectChange(e.value)}
    >
      <SelectLabel>Select Land Use Category</SelectLabel>
      <SelectTrigger>
        <SelectValueText placeholder="Currently showing all" />
      </SelectTrigger>
      <SelectContent>
        {LAND_USE_CATEGORIES.map((category) => (
          <SelectItem item={category} key={category}>
            {category}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  )
}

const categories = createListCollection({
    items: LAND_USE_CATEGORIES
  })
