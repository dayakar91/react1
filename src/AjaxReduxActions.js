import { fetch_users_request, fetch_users_success, fetch_users_failed, fetch_post_request, fetch_post_success, fetch_post_failed } from "./AjaxReduxActionTypes";
import axios from "axios";

export const fetchUsers = () => {
    return (dispatch) => {
        dispatch({ type: fetch_users_request });

        axios.get(`https://jsonplaceholder.typicode.com/users`)
            .then((response) => {
                dispatch({ type: fetch_users_success, payload: response.data });//(action,state)
            })
            .catch((error) => {
                dispatch({ type: fetch_users_failed, payload: error.message });
            });
    };
    
};

export const usersPost = (userId) => {
    return (dispatch) => {
        dispatch({ type: fetch_post_request });

        axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
            .then((response) => {
                dispatch({ type: fetch_post_success, payload: response.data });
            })
            .catch((error) => {
                dispatch({ type: fetch_post_failed, payload: "Something went wrong" });
            });
    };
};
