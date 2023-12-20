import { useAppDispatch } from "@/store/hooks";
import { cancelOrder } from "@/store/slices/cartSlice";
import AppsIcon from "@mui/icons-material/Apps";
import {
  Alert,
  AppBar,
  Box,
  Button,
  Snackbar,
  Step,
  StepLabel,
  Stepper,
  Tooltip,
  Typography,
} from "@mui/material";
import { OrderStatus } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const OrderConfirmation = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const router = useRouter();
  const orderId = router.query.orderId as string;
  const { status } = router.query;
  const [changeStatus, setChangeStatus] = useState(status); // to switch status between ORDERED and CANCELLED

  const onSuccess = () => {
    setOpen(true); // show snackbar when cancelled
    setChangeStatus(OrderStatus.CANCELLED);
    setStep(1);

    setTimeout(() => {
      router.push("/"); // back to home page
    }, 5000);
  };

  const onError = () => {};

  const handleCancelOrder = () => {
    dispatch(cancelOrder({ orderId, onSuccess, onError }));
  };

  // steps
  const steps = [
    OrderStatus.ORDERED,
    OrderStatus.CANCELLED,
    OrderStatus.OUTFORDELIVERY,
    OrderStatus.DELIVERED,
  ];
  const [step, setStep] = useState(0);

  // order status notification
  const statusNoti =
    changeStatus === OrderStatus.CANCELLED
      ? "We are sorry to see you cancel the order :') Do you want to reorder?"
      : "Your Order is Placed Successfully";

  return (
    <Box>
      <AppBar
        sx={{
          backgroundColor: "#EFECE5",
          position: "fixed",
          p: 3,
        }}
      >
        <Link href={`/`} style={{ position: "absolute" }}>
          <Tooltip title="Back to Home Page" placement="right">
            <AppsIcon sx={{ fontSize: 35, color: "#492540", mr: 3 }} />
          </Tooltip>
        </Link>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            userSelect: "none",
          }}
        >
          <Typography variant="h4" sx={{ color: "black" }}>
            Order Confirmation
          </Typography>
        </Box>
      </AppBar>

      <Box
        sx={{
          height: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            // justifyContent: "center",
            alignItems: "center",
            gap: 3,
            // backgroundColor: "red",
          }}
        >
          <Box sx={{ width: "60vw", mb: 5 }}>
            <Stepper activeStep={step} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>

          <Typography
            variant="h5"
            color={changeStatus === OrderStatus.CANCELLED ? "error" : "primary"}
            sx={{ mb: 5 }}
          >
            {statusNoti}
          </Typography>

          <Typography variant="h5">Order Id : {orderId}</Typography>

          <Typography variant="h6">Status : {changeStatus}</Typography>

          <Button
            variant="contained"
            onClick={handleCancelOrder}
            disabled={changeStatus === OrderStatus.CANCELLED}
          >
            Cancel Order
          </Button>

          <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={() => setOpen(false)}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            <Alert severity="success" sx={{ width: "100%", fontSize: 17 }}>
              Your Order Has Been Cancelled !
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </Box>
  );
};

export default OrderConfirmation;
