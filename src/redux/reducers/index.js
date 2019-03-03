import {combineReducers} from "redux";
// import {routerReducer as routing} from "react-router-redux";
import auth from "./components/auth"
import registration from "./components/registration"
import user from "./components/user"
import settings from "./components/settings"
import setup from "./components/setup"
import articles from "./components/articles"
import infoArticle from "./components/infoArticle"
import events from "./components/events"
import about from "./components/about"
import warningDialog from "./components/warningDialog"
import articlePublishing from "./components/articlePublishing"
import library from "./components/library"
import feedBack from "./components/feedBack"
import myPublications from "./components/myPublications"
import imagePreview from "./components/imagePreview"
import activities from "./components/activities"
import administration from "./components/administration"
import subjects from "./components/subjects"
import userInfoCard from "./components/userInfoCard"
import infoEvent from  "./components/infoEvent"
import calendarDatePicker from  "./components/calendarDatePicker"

export default combineReducers({
    auth,
    registration,
    user,
    setup,
    about,
    activities,
    articles,
    infoArticle,
    events,
    settings,
    articlePublishing,
    myPublications,
    warningDialog,
    library,
    feedBack,
    imagePreview,
    administration,
    subjects,
    userInfoCard,
    infoEvent,
    calendarDatePicker
});