import React, { useEffect, useState } from 'react';
import BannerContainer from '../Components/BannerContainer';
import CategoryContainer from '../Components/CategoryContainer';
import HomePageContainer from '../Components/HomePageContainer';


const Home = () => {
  const [loaderState, setloaderState] = useState(false)
  useEffect(() => {
    setloaderState(true)
    setTimeout(() => {
      setloaderState(false)
    }, 2000);
  }, [])

  return (
    <>
      {loaderState && <div class="lds-hourglass loader"></div>}
      <div >
        <div>
          <HomePageContainer />
          <CategoryContainer />
          <BannerContainer />
        </div>
      </div>
    </>
  )
}

export default Home;
