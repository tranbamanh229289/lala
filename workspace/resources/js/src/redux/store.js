import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools, devToolsEnhancer } from "redux-devtools-extension";
import projectsReducer from "./reducers/projectsReducer";
import categoriesReducer from "./reducers/categoriesReducer";
import tasksReducer from "./reducers/tasksReducer";
import userReducer from "./reducers/userReducer";
import todosReducer from "./reducers/todosReducer";
import thunk from 'redux-thunk';

const reducer = combineReducers(
    {
        projects: projectsReducer,
        categories: categoriesReducer,
        task: tasksReducer,
        user: userReducer,
        todo: todosReducer,
    }
)
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
export default store;


