import { Link } from "react-router-dom";
import Rating from "./Rating";

/* eslint-disable react/prop-types */
export default function Product({ product }) {
  return (
    <div className="my-3 p-3 rounded shadow-md">
      <Link to={`/product/${product._id}`}>
        <div className="rounded-t shadow-md">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto rounded-t"
          />
        </div>
      </Link>
      <div className="p-3">
        <Link to={`/product/${product._id}`}>
          <div className="font-bold text-lg product-title">{product.name}</div>
        </Link>
        <div>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </div>
        <h3 className="text-2xl">${product.price}</h3>
      </div>
    </div>
  );
}
