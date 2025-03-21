import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EditorEditable from './pages/editeur/editorEditable.jsx';
import EditorNonEditable from './pages/editeur/editorNonEditable.jsx';

function App() {

  return (
    <Router>
      <Routes>
        {/* Route for the editable editor */}
        <Route path="/editable" element={<EditorEditable section="Histoire" />} />

        {/* Route for the non-editable editor */}
        <Route path="/non-editable" element={<EditorNonEditable section="Histoire"/>} />

      </Routes>
    </Router>
  );
}

export default App;