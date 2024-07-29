/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function Paginate({
  pages,
  page,
  isAdmin = false,
  keyword = "",
}) {
  return (
    pages > 1 && (
      <nav className="my-4">
        <ul className="flex justify-center space-x-2">
          {[...Array(pages).keys()].map((x) => (
            <li key={x + 1}>
              <Link
                to={
                  !isAdmin
                    ? keyword
                      ? `/search/${keyword}/page/${x + 1}`
                      : `/page/${x + 1}`
                    : `/admin/productlist/${x + 1}`
                }
                className={`px-3 py-1 rounded border ${
                  x + 1 === page
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {x + 1}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    )
  );
}
