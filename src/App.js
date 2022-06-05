import './App.css';
import Navbar from './components/Navbar'
import Home from './components/Home'
import Create from './components/Create'
import Edit from './components/Edit'
import BlogDetail from './components/BlogDetail'
import NotFound from './components/NotFound';
import BlogTable from './components/BlogTable';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <div className="content">
          <Switch>
            <Route exact path="/" >
              <Home />
            </Route>
            <Route path="/create" >
              <Create />
            </Route>
            <Route path="/edit/:id" >
              <Edit />
            </Route>
            <Route path="/blogs/:id" >
              <BlogDetail />
            </Route>
            <Route path="/table">
              <BlogTable />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
