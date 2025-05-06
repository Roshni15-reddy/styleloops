import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const HomePage = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  };

  const sliderImages = [
    "/images/banner1.png",
    "/images/banner2.png",
    "/images/banner3.png"
  ];

  const productImages = [
    "/images/product1.png",
    "/images/product2.png",
    "/images/product3.png",
    "/images/product4.png",
    "/images/product5.png",
    "/images/product6.png",
    "/images/product7.png",
    "/images/product8.png",
    "/images/product9.png",
    "/images/product10.png",
    "/images/product11.png"
  ];

  return (
    <div>
      {/* Image Slider */}
      <Slider {...sliderSettings}>
        {sliderImages.map((img, index) => (
          <div key={index}>
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              style={{ width: '100%', height: '60vh', objectFit: 'cover' }}
            />
          </div>
        ))}
      </Slider>

     {/* Product Grid */}
<h2 style={{ textAlign: 'center', margin: '20px 0' }}>Featured Products</h2>
<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)', // Now 4 images in a row
  gap: '20px',
  padding: '0 40px 40px'
}}>
  {productImages.map((img, index) => (
    <div key={index} style={{ textAlign: 'center' }}>
      <img
        src={img}
        alt={`Product ${index + 1}`}
        style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '8px' }}
      />
    </div>
  ))}
</div>

{/* Footer */}
<footer style={{
  backgroundColor: '#000',
  color: '#fff',
  textAlign: 'center',
  padding: '20px 10px',
  marginTop: '40px',
  lineHeight: '1.6'
}}>
  <p style={{ margin: 0, fontSize: '1rem' }}>© {new Date().getFullYear()} Style Loops. All rights reserved.</p>
  <p style={{ margin: '5px 0', fontSize: '0.95rem' }}>
    📞 Phone: <span style={{ color: '#fff' }}>1234567891</span>
  </p>
  <p style={{ margin: '5px 0', fontSize: '0.95rem' }}>
    📧 Email: <a href="mailto:styleloops@gmail.com" style={{ color: '#fff', textDecoration: 'underline' }}>styleloops@gmail.com</a>
  </p>
  <p style={{ margin: '5px 0', fontSize: '0.95rem' }}>
    📍 Address: <span style={{ color: '#fff' }}>Huzurabad, Karimnagar</span>
  </p>
</footer>

    </div>
  );
};

export default HomePage;
