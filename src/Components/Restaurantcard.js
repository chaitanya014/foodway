import { Link } from "react-router-dom";
import { IMG_URL } from "../utils/config";

const Restaurantcard = ({cloudinaryImageId,name,avgRating,sla,cuisines,areaName, id}) =>{
  

  return(
      <Link to={`/menu/${id}`} className="custom-card"style={{color: "black"}}>
        <div>
          <img src={IMG_URL+cloudinaryImageId}
          alt="resimage" 
          width="100%"
          style={{height: "205px",
          objectFit: "cover"}}/>
        </div>
        <div className="desc">
        <p><b>{name}</b></p>
        <div className="d-flex justify-content-between mt-4 ">
          <p>⭐{avgRating}/10</p>
          <p className="part-desc">{sla?.deliveryTime}min</p>
        </div>
        <p className="cuisines">{cuisines.join(", ")}</p>
        <p><b>{areaName}</b></p>
        </div>
        </Link>
  
  );

}
export default Restaurantcard;