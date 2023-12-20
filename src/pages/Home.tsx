import Products from "@/components/products";
import SearchProducts from "@/components/searchProducts";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProducts } from "@/store/slices/productSlice";
import { Settings } from "@mui/icons-material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Logout from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Dialog,
  DialogTitle,
  Fab,
  IconButton,
  ListItemIcon,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { Product } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const dispatch = useAppDispatch();
  const products = useAppSelector((store) => store.products.items);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // initial value

  // const [filteredProducts, setFilteredProducts] = useState<Product[]>(products); // initial value
  // dialog
  const [open, setOpen] = useState(false);

  const cartItems = useAppSelector((store) => store.cart.items);

  // products = []
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  // products = [{...}]
  useEffect(() => {
    if (products.length) {
      setFilteredProducts(products);
    }
  }, [products]);

  // scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          position: "fixed",
          top: 0,
          right: 0,
          width: "100%",
          zIndex: 5,
        }}
      >
        <IconButton sx={{ translate: -400 }} onClick={() => setOpen(true)}>
          <Avatar alt="Okkar Aung" src="profile.jpg" />
        </IconButton>

        <SearchProducts
          products={products}
          setFilteredProducts={setFilteredProducts}
        />

        <Link href={`/cart`}>
          <Badge
            badgeContent={cartItems.length >= 0 && cartItems.length}
            color="secondary"
            sx={{ translate: 150 }}
          >
            <Tooltip title="Inventory">
              <ShoppingCartIcon
                sx={{
                  color: "#085f63",
                  cursor: "pointer",
                  fontSize: 35,
                }}
                color="action"
              />
            </Tooltip>
          </Badge>
        </Link>
      </Box>
      <Products products={filteredProducts} />
      <Fab
        size="medium"
        aria-label="edit"
        sx={{
          position: "fixed",
          bottom: 30,
          right: 30,
          backgroundColor: "bisque",
          scrollBehavior: "smooth",
        }}
        onClick={() => {
          scrollToTop();
        }}
      >
        <Tooltip title="Scroll to Top" placement="top">
          <KeyboardArrowUpIcon
            sx={{
              width: 40,
              height: 40,
              borderRadius: 10,
              color: "#085f63",
            }}
          />
        </Tooltip>
      </Fab>

      {/* Dialog login */}
      <Box>
        <Dialog onClose={() => setOpen(false)} open={true}>
          <Box sx={{ p: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Avatar />
              <DialogTitle>Your Profile</DialogTitle>
            </Box>

            <Typography>You are currently logged in as</Typography>
            <Typography>your email</Typography>

            <MenuItem>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>

            <MenuItem>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>

            <Button variant="contained" sx={{}}>
              Sign Out
            </Button>
          </Box>
        </Dialog>
      </Box>
    </Box>
  );
}
