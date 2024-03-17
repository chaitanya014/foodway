const Carousel = ({img})=>{
    return(
        <div className="Carousel">
            <img src={img}
                alt="restroimg"
                width="150px"
                style={{height:"auto",
                objectFit: "cover"}}/>
                     
        </div>
    )
}

export default Carousel;