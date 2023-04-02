import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyOrder } from "store/order/order-actions";

interface OrderInterface {
  createdAt: string;
  deliveryLocation: string;
  paymentStatus: string;
  paymentType: string;
  phone: number;
  status: string;
  total: number;
  user: string;
  zip: number;
  _id: string;
}

const Orders = () => {
  const dispatch = useDispatch();

  const {
    loading,
    error,
    myOrders: orders,
  } = useSelector((state: any) => state.order);
  console.log(orders);

  useEffect(() => {
    dispatch(fetchMyOrder());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <p className="text-center mt-[10%]">Loading...</p>
      ) : error ? (
        <p className="text-red-500 mt-[10%] text-center">{error}</p>
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
              {orders?.map((order: OrderInterface, i: number) => (
                <tr key={i}>
                  <td>{order.user}</td>
                  <td>{order.total}</td>
                  <td>{order.status}</td>
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
    </>
  );
};

export default Orders;
