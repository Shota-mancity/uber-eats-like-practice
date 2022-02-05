import React from "react";
// import "App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// components
import { Restaurants } from "./containers/Restaurants";
import { Foods } from "./containers/Foods";
import { Orders } from "./containers/Orders";

function App() {
  return (
    <Router>
      {/* ルーティング先のコンポーネントを<Routes>...</Routes>で囲む */}
      <Routes>
        {/* 店舗一覧ページ */}
        <Route path="/restaurants" element={<Restaurants />} />
        {/* localhost:3001/restaurantsでRestaurantsコンポーネントをレンダリング */}
        {/* フード一覧ページ */}
        <Route path="/restaurants/:restaurantId/foods" element={<Foods />} />
        {/* パラメーターとして設定したい部分は:paramsNameと:を付ける */}
        {/* Foodsコンポーネントにmatchというpropsを渡しながら(v5)、設定したPATHに対応するリクエストがあった場合にパラメーターと一緒にコンポーネントをレンダリング */}
        {/* React Router v6の場合は、restaurantIdをそのままpropsで渡す */}
        {/* 注文ページ */}
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </Router>
  );
}

export default App;
