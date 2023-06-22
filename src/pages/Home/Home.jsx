import Banner from "./Banner";
import Category from "./Category";
import Featured from "./Featured";
import POpularMenu from "./POpularMenu";
import Testimonial from "./Testimonial";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Home</title>
      </Helmet>
      <Banner></Banner>
      <Category></Category>
      <POpularMenu></POpularMenu>
      <Featured></Featured>
      <Testimonial></Testimonial>
    </div>
  );
};

export default Home;
