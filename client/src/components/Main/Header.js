import { Link } from "react-router-dom";

import styles from "./styles.module.css";

const Header = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>Cricket App</h1>
				<div>
                    {/* <Link to="/" style={{marginRight:'30px' ,color:'white',textDecoration:'none'}}>Manage Users</Link>
					<Link to="/teams" style={{marginRight:'30px' ,color:'white',textDecoration:'none'}} >Manage Teams</Link> */}
					<Link to="/" style={{marginRight:'30px' ,color:'white',textDecoration:'none'}} >Manage Match</Link>
					<button className={styles.white_btn} onClick={handleLogout}>
						Logout
					</button>
				</div>
				
			</nav>
			
		</div>
	);
};

export default Header;
