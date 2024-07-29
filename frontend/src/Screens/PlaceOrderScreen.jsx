import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import Loader from "../components/Loader";
import { useCreateOrderMutation } from "../slices/ordersApiSlice";
import { clearCartItems } from "../slices/cartSlice";
import { useEffect } from "react";

export default function PlaceOrderScreen() {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const dispatch = useDispatch();
  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-2/3">
          <div className="bg-white shadow rounded-lg p-4 mb-4">
            <h2 className="text-xl font-semibold mb-4">Shipping</h2>
            <p>
              <strong>Address:</strong> {cart.shippingAddress.address},{" "}
              {cart.shippingAddress.city} {cart.shippingAddress.postalCode},{" "}
              {cart.shippingAddress.country}
            </p>
          </div>

          <div className="bg-white shadow rounded-lg p-4 mb-4">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            <strong>Method: </strong> {cart.paymentMethod}
          </div>

          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Order Items</h2>
            {cart.cartItems.length === 0 ? (
              <Message>Your cart is empty</Message>
            ) : (
              <ul>
                {cart.cartItems.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between mb-4"
                  >
                    <div className="flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded mr-4"
                      />
                      <Link
                        to={`/product/${item.product}`}
                        className="text-blue-500 hover:underline"
                      >
                        {item.name}
                      </Link>
                    </div>
                    <div className="text-gray-700">
                      {item.qty} x ${item.price} = $
                      {(item.qty * (item.price * 100)) / 100}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="md:w-1/3">
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4 border-b pb-4">
              Order Summary
            </h2>
            <ul>
              <li className="flex justify-between mb-4">
                <div>Items</div>
                <div>${cart.itemsPrice}</div>
              </li>
              <li className="flex justify-between mb-4">
                <div>Shipping</div>
                <div>${cart.shippingPrice}</div>
              </li>
              <li className="flex justify-between mb-4">
                <div>Tax</div>
                <div>${cart.taxPrice}</div>
              </li>
              <li className="flex justify-between mb-4">
                <div>Total</div>
                <div>${cart.totalPrice}</div>
              </li>
              {error && (
                <li className="mb-4">
                  <Message variant="danger">{error.data.message}</Message>
                </li>
              )}
              <li>
                <button
                  type="button"
                  className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </button>
                {isLoading && <Loader />}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
