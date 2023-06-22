import Layout from "components/Layout";
import Welcome from "pages/Welcome";
import React from 'react'
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route path="/" element={<Welcome/>}/>
      </Route>
    </Routes>
  );
}

export default App;
