import React from 'react';
  import { Button, Card, CardBody, CardGroup, CardImg, CardText, CardTitle } from 'reactstrap';
 import '../Components/ServicesContainer.css'
import { addItemToCartItemStart } from '../Redux/Actions/addToCartActions';
import Swal from "sweetalert2";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
});


const Search = ({ finalListingData }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userID = JSON.parse(sessionStorage.getItem('userId'))

    const showServiceInfo = (data) => {
        if (sessionStorage.hasOwnProperty('USEREOS')) {
          const fulldata = {
            categories_ref_id: data?.id,
            Users_ref_id: userID
          }
          
          dispatch(addItemToCartItemStart(fulldata))
          setTimeout(() => {
            navigate(`/view-cart`)
          },1000)
        } else {    
          Swal.fire({
            title: 'You are not login in',
            text: "Want to Login?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'LogIn'
          }).then((result) => {
            if (result.isConfirmed) {
              navigate('/login')  
            }
          })
        }
  
           
      }
  
    return (
        <>
            <div>
                <div className='card-container'>
                    <h1 className='service-header text-capitalize'>{finalListingData.categoriesName}</h1>
                    <div className='topmost'>
                        <CardGroup className='card-grp'>
                            <div className='service-card-container'>
                                <Card color='white' className='new-services-cards'>
                                    <CardImg className='service-imgbody'
                                        alt={`${finalListingData?.categoriesName}`}
                                        src={`${finalListingData?.image}`}
                                        top
                                        width="100%"
                                    />
                                    <CardBody className='body-of-card'>
                                        <CardTitle tag="h3" className="text-center text-capitalize">{`${finalListingData?.categoriesName}`}</CardTitle>
                                        <CardText tag="h6" className="text-center text-capitalize ">{`${finalListingData?.description}`}</CardText>
                                        <div className='buttons-flex'>
                                            <Button className='m-2' color='warning' onClick={() => showServiceInfo(finalListingData)}>+ Add to cart </Button>
                                        </div>
                                    </CardBody>
                                </Card>
                            </div>
                        </CardGroup>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Search