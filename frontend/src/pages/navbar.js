import "../styles.css"
import { Link } from "react-router-dom";

const Header = () => {
    return (

        <header className="header" >
            <div className="flex-container">
                <nav className="nav">
                    <ul className="nav_list">
                        <li className="nav_item">
                            <Link className="nav_link" to="/log">Log</Link>
                        </li>
                        <li className="nav_item">
                            <Link className="nav_link" to="/dashboard">Dashboard</Link>
                        </li>
                        <li className="nav_item">
                            <Link className="nav_link" to="/goal">Goal</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>

    )
}

export default Header;