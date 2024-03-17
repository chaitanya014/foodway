import App from "../App";
import About from "./About";
import Contact from "./Contact";
import Body from "./Body";
import {createBrowserRouter} from "react-router-dom";
import CustomError from "./CustomError";
import Menu from "./Menu";

const approuter = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement : <CustomError/>,
        children: [
            {
                path : "",
                element : <Body/>,
            },
            {
            path : "about",
            element : <About/>,
            // errorElement : <CustomError/>
            },
            {
             path : "contact",
             element : <Contact/>,
            //  errorElement : <CustomError/>
            },
            {
              path: "menu/:resId",
              element : <Menu/>

            }
        ]
    }
    
])

export default approuter;