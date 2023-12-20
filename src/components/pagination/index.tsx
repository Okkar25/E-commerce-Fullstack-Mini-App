import { CartItem } from "@/types/cart";
import { Box, Pagination } from "@mui/material";
import { useEffect, useState } from "react";

interface Props {
  itemsPerPage: number;
  totalItems: number;
  paginate: (data: any) => void;
}

const PaginationBar = ({ itemsPerPage, totalItems, paginate }: Props) => {
  const currentNumberOfPage = Math.ceil(totalItems / itemsPerPage); // number of pagination buttons

  const [page, setPage] = useState(1); // pagination page number

  // show items in cart according to pagination number
  useEffect(() => {
    paginate(page);
  }, [page]);

  // error // item deleted => no item left in paginated page => leave the cart page blanked (error)
  // error fixed // if item deleted => no item left in paginated page => go back to pagination page 1
  useEffect(() => {
    setPage(1);
  }, [currentNumberOfPage]);

  return (
    <Box>
      <Pagination
        shape="rounded"
        count={currentNumberOfPage}
        color="secondary"
        page={page} // determine location of pagination selection
        onChange={(event, value: number) => {
          setPage(value);
        }}
      />
    </Box>
  );
};

export default PaginationBar;

// pagination error
// item delete in cart => 7 - 1 => 6 items => pagination pages 3 to 2
// leave blank in pagination page // need to click on pagination to reload cart items

// error fixed
// if number of pagination buttons change => set selected pagination button to page 1
// useEffect hook used
