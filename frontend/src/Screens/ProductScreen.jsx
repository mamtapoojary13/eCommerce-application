import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useState } from "react";
import { addToCart } from "../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Meta from "../components/Meta";

export default function ProductScreen() {
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
      setRating(0);
      setComment("");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link
        className="bg-gray-200 text-gray-700 px-4 py-2 rounded my-3 inline-block hover:bg-gray-300"
        to="/"
      >
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta title={product.name} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="col-span-1">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto rounded"
              />
            </div>
            <div className="col-span-1">
              <div className="border-b pb-4 mb-4">
                <h3 className="text-xl font-bold">{product.name}</h3>
              </div>
              <div className="border-b pb-4 mb-4">
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </div>
              <div className="border-b pb-4 mb-4">
                <p className="text-lg">Price: ${product.price}</p>
              </div>
              <div className="border-b pb-4 mb-4">
                <p className="text-lg">Description: {product.description}</p>
              </div>
            </div>
            <div className="col-span-1">
              <div className="border rounded p-4">
                <div className="border-b pb-4 mb-4">
                  <div className="flex justify-between">
                    <p className="text-lg">Price</p>
                    <strong className="text-lg">${product.price}</strong>
                  </div>
                </div>
                <div className="border-b pb-4 mb-4">
                  <div className="flex justify-between">
                    <p className="text-lg">Status</p>
                    <strong className="text-lg">
                      {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </strong>
                  </div>
                </div>
                {product.countInStock > 0 && (
                  <div className="border-b pb-4 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="text-lg">Qty</div>
                      <div>
                        <select
                          className="form-select block w-full mt-1"
                          value={qty}
                          onChange={(e) => setQty(Number(e.target.value))}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}
                <div className="text-center">
                  <button
                    className={`w-full py-2 px-4 rounded ${
                      product.countInStock === 0
                        ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                        : "bg-gray-600 text-white"
                    }`}
                    type="button"
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="review mt-8">
            <div className="col-span-1 md:col-span-2 lg:col-span-1">
              <h2 className="text-2xl font-bold mb-4">Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ul className="divide-y divide-gray-200">
                {product.reviews.map((review) => (
                  <li key={review._id} className="py-4">
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </li>
                ))}
                <li className="py-4">
                  <h2 className="text-xl font-bold mb-4">
                    Write a Customer Review
                  </h2>

                  {loadingProductReview && <Loader />}

                  {userInfo ? (
                    <form onSubmit={submitHandler}>
                      <div className="my-4">
                        <label
                          htmlFor="rating"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Rating
                        </label>
                        <select
                          id="rating"
                          className="mt-1 block w-64 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          required
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </select>
                      </div>
                      <div className="my-4">
                        <label
                          htmlFor="comment"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Comment
                        </label>
                        <textarea
                          id="comment"
                          rows="3"
                          className="mt-1 block w-64 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          required
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                      </div>
                      <button
                        disabled={loadingProductReview}
                        type="submit"
                        className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Submit
                      </button>
                    </form>
                  ) : (
                    <Message>
                      Please <Link to="/login">sign in</Link> to write a review
                    </Message>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
}
