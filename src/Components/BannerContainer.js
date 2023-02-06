import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBannersStart } from '../Redux/Actions/bannersActions';
import './BannerContainer.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Carousel,
    CarouselItem,
    CarouselIndicators,
    CarouselControl,
} from 'reactstrap';

const BannerContainer = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllBannersStart());
    }, [])

    const items = useSelector((state) => state?.banners?.banners?.BannerData);
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [animating, setAnimating] = React.useState(false);

    const itemLength = items?.length - 1 ;
    const previousButton = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? itemLength : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const nextButton = () => {
        if (animating) return;
        const nextIndex = activeIndex === itemLength ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }
   
    const carouselItemData = items && items.map((item) => {
        return (
            <CarouselItem
                key={item?.id}
                onExited={() => setAnimating(false)}
                onExiting={() => setAnimating(true)}
            >
                <img src={item?.image} alt={item?.imageName} />
            </CarouselItem>
        );
    });

    return (
        <div>
           
            {
                carouselItemData &&  
                <div className='car-img'>
                    <div>
                        <h1 className='banner-header text-center mt-1'>Banners</h1>
                    </div>
                    <Carousel
                        previous={previousButton} next={nextButton}
                        activeIndex={activeIndex}>
                        <CarouselIndicators items={items}
                            activeIndex={activeIndex}
                            onClickHandler={(newIndex) => {
                                if (animating) return;
                                setActiveIndex(newIndex);
                            }} />

                        {carouselItemData}
                                    {/* <CarouselControl directionText="Prev"
                                direction="prev" onClickHandler={previousButton} />
                            <CarouselControl directionText="Next"
                                direction="next" onClickHandler={nextButton} /> */}
                    </Carousel>
                </div>
            }
        </div>
    );
}

export default BannerContainer;



