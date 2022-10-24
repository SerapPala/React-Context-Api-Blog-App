import "./Navbar.css";
import { useTheme } from "../hooks/useTheme";
import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";


export default function Navbar() {


  const { bgColor,changeColor } = useTheme()

  return (
    <div className="navbar" style={{backgroundColor:bgColor}} onClick={()=>changeColor('#c44569')}> 
      <nav>
        <Link to="/" className="brand">
          <h1>Blog</h1>
        </Link>
        <Searchbar/>
        <Link to="/create">Yeni Yazı</Link>
      </nav>
    </div>
  );
}
