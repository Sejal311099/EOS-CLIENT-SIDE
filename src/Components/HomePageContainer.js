import React, { useEffect, useState } from "react";
import "./HomePageContainer.css";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
} from "reactstrap";
import { useDispatch, useSelector } from 'react-redux';
import { getAllBestOffersStart } from '../Redux/Actions/bestOffersActions';
import Select from 'react-select'
import axios from "axios";
import { useNavigate } from "react-router";
import Search from "../Pages/Search";
import { getServicesForOptionsStart, getSingleCategorySuccess } from "../Redux/Actions/servicesActions";

const HomePageContainer = () => {
  const navigate = useNavigate();
  const [flag, setflag] = useState(false)
  const dispatch = useDispatch();
  const [finalListingData, setfinalListingData] = useState([])
  const [isClearable, setIsClearable] = useState(true);
  const bestOfferData = useSelector((state) => state?.bestOffers?.bestOffers?.bestoffersData)
  const optDummy = useSelector((state) => state?.services?.optionsLoad?.categorySearch)
  const kaka = useSelector((state) => state)
  const [firstA, setfirstA] = useState("")
  const [firstC, setfirstC] = useState("")
  const [CheackVal, setCheackVal] = useState("")

  useEffect(() => {
    // call Api For Print the Option in Search Field Start
    dispatch(getServicesForOptionsStart())
    // call Api For Print the Option in Search Field End
  }, []);

  useEffect(() => {
    dispatch(getAllBestOffersStart())
  },[])

  const options = optDummy !== undefined && optDummy.map((iteam, index) => {
    return { value: iteam.categoriesName, label: iteam.categoriesName, id: iteam.id }
  })

  const handleSelect = (a, b, c) => {
    setfirstA(a)
    setfirstC(c)
    setCheackVal({ value: a, label: b, id: c })

    axios({ url: `http://localhost:9000/api/categories/single-categories/${c}`, method: "GET", })
      .then((res) => {
        setfinalListingData(res.data.categoriesData)
        setflag(true)
      })

  }

  const clearableHere = () => {
    setCheackVal({ value: "", label: "", id: "" })
    setflag(false)

  }
  return (<>
    <>
      <div>
        <div className="imageContainer">
          <div className="search_class">
            <Select
              className="text-capitalize"
              placeholder="Search for services"
              options={options}
              onChange={(e) => handleSelect(e.value, e.label, e.id)}
              value={CheackVal}
            />
            {/*  CODE FOR CLEAR BUTTON IN SEARCH FIELD */}
            {flag && CheackVal.id !== "" &&
              <button type="button" class="close" aria-label="Close">
                <span className="cstm_close_span" aria-hidden="true" onClick={clearableHere}>&times;</span>
              </button>
            }
          </div>
          <h1 className="title-font text-capitalize">Home services, On demand.</h1>
          <div className="cardContainer">
          <CardGroup className="bestOffers-container">
            {bestOfferData?.slice(0,4).map((offer, index) => {
              return (
                offer?.status === 1 &&
                      <Card className="m-1 d-flex align-items-center" key={index}>
                        <CardImg 
                          alt="Card image"
                          src={`${offer.image}`}
                          top
                          className="offers-image"
                         // width="80%"
                        />
                        <CardBody>
                          <CardTitle tag="h5" className="text-center">
                            {`${offer.bestoffersName}`}
                          </CardTitle>
                          <CardSubtitle
                            className="mb-2 text-muted text-center"
                            tag="h6"
                          >
                            {`${offer.description}`}
                          </CardSubtitle>                        
                        </CardBody>
                      </Card>     
              )
            })
            }
            </CardGroup>
          </div>
        </div>
      </div>
      {flag ? <Search finalListingData={finalListingData} /> : null}

    </>
  </>
  );
};
export default HomePageContainer;




