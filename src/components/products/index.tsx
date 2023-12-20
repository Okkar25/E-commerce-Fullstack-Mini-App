import { Box, Skeleton, Stack } from "@mui/material";
import { Product } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProductCard from "../productCard";

interface Props {
  products: Product[];
}

const Products = ({ products }: Props) => {
  // skeleton loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: "50px",
        justifyContent: "center",
        mb: 10,
        mt: 20,
      }}
    >
      {products.map((product) => (
        <Box key={product.id}>
          <Link
            href={`products/${product.id}`}
            style={{ textDecoration: "none" }}
          >
            {loading ? (
              <Stack spacing={2} sx={{ mb: 5 }}>
                <Skeleton variant="rounded" width={380} height={180} />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1rem" }}
                  width="40%"
                />
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1rem" }}
                  width="80%"
                />
              </Stack>
            ) : (
              <ProductCard
                title={product.title}
                description={product.description}
                imageUrl={product.imageUrl}
              />
            )}
          </Link>
        </Box>
      ))}
    </Box>
  );
};

export default Products;
