import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../config/axios";
import "./index.scss";
import Header from "../../header";
import { Breadcrumb, Flex } from "antd";
import { HomeOutlined } from '@ant-design/icons';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchKoiDetails = async () => {
      try {
        const response = await api.get(`kois/${id}`);
        if (response.status === 200) {
          setProduct(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      }
    };

    fetchKoiDetails();
  }, [id]);

  if (!product) return <div className="loading">Loading...</div>;

  return (
    <div>
       <Header setIsLoggedIn={setIsLoggedIn}/>
      <Breadcrumb 
        style={{ backgroundColor: '#fff', display: Flex, position: 'relative' }}
        items={[
          {
            href: '/',
            title: <HomeOutlined />,
          },
          {
            href: '/shop',
            title: 'Products',
          },
          {
            title: 'Product Details',
          },
        ]}
      />
      <div className="product-details">
        <div className="image-container">
          <img className="main-image" src={product.image} alt={product.name} />
          <div className="thumbnail-container">
            <img className="thumbnail" src={product.image} alt={product.name} />
          </div>
        </div>
        <div className="info-review-container">
          <div className="info-container">
            <h2 className="product-title">{product.name}</h2>
            <p className="product-price">{product.price} VND</p>
            <div className="button-group">
              <button className="btn add-to-cart">Add to Cart</button>
              <button className="btn buy-now">Pay Immediately</button>
            </div>
            <h3>Details</h3>
            <ul className="details-list">                          
              <li>
                <strong>Age:</strong> {product.age} years
              </li>
              <li>
                <strong>Size:</strong> {product.size} cm
              </li>
              <li>
                <strong>Weight:</strong> {product.weight}
              </li>
              <li>
                <strong>Origin:</strong> {product.origin}
              </li>
              <li>
                <strong>Type:</strong> {product.typeFish}
              </li>
              <li>
                <strong>Description:</strong> {product.description}
              </li> 
              <li>
                <strong>Status:</strong> 
                <span 
                  style={{
                    color: product.status === 'OnSale' ? 'red' : 'black',
                    fontWeight: product.status === 'OnSale' ? 'bold' : 'normal'
                  }}
                >
                  {product.status}
                </span>
              </li>
            </ul>
          </div>
          <div className="review-container">
            <h3>Review a {product.name}</h3>
            <textarea
              className="review-input"
              placeholder="Write your review here..."
            />
            <button className="btn submit-review">Submit Review</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
