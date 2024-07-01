import { useEffect, useState } from "react"
import './css/MyOrders.css'





const MyOrders = () => {

    const [data, setData] = useState([])

    const fetchOrders = async(req,res) => {

        let response = await fetch('http://localhost:4000/userorders',{
            method: 'POST',
            headers: {
              'auth-token':`${localStorage.getItem('auth-token')}`,
              'Content-Type': 'application/json',
            },
            body:JSON.stringify({})
          }).then(response => response.json()).then(data => {console.log("userOrders"+data); setData(data)})

    }

    useEffect(()=>{

        if (localStorage.getItem('auth-token')) {
            fetchOrders();
        }
    },[localStorage.getItem('auth-token')])


    return (
        <div className="my-orders">
            <h2 className='myordersp'>My Orders</h2>
            <h2>payment done, now sit back and relax</h2>
            {/* <div className="container">
                {data.map((order, index) => {
                    return (
                        <div key={index} className='my-orders-order'>
                            <p>{order.items.map((item, index) => {
                                if (index === order.items.length - 1) {
                                    return item.name + " x " + item.quantity
                                }
                                else {
                                    return item.name + " x " + item.quantity + ","
                                }
                            })}</p>
                            <p>${order.amount}.00</p>
                            <p>Items: {order.items.length}</p>
                            <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                            <button onClick={fetchOrders}>Track Order</button>
                        </div>
                    )
                })}
            </div> */}
        </div>
    )
}


export default MyOrders;