import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EditorEditable from './pages/editeur/editorEditable.jsx';
import EditorNonEditable from './pages/editeur/editorNonEditable.jsx';
import Visualisation from './pages/visualisation/visualisation.jsx';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/editable" element={<EditorEditable  />} />
        <Route path="/non-editable" element={<EditorNonEditable />} />
        <Route path="/visualisation" element={<Visualisation />} />

      </Routes>
    </Router>
  );
}

export default App;