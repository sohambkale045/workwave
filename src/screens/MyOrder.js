import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
  const [orderData, setOrderData] = useState(null); // Initialize orderData as null

  const fetchMyOrder = async () => {
    try {
      const userEmail = localStorage.getItem('userEmail');
      if (!userEmail) {
        console.error('Email not found in localStorage');
        return; // Handle missing email gracefully
      }

      const response = await fetch('http://localhost:5000/api/auth/myorderData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      setOrderData(data);
    } catch (error) {
      console.error('Error fetching order data:', error);
      // Handle errors appropriately (e.g., display error message to user)
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <Navbar />
      <div className='container'>
        <div className='row'>
          {orderData !== null ? ( // Check for null instead of undefined
            orderData.orderData.order_data.slice(0).reverse().map((item) => (
              <div className='col-12 col-md-6 col-lg-3' key={item.id}>
                {item.Order_date ? (
                  <div className='m-auto mt-5'>
                    <div>{item.Order_date}</div>
                    <hr />
                  </div>
                ) : (
                  <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <div className='container w-100 p-0' style={{ height: "38px" }}>
                        <span className='m-1'>{item.qty}</span>
                        <span className='m-1'>{item.size}</span>
                        <span className='m-1'>{item.price}</span>
                        <div className=' d-inline ms-2 h-100 w-20 fs-5'>₹{item.price}/-</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div>Loading order data...</div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
