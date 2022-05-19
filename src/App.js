import { useEffect, useState, React } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Main, Battle } from "./views";
import UserContext from "./data/userContext";

function App() {
  const [accounts, setAccounts] = useState([]);
  const value = { accounts, setAccounts };

  return (
    <UserContext.Provider value={value}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/battle" element={<Battle />}></Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
