import "./Products.css";
import { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    navigate("/login", { replace: true });
  };

  const getProducts = async () => {
    try {
      let response = await axios.get("https://dummyjson.com/products");
      setProducts(response.data.products);
    } catch (error) {
      console.log("error", error);
    }
    setLoading(false);
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <nav className="nav-bar">
        <h2>Ecommerce</h2>
        <Button
          className="button"
          variant="contained"
          onClick={handleLogoutClick}
        >
          Logout
        </Button>
      </nav>
      {loading ? (
        <div>
          <CircularProgress />
          <h4>Loading Products...</h4>
        </div>
      ) : (
        <Grid container spacing={2}>
          {products.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={item.thumbnail}
                  alt={item.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Brand: {item.brand}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price: ₹{item.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Category: {item.category}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Products;
