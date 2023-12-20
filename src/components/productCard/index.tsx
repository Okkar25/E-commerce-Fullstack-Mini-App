import { Box, CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useState } from "react";

interface Props {
  price?: number;
  title: string;
  description: string;
  imageUrl: string | null;
}

const ProductCard = ({ title, description, imageUrl, price }: Props) => {
  // skeleton
  const [loading, setLoading] = useState(true);

  return (
    <Box>
      <Paper elevation={0}>
        <Card sx={{ maxWidth: 345, height: "360px", p: 2 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="100%"
              image={imageUrl || ""}
              alt={title}
              sx={{
                width: "200px",
                height: "220px",
                mx: "auto",
                objectFit: "contain",
              }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" noWrap>
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Paper>
    </Box>
  );
};

export default ProductCard;
