import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import '../styles/horizontalLinearStepper.style.scss'
import CheckoutCart from "./checkout.cart.component";
import { addressSelector, AppDispatch, authSelector, cartSelector, orderSelector } from "../app/store";
import { useSelector } from "react-redux";
import CheckoutAddress from "./checkout.address.component";
import CheckoutPayment from "./checkout.payment";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from '../app/slices/cart.slice';
import { setAddress, setCart, setFullname, setID, setPhoneNumber } from "../app/slices/order.slice";
import { IAddress } from "../models/address.model";
import { IOrder } from "../models/order.model";
import CartService from "../services/cart.service";
import ApplicationUtil from "../utils/application.util";

const HorizontalLinearStepper = () => {
  const cart = useSelector(cartSelector);
  const { addresses, selectingAddressID } = useSelector(addressSelector);
  const {user} = useSelector(authSelector)
  const order = useSelector(orderSelector);
  const steps = [
    "Your Cart",
    "Address",
    "Payment"
  ];
  const [activeStep, setActiveStep] = React.useState(0);
  // const [skipped, setSkipped] = React.useState(new Set<number>());
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  async function handleNext(event : React.MouseEvent) {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === 0) {
      // setCart
      var orderID = ApplicationUtil.generateId();
      dispatch(setID(orderID));
      dispatch(setCart(cart));
      if(user && user.phoneNumber && user.fullname){
        dispatch(setPhoneNumber(user.phoneNumber));
        dispatch(setFullname(user.fullname));
      }
    }
    if (activeStep === 1) {
      // set Address
      var address : IAddress | null = null ;
      for (let i = 0; i < addresses.length; i++) {
        const element = addresses[i];
        if (element.id === selectingAddressID)
          address = element
      }
      if(address) dispatch(setAddress(address.value))
    }
    if (activeStep === 2) {
      // Finish Feature Here
      // create Order
      console.log(Object.values(order))
      var response = await CartService.createOrder(order);
      if(response) dispatch(clearCart());
      event.preventDefault();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCompleteOrder = () => {
    setActiveStep(0);
    navigate('/');
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          return (
            <Step key={label} {...stepProps}>
              {/* <StepLabel {...labelProps}>{label}</StepLabel> */}
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <div className="__congrat">
            <h2>Order Completed !</h2>
            <small>Your order will be deliveried in the next 3 - 5 days !</small>
            <small>Thanks for choosing us ! </small>
          </div>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleCompleteOrder}>Continue to shopping !</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <React.Fragment>
            {/** Component here */}
            {(activeStep + 1) === 1 && (<CheckoutCart />)}
            {(activeStep + 1) === 2 && (<CheckoutAddress />)}
            {(activeStep + 1) === 3 && (<CheckoutPayment />)}
          </React.Fragment>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            {
              cart.items.length === 0 ? (<Button disabled onClick={handleNext}>
                Next
              </Button>) : (
                <Button onClick={handleNext}>
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              )
            }
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}

export default HorizontalLinearStepper