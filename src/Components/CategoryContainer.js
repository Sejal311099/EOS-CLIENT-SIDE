import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, CardGroup, CardImg, CardSubtitle, CardTitle } from 'reactstrap';
import { getAllServicesStart } from '../Redux/Actions/servicesActions';
import './CategoryContainer.css'


const CategoryContainer = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const servicesData = useSelector((state) => state?.services?.services?.serviceData);

  useEffect(() => {
    dispatch(getAllServicesStart());
  }, []);

  const handleClick = (services) => {
    // console.log("CARD ID~~~>>>>", services?.id , services?.servicename)
    navigate(`/services/${services.id}`, services)

  }

  return (
    <>
      <div>
        <div className='card-container'>
          <h1 className='all-services color_white'>All Services</h1>
          <div className='topmost'>
            <CardGroup>
              {servicesData?.slice(0, 4).map((services, index) => {
                return (
                  services.status === 1 &&
                  <div key={index} >
                    <Card className='services-card' color='white' outline onClick={() => handleClick(services)}>
                      <CardImg
                      className='category-img'
                        alt={services?.servicename}
                        src={services?.image}
                        top
                       // width="100%"
                      />
                      <CardBody>
                        <CardTitle tag="h6" className="text-center text-capitalize ">{services?.servicename}</CardTitle>
                      </CardBody>
                    </Card>
                  </div>
                )
              })
              }
            </CardGroup>

            <CardGroup>
              {servicesData?.slice(4, 7).map((services, index) => {
                return (
                  services?.status === 1 &&
                  <div key={index}>
                    <Card className='services-card' color='white' outline onClick={() => handleClick(services)}>
                      <CardImg
                        className='fix-img-class'
                        src={services?.image}
                        alt={services?.servicename}
                      // top
                      // width="100%"
                      />
                      <CardBody className='cstm-head-services'>
                        <CardTitle tag="h6" className="text-center text-capitalize ">{services?.servicename}</CardTitle>
                      </CardBody>
                    </Card>
                  </div>
                )
              })
              }
            </CardGroup>
          </div>
        </div>
      </div>
    </>
  )
}

export default CategoryContainer;
