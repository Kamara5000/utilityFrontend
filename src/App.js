import {BrowserRouter, Route, Switch} from "react-router-dom";
import Allcontact from './components/contact/allcontact';
import Home from "./components/home";
import Note from "./components/notes/note";
import Notexist from "./components/notexist";
import Reg from "./components/registerlogin/register"
import Log from "./components/registerlogin/signIn";
import Todo from "./components/todo/todo";
import Welcome from "./components/welcome";

const App=()=> {
  return (
    <div>
      <div>     
        <BrowserRouter>
        <Switch>
        <Route exact path="/" component={Welcome}/>
        <Route path="/contact/:username" component={Allcontact}/>
        <Route path="/notes/:username" component={Note}/>
        <Route path="/todo/:username" component={Todo}/>
        <Route path="/signup" component={Reg} />
        <Route path="/login" component={Log} />
        <Route path="/home" component={Home}/>
        <Route  component={Notexist}/>
        </Switch>
        </BrowserRouter>
       </div>
    </div>
  );
}

export default App;
