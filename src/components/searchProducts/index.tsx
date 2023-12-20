import SearchIcon from "@mui/icons-material/Search";
import { Box, TextField, Tooltip } from "@mui/material";
import { Product } from "@prisma/client";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface Props {
  setFilteredProducts: Dispatch<SetStateAction<Product[]>>;
  products: Product[];
}

const SearchProducts = ({ setFilteredProducts, products }: Props) => {
  const handleSearch = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const searchText = event.target.value.toLowerCase();
    const searchResult = products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchText) ||
        product.description.toLowerCase().includes(searchText)
    );
    setFilteredProducts(searchResult);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        my: "30px",
        mb: 5,
      }}
    >
      <TextField
        sx={{ width: 500 }}
        placeholder="Search Products"
        onChange={handleSearch}
      />
      <Tooltip title="Search Bar">
        <SearchIcon
          sx={{
            fontSize: 35,
            padding: "11px",
            borderRadius: "0 20px 20px 0",
            backgroundColor: "bisque",
            cursor: "pointer",
          }}
        />
      </Tooltip>
    </Box>
  );
};

export default SearchProducts;
