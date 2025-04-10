import React, { useEffect,useRef, useState } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';
export default function Card(props) {
    let dispatch = useDispatchCart();
    let data = useCart()
    const priceRef = useRef();
    let options = props.options;
    let priceOptions = Object.keys(options);
    const [qty,setQty]=useState(1)
    const [size,setSize]=useState("")
    let handleAddToCart = async()=>{
        let work = []
        for (const item of data){
            if(item.id===props.worker._id){
                work=item;
                break;
            }
        }
        if(work!==0){
            if(work.size=== size){
                await dispatch({type:"UPDATE",id:props.worker._id,price: finalPrice,qty:qty})

                return
    
            }
            else if(work.size!==size){

                await dispatch({type:"ADD",id:props.worker._id,name:props.worker.name,price:finalPrice,qty:qty,size:size})
                return
                //console.log(data)
            }
            return
           
        }
        await dispatch({type:"ADD",id:props.worker._id,name:props.worker.name,price:finalPrice,qty:qty,size:size})
        
    }
    let finalPrice = qty * parseInt(options[size]);
    useEffect(()=>{
        setSize(priceRef.current.value)
    },[])

    return (
        <div className="card mt-3" style={{ "maxWidth": "18rem", "height": "100%" }}>
            <img src={props.worker.img} className="card-img-top" alt="..." style={{height:"155px",objectFit:"fill"}} />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{props.worker.name}</h5>
                {/*<p className="card-text">This is some important text.</p>*/}
                <div className='container'>
                    <div className="d-flex justify-content-between align-items-center">
                        <select className='m-2 bg-success rounded' onChange={(e)=>setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            ))}
                        </select>
                        <select className='m-2 bg-success rounded' ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
                            {priceOptions.map((data) => (
                                <option key={data} value={data}>{data}</option>
                            ))}
                        </select>
                    </div>
                    <div className='d-inline fs-5 mt-2'>
                    ₹{finalPrice}/-
                    </div>
                </div>
                <hr>
                </hr>
                <button className={'btn btn-success justify-center ms-2'} onClick={handleAddToCart}>Add To Cart</button>
            </div>
        </div>
    );
}
