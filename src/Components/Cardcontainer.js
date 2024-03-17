import Restaurantcard from "./Restaurantcard";
import Carousel from "./Carousel";
import masterData from "../utils/dummyData"; 
import { useState, useEffect } from "react";
import { RES_URL } from "../utils/config";
import Title from "./Title";
import Shimmer from "./Shimmer";

const Cardcontainer = () => {
  const restaurantdata = masterData[0]?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
  const collection = masterData[0]?.data?.cards[0]?.card?.card?.imageGridCards?.info;
  const [restaurant, setRestaurant] = useState([]);
  const [masterDataState, setmasterDataState] = useState([]);
  const [searchText, setSearchText] = useState([]);
  const [title, setTitle] = useState([]);
  const [title1, setTitle1] = useState([]);
  const [category, setActiveCategory] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const getData = async () => {
    try {
      const data = await fetch(RES_URL);
      const json = await data.json();
      console.log("responseData", json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
      setRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
      setmasterDataState(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
      setTitle(json?.data.cards[0]?.card?.card?.header.title);
      setTitle1(json?.data.cards[1]?.card?.card?.header.title);

    } catch (err) {
      console.log("error", err);
      setErrorMessage("There is sime error while fetching the data, please try again");
      
    }
  }

  const handleSearchText = (e) => {
    setSearchText(e.target.value);
  }

  const searchRestaurant = () => {
    console.log("searchText", searchText);
    //filter restaurant logic start//
    const filteredData = masterDataState.filter(resItem => resItem?.info?.name.toLowerCase().includes(searchText.toLowerCase()));
    setRestaurant(filteredData);
  }

  const handleRating = () => {
    const filteredData = masterDataState.filter(resItem => resItem?.info?.avgRating > 4.5);
    if (restaurant !== masterDataState && category === "rating") {
      handleReset();
    } else {
      setRestaurant(filteredData);
      setActiveCategory("rating");
      console.log("filteredData", filteredData);
    }
  }

  const handleDeliveryTime = () => {
    const filteredData = masterDataState.filter(resItem => resItem?.info?.sla?.deliveryTime < 30);
    if (restaurant !== masterDataState && category === "delivery") {
      handleReset();
    } else {
      setRestaurant(filteredData);
      setActiveCategory("delivery");
      console.log("filteredData", filteredData);
    }
  }

  const handleCategory = () => {
    const filteredData = masterDataState.filter(resItem => resItem?.info?.veg);
    if (restaurant !== masterDataState && category === "veg") {
      handleReset();
    } else {
      setRestaurant(filteredData);
      setActiveCategory("veg");
      console.log("filteredData", filteredData);
    }
  }
  

  const handleReset = () => {
    setRestaurant(masterDataState);
  }

  useEffect(() => {
    console.log("useEffect called");
    getData();
  }, []);

  console.log("component rendered");

  return (
    <>
      <div className="container full-main mt-4">
        <div className="d-flex gap-2">
          <input type="text" value={searchText} onChange={handleSearchText} />
          <button className="btn btn-sm btn-success" onClick={searchRestaurant}>Search</button>
        </div>
        <div className="btn-container">
          <button className="btn btn-sm btn-dark mx-1" style={{backgroundColor: category==="rating" ? "green" : "" }} onClick={handleRating}>Rating 4.5+</button>
          <button className="btn btn-sm btn-dark mx-1" style={{backgroundColor: category==="delivery" ? "green" : "" }} onClick={handleDeliveryTime}>Fast delivery</button>
          <button className="btn btn-sm btn-dark mx-1" style={{backgroundColor: category==="veg" ? "green" : "" }} onClick={handleCategory}>Pure veg</button>
          {category && <button className="btn btn-sm btn-dark mx-1" onClick={handleReset}>Reset</button>}
        </div>
      </div>
     
      <div className="container pt-4">
      <Title title={title} />

        <div className="d-flex imgscroll carousel">
          {collection.map((imgData) => (
            <Carousel 
              key={imgData?.imageId}
              img={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360" + imgData?.imageId}
            />
          ))}
        </div>
      </div>
          <div className="container">
      <Title title={title1} />
      <div className="container justify-content-between d-flex mt-4 flex-wrap gap-4">
        {
          errorMessage ?
            <div class="alert alert-danger">
              <strong>Warning!</strong>{errorMessage}
            </div> :
        
        restaurant.length !== 0 ? 
          restaurant.map((card, index) => (
            <Restaurantcard
              key={card?.info?.id}
              {...card?.info}
            />
          ))
         :<div>
            <Shimmer/>
          </div> 

        
          
        }
      </div>
      </div>
    </>
  )
}

export default Cardcontainer;
