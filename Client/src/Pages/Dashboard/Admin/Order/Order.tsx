import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeOrderStatus, fetchAllOrder } from "store/order/order-actions";
import DashboardLayout from "Components/Layout/DashboardLayout/DashboardLayout";
import { Toaster } from "react-hot-toast";

type orderStatus = "delivered" | "delivering" | "placed" | null;

interface OrderInterface {
  createdAt: string;
  deliveryLocation: string;
  paymentStatus: string;
  paymentType: string;
  phone: number;
  status: "Placed" | "Delivering" | "Delivered";
  total: number;
  user: string;
  zip: number;
  _id: string;
}

const Order = () => {
  const [orderStatus, setOrderStatus] = useState<orderStatus>(null);
  const [orderId, setOrderId] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllOrder());
  }, [dispatch, orderStatus]);

  const { orders, loading, error } = useSelector((state: any) => state.order);

  useEffect(() => {
    setOrderStatus(orders.status);
  }, [orders]);

  const orderChangeHandler = (id: string, status: orderStatus) => {
    console.log("orderChangeHandler", id, status);
    setOrderId(id);
    setOrderStatus(status);
    dispatch(changeOrderStatus(id, status!));
  };

  return (
    <DashboardLayout>
      <Toaster position="top-right" />
      <h1 className="text-2xl font-bold text-center my-10">Order</h1>

      {loading ? (
        <p className="text-center">"Loading..."</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto  max-w-full">
          <table className="table m-auto mt-8 ">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Total</th>
                <th>Order Status</th>
                <th>Payment Status</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Zip Code</th>
                <th>Payment Type</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order: OrderInterface, i: number) => (
                <tr key={i}>
                  <td>{order.user}</td>
                  <td>{order.total}</td>
                  <td>
                    <select
                      value={order?.status}
                      className="text-black"
                      onChange={(e: any) => {
                        console.log(e.target.value);

                        orderChangeHandler(order._id, e.target.value);
                      }}
                    >
                      <option value="placed">placed</option>
                      <option value="delivering">delivering</option>
                      <option value="delivered">delivered</option>
                    </select>
                  </td>
                  <td>{order.paymentStatus}</td>
                  <td>{order.phone}</td>
                  <td>{order.deliveryLocation}</td>
                  <td>{order.zip}</td>
                  <td>{order.paymentType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Order;
