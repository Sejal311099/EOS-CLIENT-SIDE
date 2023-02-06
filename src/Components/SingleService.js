import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, FormGroup, Input, Label } from 'reactstrap';
import { deleteAllItemfromCartStart, deleteItemToCartItemStart, getAllAddtoCartItemStart } from '../Redux/Actions/addToCartActions';
import HomePageContainer from './HomePageContainer';
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-center",
  showConfirmButton: false,
  timer: 3000,
});

const SingleService = () => {

  const userId = sessionStorage.getItem('userId')
  const dispatch = useDispatch();
  let total = 0;
  let priceArr = []
   const [showChoice, setShowChoice] = useState(false);
  const [delFag, setdelFag] = useState(false)
   
  const cartData = useSelector((state) => state?.cartItems?.cartItems?.userData?.addTocarts);
  

  useEffect(() => {
    setdelFag(false)
     dispatch(getAllAddtoCartItemStart(userId));
   }, [delFag])


  const handleDelete = (cartitem) => {
    dispatch(deleteItemToCartItemStart(cartitem?.id))
    // window.location.reload()
    setdelFag(true)
   }

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay(total) {
    const data = {
      amount: total,
      currency: "INR",
      receipt: "Daddv#002",
    }

    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const result = await axios.post("http://localhost:9000/api/razorpay/payment", data);

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const resultData = {
      amount: result?.data?.paymentOrder?.amount,
      id: result?.data?.paymentOrder?.id,
      currency: "INR"
    }

      const options = {
      key:  "rzp_test_SlJ4d0T1oKLJ1D", 
      amount:result?.data?.paymentOrder?.amount,
      currency: "INR",
      name: "Easy on Services",
      description: "onDemand Services",

      order_id: result?.data?.paymentOrder?.id,
      handler: async function (response) {
        
       let  headerParam = {"x-razorpay-signature":response?.razorpay_signature}
          const data = {
     
            payment_id: response?.razorpay_payment_id,
            order_id: response?.razorpay_order_id,
          };

          const result = await axios.post("http://localhost:9000/api/razorpay/pay-verify", data , { headers: headerParam });
          // alert(result.data?.message); 
          // result.data.success == true && dispatch(deleteAllItemfromCartStart())
          if(result?.data.success == true) {
            Toast.fire({
              icon: "success",
              title: result?.data.message,
            });
            dispatch(deleteAllItemfromCartStart())
          } else {
            Toast.fire({
              icon: "error",
              title: result?.data.message,
            });
          }
      },
      prefill: {
          name: "Easy on Services",
          email: "easyonservices@example.com",
          contact: "9999999999",
      },
      notes: {
          address: "Easy on Services",
      },
      theme: {
        color: "#19253a",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

const displayPaymentChoices = () => {
  setShowChoice(true)
}


  return (
    <div>
      <HomePageContainer />

      <div className='addtocard-container card-container'>
        {
          cartData?.length > 0 ? cartData?.map((cartitem, index) => {
            priceArr.push(cartitem?.category?.price)
            total = 0;
            for (let i = 0; i < priceArr.length; i += 1) {
              total += priceArr[i];
            }
            return total &&
              (
                <div className='allCartItem' key={index}>
                  <div className='allcart-description'>
                    <div className='allcart-img'>
                      <img src={`${cartitem?.category?.image}`} alt='img' width='40%' height='50%' />
                    </div>
                    <div className='allcart-name heading-cstm'>
                      <div className='cst-middle'>
                        <div> {`${cartitem?.category?.categoriesName}`}</div>
                        <span className='cstm-cls'><Button className='btn-danger' onClick={() => handleDelete(cartitem)}>×</Button></span>
                      </div>

                    </div>
                  </div>

                  <div className='cartitem-price text-white csm-center m-2'>{`₹${cartitem?.category?.price}`}</div>
                </div>
              )
          }) : <h1 className='title-font'>No Items in your cart..!</h1>
        }

        <div className='allCartItem '>
          <div className='allcart-description'>
            <Button color='warning' disabled={cartData?.length > 0 ? false : true} onClick={() => displayRazorpay(total)} >Procced to Checkout</Button> 
          </div>
          <div className='cartitem-price text-white'>SubTotal: {total ? `₹${total}` : `₹0`} </div>    
        </div>


      </div>
    </div>
  )
}

export default SingleService;

// onClick={() => displayRazorpay(total)}

// onClick={() => displayPaymentChoices()}

