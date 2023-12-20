import PaginationBar from "@/components/pagination";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  clearOutCart,
  createOrder,
  updateQuantity,
} from "@/store/slices/cartSlice";
import AddIcon from "@mui/icons-material/Add";
import AppsIcon from "@mui/icons-material/Apps";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Alert,
  AppBar,
  Box,
  Fab,
  Paper,
  Snackbar,
  Tooltip,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const Cart = () => {
  const cartItems = useAppSelector((store) => store.cart.items);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false); // item delete snackbar
  const router = useRouter();

  const getCartSubtotalPrice = (): number => {
    const subTotal = cartItems
      .map((item) => item.price * item.quantity)
      .reduce((pv, cv) => pv + cv, 0);
    return subTotal;
  };

  const calculateTax = (): number => {
    const tax = getCartSubtotalPrice() * 0.05;
    return Number(tax.toFixed(2));
  };

  const getCartTotalPrice = (): number => {
    const totalPrice = getCartSubtotalPrice() + calculateTax();
    return totalPrice;
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const onSuccess = (data: any) => {
    // use route parameter ? & to pass data
    // http://localhost:3000/confirmation?orderId=1&status=ordered

    router.push(`/confirmation?orderId=${data.orderId}&status=${data.status}`); // push to confirm router if successful

    setTimeout(() => {
      dispatch(clearOutCart());
    }, 1000);
  };

  const onError = () => {};

  const handleCreateOrder = () => {
    dispatch(createOrder({ payload: cartItems, onSuccess, onError })); // async
    // router.push() should't be placed here
  };

  // pagination
  const [currentPage, setCurrentPage] = useState(1); // determine page number and which items will be shown
  const [itemsPerPage, setItemsPerPage] = useState(3); // determine the number of items and pagination buttons

  // get current items
  // ** currentPage is the key factor to  filter paginated items **
  const indexOfLastItem = currentPage * itemsPerPage; // 3 * 3 => 9
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; // 9 - 3 => 6
  const currentItems = cartItems.slice(indexOfFirstItem, indexOfLastItem); // (6,9) => 6, 7 , 8

  // switch pages
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <Box>
      <AppBar
        sx={{
          backgroundColor: "#EFECE5",
          position: "fixed",
          p: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mx: 25,
            userSelect: "none",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link href={`/`}>
              <Tooltip title="Back to Home Page" placement="left">
                <AppsIcon sx={{ fontSize: 35, color: "#492540", mr: 2 }} />
              </Tooltip>
            </Link>
            <Typography
              variant="h5"
              sx={{ color: "black", fontWeight: "bold", mr: 90 }}
            >
              Shopping Cart
            </Typography>
          </Box>

          <Typography variant="h5" sx={{ color: "black" }}>
            {cartItems.length} {cartItems.length > 1 ? "Items" : "Item"}
          </Typography>
        </Box>
      </AppBar>

      {/* total price / confirm order */}
      {/* show the box only when cart is not empty */}
      {cartItems.length && (
        <Paper
          elevation={1}
          sx={{
            backgroundColor: "#f8ffe5",
            // backgroundColor: "#F8F7F5",
            width: 300,
            position: "fixed",
            right: 50,
            bottom: 90,
            borderRadius: "20px",
          }}
        >
          <Box
            sx={{
              padding: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Subtotal : $ {getCartSubtotalPrice()}
            </Typography>

            <Typography variant="h6" sx={{ my: 2 }}>
              Tax (5%) : $ {calculateTax()}
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Total (USD) : $ {getCartTotalPrice()}
            </Typography>

            <Fab
              color="primary"
              variant="extended"
              sx={{ mt: 3, px: 3 }}
              onClick={handleCreateOrder}
            >
              Confirm Order
            </Fab>
          </Box>
        </Paper>
      )}

      {/* item delete snackbar */}
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
      >
        <Alert severity="success" sx={{ width: "100%", fontSize: 17 }}>
          Item removed from cart successfully
        </Alert>
      </Snackbar>

      {/* be mindful of cartItems and currentItems here */}
      {cartItems.length ? (
        <Box sx={{ mt: 15 }}>
          {currentItems.map((item) => (
            <Box
              key={item.id}
              sx={{ display: "flex", justifyContent: "center", my: 3 }}
            >
              <Paper
                elevation={4}
                sx={{
                  display: "flex",
                  justifyContent: "between",
                  alignItems: "center",
                  width: 700,
                  height: 100,
                  mb: 1,
                  p: 3,
                }}
              >
                {/* items details */}
                <Box sx={{ width: 170 }}>
                  <img src={item.imageUrl || ""} width={120} />
                </Box>

                <Box sx={{ width: 400, userSelect: "none" }}>
                  <Typography color="#6c757d" sx={{ width: 350 }} noWrap>
                    {item.title}
                  </Typography>
                  <Typography
                    sx={{ mt: 1, fontWeight: "bold" }}
                    variant="h5"
                    color="#2f3e46"
                  >
                    $ {item.price * item.quantity}
                  </Typography>
                </Box>

                {/* quantity */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#EBEBEB",
                    padding: 0.5,
                    px: 2,
                    borderRadius: 5,
                  }}
                >
                  <RemoveIcon
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      handleUpdateQuantity(item.id, item.quantity - 1);
                      item.quantity === 1 && setOpen(true); // show snackbar
                    }}
                  />

                  <Typography variant="h6" sx={{ mx: 3 }}>
                    {item.quantity}
                  </Typography>

                  <AddIcon
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      handleUpdateQuantity(item.id, item.quantity + 1);
                    }}
                  />
                </Box>
              </Paper>
            </Box>
          ))}

          {/* pagination */}
          <Box
            sx={{
              mb: 3,
              position: "fixed",
              bottom: 10,
              left: 600,
            }}
          >
            <PaginationBar
              itemsPerPage={itemsPerPage}
              totalItems={cartItems.length} // total number of items in the cart
              paginate={paginate}
            />
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Typography variant="h4" sx={{ userSelect: "none" }}>
            No item in the Cart
          </Typography>
          <ProductionQuantityLimitsIcon sx={{ mx: 5, fontSize: 60 }} />
        </Box>
      )}
    </Box>
  );
};

export default Cart;
