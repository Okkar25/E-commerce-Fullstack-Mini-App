import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import AppsIcon from "@mui/icons-material/Apps";
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Fab,
  Rating,
  Snackbar,
  Tooltip,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const ProductDetailPage = () => {
  const router = useRouter();
  const productId = Number(router.query.id);
  const products = useAppSelector((store) => store.products.items);
  const product = products.find((product) => product.id === productId);
  const dispatch = useAppDispatch();

  // snackbar
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };

  // rating
  const [value, setValue] = useState<number | null>(
    Math.floor(Math.random() * 5)
  );

  if (!product) return null;

  const statusLabel = (labelOne: string, labelTwo: string) => {
    return product?.isAvailable === true ? labelOne : labelTwo;
  };

  const itemAvailable = statusLabel("in stock", "out of stock");
  const stockBtnColor = statusLabel("blue", "red");
  const addToCartBtnText = statusLabel(
    "add to cart",
    "temporarily unavailable"
  );

  return (
    <Box sx={{ display: "flex", alignItems: "center", height: "100vh" }}>
      <Link href="/">
        <Fab
          size="small"
          sx={{ position: "fixed", top: 25, left: 25 }}
          color="primary"
        >
          <Tooltip title="Back to Home Page">
            <AppsIcon />
          </Tooltip>
        </Fab>
      </Link>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 5,
          mx: 15,
        }}
      >
        <Box sx={{ mr: 10, pointerEvents: "none" }}>
          <img src={product?.imageUrl || ""} width={470} />
        </Box>

        <Box>
          <Typography variant="h4" sx={{ mb: 7 }}>
            {product?.title}
          </Typography>
          <Typography variant="h6" sx={{ mb: 5 }} color="#9a8c98">
            {product?.description}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h4"
              sx={{ mb: 5, fontWeight: "bold" }}
            >{`$ ${product?.price}`}</Typography>

            <Box>
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
            </Box>
          </Box>

          <ButtonGroup variant="outlined" sx={{ mb: 10 }} color="primary">
            <Button>Item Availability</Button>
            <Button sx={{ color: `${stockBtnColor}` }}>{itemAvailable}</Button>
          </ButtonGroup>

          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <Fab
              variant="extended"
              sx={{ px: 3 }}
              color="primary"
              disabled={product.isAvailable === false}
              onClick={() => {
                // dispatch(addToCart(product));
                dispatch(addToCart({ ...product, quantity: 1 })); // cartItem --> quantity is added
                handleClick();
                router.push(`/`); // go to home page after clicking button
              }}
            >
              {addToCartBtnText}
            </Fab>

            <Snackbar
              open={open}
              autoHideDuration={3000}
              onClose={() => setOpen(false)}
            >
              <Alert severity="success" sx={{ width: "100%", fontSize: 18 }}>
                Item added to cart successfully !
              </Alert>
            </Snackbar>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetailPage;
