import './App.css';
import { Route, Switch} from "react-router-dom";
import landingPage from './components/LandingPage/LandingPage.js';
import home from './components/Home/Home.js';
import detailRecipe from './components/DetailRecipe/DetailRecipe.js';
import addRecipe from './components/AddRecipe/AddRecipe.js';
import Error404 from './components/Error404/Error404.js';



function App() {
  return (
    
     <div className='App'>

     

      <Switch>
          <Route exact path='/' component={landingPage} />
          <Route exact path='/home'  component={home} />
          <Route exact path='/home/:id' component={detailRecipe} />
          <Route exact path='/recipe' component={addRecipe} />
          <Route path="*" component={Error404} />
      </Switch>
     

        
      </div>
    

  );
};

export default App;
