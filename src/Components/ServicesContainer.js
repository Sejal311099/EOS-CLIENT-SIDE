import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, CardImg, CardText, CardTitle } from 'reactstrap';
import { addItemToCartItemStart } from '../Redux/Actions/addToCartActions';
import { getSingleServiceStart } from '../Redux/Actions/servicesActions';
import HomePageContainer from './HomePageContainer';
import './ServicesContainer.css'
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
});


const ServicesContainer = () => {
  const userID = JSON.parse(sessionStorage.getItem('userId'))
    const { id } = useParams();
    const navigate = useNavigate();
    const SingleServiceData = useSelector((state) => state?.services?.singleService?.categories)

    const SingleServiceName = useSelector((state) => state?.services?.singleService?.servicename)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSingleServiceStart(id))
    }, [])

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
    <div>
        <HomePageContainer />

        <div className='card-container'>
          <h1 className='service-header text-capitalize'>{SingleServiceName}</h1>   

          <div className='topmost'>
          <CardGroup className='card-grp'>
            {SingleServiceData?.length !== 0? SingleServiceData?.map((services, index) => {
                return (
                  services.status === 1 &&
                <div key={index} className='service-card-container'>  
                    <Card color='white' className='new-services-cards cstm-border'>
                      <CardImg className='service-imgbody'
                        alt={`${services?.categoriesName}`}
                        src={`${services?.image}`}
                        top
                      />
            
                      <CardBody className='body-of-card'>
                        <CardTitle tag="h3" className="text-center text-capitalize">{`${services?.categoriesName}`}</CardTitle>
                        <CardText tag="h6" className="text-center text-capitalize">{`${services?.description}`}</CardText>
                        <CardText tag="h6" className="text-center text-capitalize">{`Price - ${services?.price}/-`}</CardText>
                        <div className='buttons-flex'>
                          <Button className='m-2' color='warning' onClick={() => showServiceInfo(services)}>+ Add to cart </Button>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                )
              }) 
              :
              <h5 style={{color:"white"}} className='service-header no-service text-capitalize'>Service Not Available!!</h5>
            }
            </CardGroup>
            </div>  
        </div>
    </div>
  )
}

export default ServicesContainer;
