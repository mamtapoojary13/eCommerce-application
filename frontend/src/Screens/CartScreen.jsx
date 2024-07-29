import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../slices/cartSlice";

export default function CartScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-2/3">
        <h1 className="mb-7 text-4xl font-semibold text-gray-500">
          Shopping Cart
        </h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty{" "}
            <Link to="/" className="text-blue-800 underline">
              Go Back
            </Link>
          </Message>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center space-x-4 border-b pb-4"
              >
                <div className="w-1/6">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full rounded"
                  />
                </div>
                <div className="w-1/3">
                  <Link to={`/product/${item._id}`}>{item.name}</Link>
                </div>
                <div className="w-1/6">${item.price}</div>
                <div className="w-1/6">
                  <select
                    className="form-select mt-1 block w-full"
                    value={item.qty}
                    onChange={(e) =>
                      addToCartHandler(item, Number(e.target.value))
                    }
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-1/6">
                  <button
                    type="button"
                    className="bg-gray-200 text-gray-600 rounded p-2 hover:bg-gray-300"
                    onClick={() => removeFromCartHandler(item._id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="md:w-1/3 mt-8 md:mt-0">
        <div className="border rounded-lg p-4">
          <div className="border-b pb-4 mb-4">
            <h2 className="text-xl font-bold">
              Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
              items
            </h2>
            <p className="text-lg">
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </p>
          </div>
          <button
            type="button"
            className="w-full bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-800"
            disabled={cartItems.length === 0}
            onClick={checkoutHandler}
          >
            Proceed To Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
