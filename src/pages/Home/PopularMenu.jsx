
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import MenuItem from "../shared/MenuItem/MenuItem";
import useMenu from "../../Hooks/useMenu";


const POpularMenu = () => {
    const[menu]=useMenu ();
    const popular=menu.filter(item=>item.category ==="popular")
    // const [menu,SetMenu]=useState([])
    // useEffect(()=>{
    //     fetch('menu.json')
    //     .then(res=>res.json())
    //     .then(data=>{
    //         const popularItem=data.filter(item=>item.category === 'popular')
            
    //         SetMenu(popularItem) })
    // },[])
    return (
        <section className="mb-12"> 
        
            <SectionTitle
            heading= 'From Our Menu'
            subHeading='Popular Item'
            
            ></SectionTitle>
            <div className="grid md:grid-cols-2 gap-10">
                {popular.map(item=><MenuItem
                key={item._id} item={item}></MenuItem>)}
            </div>
            <button className="btn btn-outline border-0 border-b-4 mt-4">View Full Menu</button>
        </section>
    );
};

export default POpularMenu;