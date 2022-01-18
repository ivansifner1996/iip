import 'react-image-crop/dist/ReactCrop.css';
import './Dashboard.css'
import { BrowserRouter as Router ,Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  console.log("dashboard");
    return (
        <div >
            <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/products"} className="nav-link">
                Proizvodi
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Dodaj
              </Link>
            </li>
          </div>
        </nav>
      
        </div>
    )

}
export default Dashboard


