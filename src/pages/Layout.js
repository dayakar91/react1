import React from "react";
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
               <li>
                <Link to="/AjaxRedux">AjaxRedux</Link>
               </li>
               {/* <li>
                { <Link to="/edit">Edit</Link> }
               </li> */}
			   <li>
			   <Link to='/Tabs'>Compound Tabs</Link>
			   </li>
				<li>
				   <Link to='/Parent'>Parent to Child</Link>

				</li>	
				<li>
				<Link to='/student'>Student</Link>
				</li>
                <li>
                    <Link to='/loginapi'>Login Api</Link>
                </li>
                <li>
                    <Link to='/usememoex'>UseMemo Ex</Link>
                </li>
                <li>
                    <Link to='/usecallbackex'>Usecallback & React.memo & Lazy Loading</Link>
                </li>
            </ul>
        </nav>
        <Outlet/>
        </>
    )
}
export default Layout;