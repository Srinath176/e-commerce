import React, { useEffect } from 'react'
import './css/Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'



const Verify = () => {

    const [searchParams,setSearchParams] = useSearchParams();
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    const navigate = useNavigate();

    const verifyPayment = async () => {

        let responseData;
        const response = await fetch('http://localhost:4000/verify',{

            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body:JSON({success,orderId})
        }).then(response => response.json()).then(data => responseData=data)
        if (responseData.success){
            navigate("/myorders");
        }
        else {
            navigate("/")
        }
    }


    useEffect(()=>{
        verifyPayment();
    },[])

  return (
    <div className='verify'>
        <div className="spinner"></div>
    </div>
  )
}

export default Verify