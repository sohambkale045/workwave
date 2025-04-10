import React from 'react'
import { useCart, useDispatchCart } from './ContextReducer';
import trash from "./trash.svg";



export default function Cart() {
    let data= useCart();
    let dispatch = useDispatchCart();
    if(data.length ===0){
        return(
            <div>
                <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
            </div>
        )
    }
    const handleCheckOut = async () => {
        let userEmail = localStorage.getItem("userEmail");
        try {
            let response = await fetch("http://localhost:5000/api/orderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    order_data: data,
                    email: userEmail,
                    order_date: new Date().toDateString()
                })
            });
            console.log("Order Response", response);
            if (response.ok) {
                dispatch({ type: "DROP" });
            } else {
                console.error('Failed to checkout:', response.statusText);
            }
        } catch (error) {
            console.error('Error during checkout:', error);
        }
    }
    
    let totalprice = data.reduce((total,work)=>total+work.price,0)
    return(
        <div>
            <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
                <table className='table table-hover'>
                    <thead className='text-success fs-4'>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Quantity</th>
                            <th scope='col'>Options</th>
                            <th scope='col'>Amount</th>
                            <th scope='col'></th>
                        </tr>

                    </thead>
                    <tbody>
                        {data.map((work,index)=>(
                            <tr>
                                <th scope='row'>{index+1}</th>
                                <td>{work.name}</td>
                                <td>{work.qty}</td>
                                <td>{work.size}</td>
                                <td>{work.price}</td>
                                <td><button type="button" className="btn p-0"><img src={trash} alt="delete" onClick={()=>{dispatch({type:"REMOVE",index})}}/></button></td>
                            </tr>
                        ))}
                    </tbody>

                </table>
                <div><h1 className='fs-2'>Total Price:{totalprice}/-</h1></div>
                <div>
                    <button className='btn bg-success mt-5'onClick={handleCheckOut}>Check Out</button>
                </div>
            </div>
        </div>
    )
}
