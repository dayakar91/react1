import { Outlet,Link } from "react-router-dom";

const Layout = () =>{
    return (
        <>
        <nav>
            <ul>
                <li>
                <Link to="/">Home</Link>
                </li>
                <li>
                <Link to="/blogs">Blogs</Link>
                </li>
                <li>
                <Link to="/contact">Contact</Link>
               </li>
               <li>
                <Link to="/404">404</Link>
               </li>
               <li>
                <Link to="/login">Login</Link>
               </li>
               <li>
                <Link to="/addpos" >POS</Link>
               </li>
               <li>
                <Link to="/fee">Fee</Link>
               </li>
               {/* <li>
                { <Link to="/edit">Edit</Link> }
               </li> */}
               
            </ul>
        </nav>
        <Outlet/>
        </>
    )
}
export default Layout;