import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'

const Testimonial = () => {
  const [reviews, setReviws] = useState([]);
  useEffect(() => {
    fetch("https://bistro-boss-server-eight-zeta.vercel.app/reviews")
      .then((res) => res.json())
      .then((data) => {
        setReviws(data);
      });
  }, []);
  return (
    <section className="my-20">
      <SectionTitle
        subHeading="---What Our Clients Say---"
        heading={"TESTIMONIALS"}
      ></SectionTitle>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {reviews.map((review) => (
          <SwiperSlide key={review._id}>
            <div className="flex flex-col items-center my-16 mx-24">
              <Rating style={{ maxWidth: 180 }} value={review.rating} readOnly />
              <p className="py-8">{review.details}</p>
              <h3 className="text-2xl text-orange-400">{review.name}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonial;
