import {
    Badge,
    Text,
    Wrap,
} from "@chakra-ui/react";
import { LuX } from "react-icons/lu";
import {
    DEFAULT_BUILT_YEAR_FILTERS
} from "../../constants";

interface SelectedItemsProps {
    items: (string | number)[];
    handleOnXClick: Function;
}

export const SelectedItems = ({ handleOnXClick, items }: SelectedItemsProps) =>
    <Wrap gap="2">
        {items.map((item) => {

            const defaultYearBuiltVal = DEFAULT_BUILT_YEAR_FILTERS.includes(item.filter);
            if (defaultYearBuiltVal) {
                return
            }

            return (
                <Badge
                    key={item}
                    colorPalette="green"
                    borderRadius="full"
                >
                    <Text textTransform="capitalize">{item.label}</Text>
                    
                        <LuX
                            style={{ "cursor": "pointer" }}
                            onClick={() => handleOnXClick(item.filter)}
                        />
                </Badge>
            )
        })}
    </Wrap>
