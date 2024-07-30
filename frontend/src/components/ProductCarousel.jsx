/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";
import Message from "./Message";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ProductCarousel() {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    appendDots: (dots) => (
      <div style={{ bottom: "10px" }}>
        <ul
          style={{
            margin: "0px",
            display: "flex",
            justifyContent: "center",
            padding: "0",
          }}
        >
          {dots}
        </ul>
      </div>
    ),
    customPaging: (i) => (
      <div style={{ width: "10px", height: "2px", background: "black" }} />
    ),
  };

  return isLoading ? null : error ? (
    <Message variant="danger">{error?.data?.message || error.error}</Message>
  ) : (
    <div className="relative mb-4">
      <Slider {...settings}>
        {products.map((product) => (
          <div
            key={product._id}
            className="relative w-full h-64 md:h-80 lg:h-96"
          >
            <Link
              to={`/product/${product._id}`}
              className="relative block w-full h-full"
            >
              <div className="relative w-full h-full flex">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-1/2 h-full object-cover"
                />
                <div className="w-1/2 h-full bg-gray-500"></div>
              </div>
              <div className="carousel-caption absolute w-full left-0 right-0 bottom-0 bg-black bg-opacity-50 text-white p-4">
                <h2 className="text-right">
                  {product.name} (${product.price})
                </h2>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}

const CustomNextArrow = ({ onClick }) => (
  <div
    className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 cursor-pointer bg-black bg-opacity-50 rounded-full p-2"
    onClick={onClick}
  >
    <FaChevronRight className="text-white" />
  </div>
);

const CustomPrevArrow = ({ onClick }) => (
  <div
    className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 cursor-pointer bg-black bg-opacity-50 rounded-full p-2"
    onClick={onClick}
  >
    <FaChevronLeft className="text-white" />
  </div>
);
