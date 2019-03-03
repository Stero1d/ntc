/*react - redux*/
import React from 'react';
import {Route, Switch, BrowserRouter} from "react-router-dom";
/*custom components*/
import MainPageRoot from "./panels/mainRoot/MainRoot"
import AboutPage from "./panels/about/About"
import LibraryPage from "./panels/library/Library"
import ActivitiesPage from "./panels/activities/Activities"
import Setup from "./panels/setup/Setup"
import InfoArticlePage from "./panels/infoArticle/InfoArticle"
import ArticlePublishing from "./panels/articlePublishing/ArticlePublishing"
import MyPublications from "./panels/myPublications/MyPublications"
import Administration from "./panels/administration/Administration"

const WorkSpaceRouting = () =>
    (
        <Switch>
            <Route exact path="/" component={MainPageRoot}/>
            <Route exact path="/library" component={LibraryPage}/>
            <Route path="/about" component={AboutPage}/>
            <Route path="/activities" component={ActivitiesPage}/>
            <Route path="/setup" component={Setup}/>
            <Route path="/article_publishing" component={ArticlePublishing}/>
            <Route path="/my_publications" component={MyPublications}/>
            <Route path="/administration" component={Administration}/>
            <Route exact path="/library/:id/"
                   render={(history) => <InfoArticlePage id={history.match.params.id}/>}/>
        </Switch>

    );

export default WorkSpaceRouting;