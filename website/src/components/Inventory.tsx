import { Box, Image, Text, Wrap } from "@chakra-ui/react";
import { Tooltip } from "@chakra-ui/react";
import { Inventory as InventoryType, Item } from "../state/types";

interface InventoryItemProps {
  item: Item;
}

export const InventoryItem = ({ item }: InventoryItemProps) => {
  return (
    <Tooltip label={item.name}>
      <Image
        objectFit="cover"
        _hover={{
          border: "2px solid white",
        }}
        height={12}
        src={item.imageUrl}
      />
    </Tooltip>
  );
};

interface InventoryProps {
  inventory: InventoryType;
}

export const Inventory = ({ inventory }: InventoryProps) => {
  return (
    <Box paddingTop="4" paddingBottom="4" borderTop="1px dashed #ffffff66" borderBottom="1px dashed #ffffff66">
      <Text>Your inventory {!inventory.items.length && "is empty"}</Text>
      <Wrap marginTop="4">
        {inventory.items.map((item) => (
          <InventoryItem key={item.name} item={item} />
        ))}
      </Wrap>
    </Box>
  );
};
