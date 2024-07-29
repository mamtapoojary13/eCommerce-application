import { FaTimes } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useGetOrdersQuery } from "../../slices/ordersApiSlice";
import { Link } from "react-router-dom";

export default function OrderListScreen() {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <>
      <h1 className="text-4xl font-medium mb-4 text-gray-500">Orders</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">USER</th>
                <th className="px-4 py-2 border">DATE</th>
                <th className="px-4 py-2 border">TOTAL</th>
                <th className="px-4 py-2 border">PAID</th>
                <th className="px-4 py-2 border">DELIVERED</th>
                <th className="px-4 py-2 border">DETAILS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-t">
                  <td className="px-4 py-2 border">{order._id}</td>
                  <td className="px-4 py-2 border">
                    {order.user && order.user.name}
                  </td>
                  <td className="px-4 py-2 border">
                    {order.createdAt.substring(0, 10)}
                  </td>
                  <td className="px-4 py-2 border">${order.totalPrice}</td>
                  <td className="px-4 py-2 border">
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td className="px-4 py-2 border">
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td className="px-4 py-2 border">
                    <Link
                      to={`/order/${order._id}`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
