import { useState } from "react";
import orderCoverImg from "../../../assets/shop/banner2.jpg";
import Cover from "../../shared/Cover/Cover";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useMenu from "../../../Hooks/useMenu";
import FoodCard from "../../../components/FoodCard/FoodCard";
import OrderTab from "./OrderTab";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
const Order = () => {
  const categoties=['salad','pizza','soup','dessert','drink']
  const {category}=useParams();
  const initialIndex=categoties.indexOf(category)
  console.log(category);
  const [tabIndex, setTabIndex] = useState(initialIndex);
  const [menu]=useMenu();
 
  const desserts=menu.filter(item=>item.category ==="dessert")
  const salad=menu.filter(item=>item.category ==="salad")
  const soup=menu.filter(item=>item.category ==="soup")
  const pizza=menu.filter(item=>item.category ==="pizza")
  const drinks=menu.filter(item=>item.category ==="drinks")
  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Order Food</title>
       
      </Helmet>
      <Cover img={orderCoverImg} title="Order Food"></Cover>
      <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList>
          <Tab>salad</Tab>
          <Tab>pizza</Tab>
          <Tab>soup</Tab>
          <Tab>dessert</Tab>
          <Tab>drink</Tab>
        </TabList>
        <TabPanel>
          <OrderTab items={salad}></OrderTab>
        </TabPanel>
        <TabPanel>
        <OrderTab items={soup}></OrderTab>
        </TabPanel>
        <TabPanel>
        <OrderTab items={pizza}></OrderTab>
        </TabPanel>
        <TabPanel>
        <OrderTab items={drinks}></OrderTab>
        </TabPanel>
        <TabPanel>
        <OrderTab items={desserts}></OrderTab>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Order;
