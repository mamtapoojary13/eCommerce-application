/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function CheckoutSteps({ step1, step2, step3, step4 }) {
  return (
    <nav className="flex justify-center mb-4">
      <div className="px-4">
        {step1 ? (
          <Link
            to="/login"
            className="text-gray-500 font-medium hover:text-gray-700"
          >
            Sign In
          </Link>
        ) : (
          <span className="text-gray-400">Sign In</span>
        )}
      </div>

      <div className="px-4">
        {step2 ? (
          <Link
            to="/shipping"
            className="text-gray-500 font-medium hover:text-gray-700"
          >
            Shipping
          </Link>
        ) : (
          <span className="text-gray-400">Shipping</span>
        )}
      </div>

      <div className="px-4">
        {step3 ? (
          <Link
            to="/payment"
            className="text-gray-500 font-medium hover:text-gray-700"
          >
            Payment
          </Link>
        ) : (
          <span className="text-gray-400">Payment</span>
        )}
      </div>

      <div className="px-4">
        {step4 ? (
          <Link
            to="/placeorder"
            className="text-gray-500 font-medium hover:text-gray-700"
          >
            Place Order
          </Link>
        ) : (
          <span className="text-gray-400">Place Order</span>
        )}
      </div>
    </nav>
  );
}
