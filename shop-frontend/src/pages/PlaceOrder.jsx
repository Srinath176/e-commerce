import './css/PlaceOrder.css'
import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import { useNavigate } from 'react-router-dom'



const PlaceOrder = () =>{

    const {getTotalCartAmount,all_product,cartItems} = useContext(ShopContext)
    

    const [data,setData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        street:"",
        city:"",
        state:"",
        zipcode:"",
        country:"",
        phone:""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
      }

    
      const placeOrder = async (event) => {

        let responseData;
        event.preventDefault();
        let orderItems = [];
        all_product.map((item)=>{
          if (cartItems[item.id]>0) {
            console.log('entered cartitems')
            let itemInfo = item;
            itemInfo["quantity"] = item._id;
            orderItems.push(itemInfo)
          }
        })
        console.log("order items"+orderItems)
        let orderData = {
            address:data,
            items:orderItems,
            amount:getTotalCartAmount()+2,
          }
          let response = await fetch('http://localhost:4000/placeorder',{
            method: 'POST',
            headers: {
              'auth-token':`${localStorage.getItem('auth-token')}`,
              'Content-Type': 'application/json',
            },
            body:JSON.stringify(orderData)
          }).then(response => response.json()).then(data => responseData=data)

          if(responseData.success){
            const{session_url} = responseData;
            window.location.replace(session_url);
          }
          else{
            alert('Error')
          }
    }

    const navigate = useNavigate();

    useEffect(()=>{
        if(!localStorage.getItem('auth-token')){
            navigate('/cart')
        }
        else if(getTotalCartAmount() === 0){
            navigate('/cart')
        }
    },[localStorage.getItem('auth-token')])


    return(
        <form onSubmit={placeOrder} className="place-order">
            <div className="place-order-left">
                <p className="title">Delivery Address</p>
                <div className="multi-fields">
                    <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First Name"/>
                    <input required name='lastName'onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Last Name"/>
                </div>
                <input  required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder="Email Address"/>
                <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder="Flat / Street"/>
                <div className="multi-fields">
                    <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder="City"/>
                    <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder="State"/>
                </div>
                <div className="multi-fields">
                    <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder="ZipCode"/>
                    <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder="Country"/>
                </div>
                <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder="Phone"/>
            </div>
            <div className="place-order-right">
            <div className="cartitems-total">
                    <h1>Cart Total</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p>${getTotalCartAmount()===0?0:2}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</h3>
                        </div>
                    </div>
                    <button type='submit'>PROCEED TO PAYMENT</button>
                </div>  
            </div>


        </form>
    )
}

export default PlaceOrder