import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../slices/cartSlice";

export default function PaymentScreen() {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1 className="text-4xl font-medium my-4 text-gray-500">
        Payment Method
      </h1>
      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label
            className="block text-2xl text-gray-500 mb-2"
            htmlFor="paymentMethod"
          >
            Select Method
          </label>
          <div className="my-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                id="PayPal"
                name="paymentMethod"
                value="PayPal"
                checked={paymentMethod === "PayPal"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span className="ml-2">PayPal or Credit Card</span>
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Continue
        </button>
      </form>
    </FormContainer>
  );
}
