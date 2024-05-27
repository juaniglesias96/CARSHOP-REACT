import Index from './pages_temp/Index';
import Form from './pages_temp/Form';
import Formtwo from './pages_temp/Formtwo';
import Pago from './pages_temp/Pago';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return(
    <Router>
    <Routes>
      <Route path="/tienda" element={<Index/>} />
      <Route path="/" element={<Form/>} />
      <Route path="/formulariodos" element={<Formtwo/>} />
      <Route path="/pago" element={<Pago/>} />
    </Routes>
  </Router>

  );
  
}

export default App;
