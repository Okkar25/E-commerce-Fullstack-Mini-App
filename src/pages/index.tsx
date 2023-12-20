import Products from "@/components/products";
import SearchProducts from "@/components/searchProducts";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProducts } from "@/store/slices/productSlice";
import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  Divider,
  Fab,
  IconButton,
  ListItemIcon,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Product } from "@prisma/client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const dispatch = useAppDispatch();
  const products = useAppSelector((store) => store.products.items);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // initial value
  // const [filteredProducts, setFilteredProducts] = useState<Product[]>(products); // initial value

  // next-auth login
  const { data: session } = useSession();

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

  if (session) {
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
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton sx={{ translate: -350 }} onClick={() => setOpen(true)}>
              <Avatar alt="Okkar Aung" src="profile.jpg" />
            </IconButton>
            <Typography
              sx={{ ml: 2, translate: -360, color: "grey", userSelect: "none" }}
            >
              Okkar Aung
            </Typography>
          </Box>

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
          <Dialog onClose={() => setOpen(false)} open={open}>
            <Box sx={{ p: 5 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Avatar />
                <DialogTitle>Your Profile</DialogTitle>
              </Box>

              <Typography sx={{ mb: 1 }}>
                You are currently logged in as
              </Typography>
              <Typography sx={{ mb: 2, fontWeight: "bold" }}>
                {session?.user?.email}
              </Typography>

              <Divider />

              <MenuItem sx={{ mt: 2 }}>
                <ListItemIcon>
                  <PersonAdd fontSize="small" />
                </ListItemIcon>
                Add another account
              </MenuItem>

              <MenuItem>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>

              <MenuItem onClick={() => signOut()}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Box>
          </Dialog>
        </Box>
      </Box>
    );
  }
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <Card sx={{ width: 300, p: 3, backgroundColor: "#EFECE5" }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              mb: 2,
            }}
          >
            <Typography variant="h5" sx={{ fontFamily: "monospace" }}>
              Welcome Back
            </Typography>
            <AutoAwesomeIcon sx={{ fontSize: 25 }} />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
            }}
          >
            <TextField label="Username" variant="standard" />
            <TextField label="Password" type="password" variant="standard" />
          </Box>

          <Button sx={{ fontSize: 10, color: "gray", ml: 4, mt: 2 }}>
            Forget password
          </Button>
        </CardContent>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            mx: "auto",
          }}
        >
          <Button
            variant="text"
            color="secondary"
            sx={{ mx: "auto", width: "fit-content", borderRadius: 5 }}
          >
            Login in
          </Button>

          <Button
            variant="contained"
            sx={{ mx: "auto", width: "80%", borderRadius: 5 }}
            onClick={() => signIn()}
          >
            Sign in with Google
          </Button>
        </Box>
      </Card>
    </Box>
  );
}
