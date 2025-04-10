import React, { createContext, useReducer } from 'react'
import { useContext } from 'react';


const CartStateContext = createContext();
const CartDispatchContext = createContext();
const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state, { id: action.id, name: action.name, qty: action.qty, size: action.size, price: action.price, img: action.img }]
        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr;
        case "UPDATE":
            let arr = [...state]
            arr.find((work,index)=>{
                if(work.id===action.id){
                    console.log(work.qty, parseInt(action.qty), action.price + work.price)
                    arr[index]= { ...work,qty:parseInt(action.qty)+work.qty,price:action.price+work.price}
                }
                return arr
            })
            return arr
        case "DROP":
            let empArray = []
            return empArray
        default:
            console.log("error in reducer");
    }
}
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, [])
    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>

    )
}

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);