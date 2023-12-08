import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import NotFound from './components/NotFound';
import Index from './components/Index';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Index />}/>
        <Route path="/home" element={<Home />} />
        <Route path="/*" element={<NotFound />} /> 
      </Routes>
    </BrowserRouter>
         
    </div>
  );
}

export default App;
