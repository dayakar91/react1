import { fetch_users_request, fetch_users_success, fetch_users_failed, fetch_post_request, fetch_post_success, fetch_post_failed } from "./AjaxReduxActionTypes";

const initialState = {
    users: {
        loading: false,
        options: [],
        errors: "",
    },
    posts: {
        loading: false,
        options: [],
        errors: ""
    }
};


const dropdownReducer = (state = initialState, action) => {
    switch (action.type) {
        case fetch_users_request:
            return { ...state, users: { ...state.users, loading: true } };
            // { ...state }: Copies the entire state.
            // { ...state.users }: Copies the current state of the users object.
            // loading: true: Updates the loading property to true to indicate a request is in progress.
            // The rest of the state, like posts or options, is left unchanged.    
        case fetch_users_success:
            return { ...state, users: { loading: false, options: action.payload, errors: "" } };
            // { ...state }: Copies the entire state.
            // users: { loading: false, options: action.payload, errors: "" }: Updates the users object:
            // Sets loading to false (since the request is done).
            // Stores the fetched data in options.
            // Clears any previous errors.

        case fetch_users_failed:
            return { ...state, users: { loading: false, options: [], errors: action.payload } };

        case fetch_post_request:
            return { ...state, posts: { ...state.posts, loading: true } };
        case fetch_post_success:
            return { ...state, posts: { loading: false, options: action.payload, errors: "" } };
        case fetch_post_failed:
            return { ...state, posts: { loading: false, options: [], errors: action.payload } };

        default:
            return state;
    }
};

export default dropdownReducer;
