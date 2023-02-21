import React, {useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleProduct } from "../actions";

const FeaturedMainPage = ({id}) => {
    const dispatch = useDispatch();
    const singleProduct = useSelector(state => state.fetchSingleProduct.singleProduct);
    const isLoading = useSelector(state => state.fetchSingleProduct.isLoading);
    const error = useSelector(state => state.fetchSingleProduct.error);
    console.log(singleProduct);
  
    useEffect(()=>{
        if (id) dispatch(fetchSingleProduct(id))
    },[dispatch, id]);
    
    if (isLoading) {
        return <div>Loading...</div>;
      } else
  return (
    <section id="sofa-collection">
    <div className="owl-carousel owl-theme" id="collection-carousel" style={{display: 'block'}}>
      <div className="sofa-collection collectionbg1" 
          style={{
            backgroundImage: `url(${singleProduct.background_image})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover'
            }}>
        <div className="container">
          <div className="sofa-collection-txt">
            <h2>{singleProduct.name}</h2>
            <p>
                {singleProduct.description_raw?.length > 300 ? `${singleProduct.description_raw?.substring(0,300).trim()}...` : singleProduct.description_raw}
            </p>
            <button
              className="btn-cart welcome-add-cart sofa-collection-btn"
              // onClick="window.location.href='#'"
            >
              view more
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default FeaturedMainPage