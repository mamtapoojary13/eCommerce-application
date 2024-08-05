import { FaShoppingCart, FaUser, FaBars, FaCaretDown } from "react-icons/fa";
import Container from "./Container";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import logo from "../assets/logo.png";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import SearchBox from "./SearchBox";

export default function Header() {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);
  const userDropdownRef = useRef(null);
  const adminDropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const toggleAdminMenu = () => {
    setIsAdminMenuOpen(!isAdminMenuOpen);
  };

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      setIsUserMenuOpen(false);
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const handleClickOutside = (event) => {
    if (
      userDropdownRef.current &&
      !userDropdownRef.current.contains(event.target)
    ) {
      setIsUserMenuOpen(false);
    }
    if (
      adminDropdownRef.current &&
      !adminDropdownRef.current.contains(event.target)
    ) {
      setIsAdminMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header>
      <nav className="bg-gray-500 text-white py-4">
        <Container>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              className="text-xl font-bold flex items-center space-x-2"
            >
              <img src={logo} alt="logo" className="h-8 w-auto" />
              <span>Proshop</span>
            </Link>
            <div className="md:hidden flex items-center space-x-4">
              <SearchBox />
              <button
                onClick={toggleNavbar}
                className="text-white focus:outline-none"
                aria-controls="navbar-content"
              >
                <FaBars />
              </button>
            </div>
            <div
              className={`hidden md:flex items-center space-x-4`}
              id="navbar-content"
            >
              <SearchBox />
              <Link
                to="/cart"
                className="hover:text-gray-200 flex items-center space-x-1"
              >
                <FaShoppingCart />
                <span>Cart</span>
                {cartItems.length > 0 && (
                  <span
                    className="inline-block text-white text-xs font-semibold px-2.5 py-0.5 rounded-full ml-1.5"
                    style={{ backgroundColor: "#28a745" }}
                  >
                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                  </span>
                )}
              </Link>
              {userInfo ? (
                <div className="relative" ref={userDropdownRef}>
                  <button
                    onClick={toggleUserMenu}
                    className="hover:text-gray-200 flex items-center space-x-1"
                  >
                    <span>{userInfo.name}</span>
                    <FaCaretDown />
                  </button>
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-50">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 hover:bg-gray-200"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={logoutHandler}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="hover:text-gray-200 flex items-center space-x-1"
                >
                  <FaUser />
                  <span>Sign In</span>
                </Link>
              )}

              {userInfo && userInfo.isAdmin && (
                <div className="relative" ref={adminDropdownRef}>
                  <button
                    onClick={toggleAdminMenu}
                    className="hover:text-gray-200 flex items-center space-x-1"
                  >
                    <span>Admin</span>
                    <FaCaretDown />
                  </button>
                  {isAdminMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-50">
                      <Link
                        to="/admin/productlist"
                        className="block px-4 py-2 hover:bg-gray-200"
                        onClick={() => setIsAdminMenuOpen(false)}
                      >
                        Products
                      </Link>
                      <Link
                        to="/admin/orderlist"
                        className="block px-4 py-2 hover:bg-gray-200"
                        onClick={() => setIsAdminMenuOpen(false)}
                      >
                        Orders
                      </Link>
                      <Link
                        to="/admin/userlist"
                        className="block px-4 py-2 hover:bg-gray-200"
                        onClick={() => setIsAdminMenuOpen(false)}
                      >
                        Users
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div
            className={`md:hidden ${
              isOpen ? "block" : "hidden"
            } mt-4 space-y-2`}
            id="navbar-content-mobile"
          >
            <Link
              to="/cart"
              className=" hover:text-gray-200 flex items-center space-x-1"
              onClick={toggleNavbar}
            >
              <FaShoppingCart />
              <span>Cart</span>
            </Link>
            {userInfo ? (
              <>
                <Link
                  to="/profile"
                  className=" hover:text-gray-200 flex items-center space-x-1"
                  onClick={toggleNavbar}
                >
                  <FaUser />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={() => {
                    logoutHandler();
                    toggleNavbar();
                  }}
                  className="w-full text-left hover:text-gray-200 flex items-center space-x-1"
                >
                  <FaUser />
                  <span>Logout</span>
                </button>
                {userInfo.isAdmin && (
                  <>
                    <Link
                      to="/admin/productlist"
                      className=" hover:text-gray-200 flex items-center space-x-1"
                      onClick={toggleNavbar}
                    >
                      <span>Products</span>
                    </Link>
                    <Link
                      to="/admin/orderlist"
                      className=" hover:text-gray-200 flex items-center space-x-1"
                      onClick={toggleNavbar}
                    >
                      <span>Orders</span>
                    </Link>
                    <Link
                      to="/admin/userlist"
                      className="hover:text-gray-200 flex items-center space-x-1"
                      onClick={toggleNavbar}
                    >
                      <span>Users</span>
                    </Link>
                  </>
                )}
              </>
            ) : (
              <Link
                to="/login"
                className="hover:text-gray-200 flex items-center space-x-1"
                onClick={toggleNavbar}
              >
                <FaUser />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </Container>
      </nav>
    </header>
  );
}
