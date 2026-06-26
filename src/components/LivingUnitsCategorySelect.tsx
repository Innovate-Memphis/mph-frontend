import { createListCollection, Button, Checkbox, Popover, Portal, Stack } from "@chakra-ui/react"
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "./ui/select";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import { LIVING_UNITS_CATEGORIES } from "./../constants";
import { useState } from "react"

interface LivingUnitsCategoryFilterHandler {
  value: Array<string>;
  onSelectChange(categories: unknown): any;
}

export const LivingUnitsCategorySelect = ({ value, onSelectChange }: LivingUnitsCategoryFilterHandler) => {
  const [open, setOpen] = useState(false)
  return (
    <Stack minW="150px">
      <SelectRoot
        collection={categories}
        multiple
        size="xs"
        value={value}
        onValueChange={(e) => onSelectChange(e.value)}
        composite
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
      >
        <SelectTrigger>
          <SelectValueText placeholder="Living Units" />
          {open ? <LuChevronUp /> : <LuChevronDown />}
        </SelectTrigger>
        <SelectContent>
          {LIVING_UNITS_CATEGORIES.map((category) => (
            <SelectItem item={category} key={category} className="checkbox-filter">
              <Checkbox.Root
                checked={value.includes(category)}>
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                <Checkbox.Label>{category}</Checkbox.Label>
              </Checkbox.Root>
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
