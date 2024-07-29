import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from "../slices/ordersApiSlice";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

export default function OrderScreen() {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPaypalScript();
        }
      }
    }
  }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Order is paid");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    });
  }

  function onError(err) {
    toast.error(err.message);
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  const deliverHandler = async () => {
    await deliverOrder(orderId);
    refetch();
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error.data.message}</Message>
  ) : (
    <>
      <h1 className="text-4xl font-medium mb-6 text-gray-500">
        Order {order._id}
      </h1>
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 mb-4 md:mb-0 md:mr-4">
          <div className="border-b pb-4 mb-4">
            <h2 className="text-2xl font-medium mb-2 text-gray-500">
              Shipping
            </h2>
            <p>
              <strong>Name: </strong> {order.user.name}
            </p>
            <p>
              <strong>Email: </strong>{" "}
              <a href={`mailto:${order.user.email}`} className="text-blue-500">
                {order.user.email}
              </a>
            </p>
            <p className="mb-3">
              <strong>Address:</strong> {order.shippingAddress.address},{" "}
              {order.shippingAddress.city} {order.shippingAddress.postalCode},{" "}
              {order.shippingAddress.country}
            </p>
            {order.isDelivered ? (
              <Message variant="success">
                Delivered on {order.deliveredAt}
              </Message>
            ) : (
              <Message variant="danger">Not Delivered</Message>
            )}
          </div>

          <div className="border-b pb-4 mb-4">
            <h2 className="text-2xl font-medium mb-2 text-gray-500">
              Payment Method
            </h2>
            <p className="mb-3">
              <strong>Method: </strong> {order.paymentMethod}
            </p>
            {order.isPaid ? (
              <Message variant="success">Paid on {order.paidAt}</Message>
            ) : (
              <Message variant="danger">Not Paid</Message>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-medium mb-3 text-gray-500">
              Order Items
            </h2>
            {order.orderItems.length === 0 ? (
              <Message>Order is empty</Message>
            ) : (
              <div>
                {order.orderItems.map((item, index) => (
                  <div key={index} className="flex items-center border-b py-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded mr-4"
                    />
                    <div className="flex-1">
                      <Link
                        to={`/product/${item.product}`}
                        className="text-blue-500"
                      >
                        {item.name}
                      </Link>
                    </div>
                    <div>
                      {item.qty} x ${item.price} = ${item.qty * item.price}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="w-full md:w-1/3">
          <div className="bg-white shadow-md rounded p-4">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Items</span>
              <span>${order.itemsPrice}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>${order.shippingPrice}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Tax</span>
              <span>${order.taxPrice}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Total</span>
              <span>${order.totalPrice}</span>
            </div>

            {!order.isPaid && (
              <div className="mb-4">
                {loadingPay && <Loader />}
                {isPending ? (
                  <Loader />
                ) : (
                  <div>
                    <div>
                      <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onError}
                      ></PayPalButtons>
                    </div>
                  </div>
                )}
              </div>
            )}

            {loadingDeliver && <Loader />}

            {userInfo &&
              userInfo.isAdmin &&
              order.isPaid &&
              !order.isDelivered && (
                <button
                  type="button"
                  className="btn btn-block bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                  onClick={deliverHandler}
                >
                  Mark As Delivered
                </button>
              )}
          </div>
        </div>
      </div>
    </>
  );
}
