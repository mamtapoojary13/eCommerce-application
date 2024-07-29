import { useGetProductsQuery } from "../slices/productsApiSlice";
import { Link, useParams } from "react-router-dom";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";

export default function HomeScreen() {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });
  const errorMessage =
    error?.data?.message ||
    `Error ${error?.status || 500}: Something went wrong.`;

  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link
          to="/"
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded my-4 inline-block hover:bg-gray-300"
        >
          Go Back
        </Link>
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{errorMessage}</Message>
      ) : (
        <>
          <Meta title="ProShop" />
          <h1 className="text-4xl font-semibold mb-4 text-gray-500">
            Latest Products
          </h1>
          <div className="flex flex-wrap -mx-2">
            {data.products.map((product) => (
              <div
                key={product._id}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 px-2 mb-4"
              >
                <Product product={product} />
              </div>
            ))}
          </div>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
}
