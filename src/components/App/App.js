import React from "react";
import "./app.css";
import Pages from "../Pages";
import { BrowserRouter } from "react-router-dom";
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";

function App() {
  dayjs.extend(updateLocale);
  dayjs.updateLocale("en", {
    weekdays: [
      "Воскресенье",
      "Понедельник",
      "Вторник",
      "Среда",
      "Четверг",
      "Пятница",
      "Суббота",
    ],
  });

  return (
    <div className="app">
      <BrowserRouter>
        <Pages />
      </BrowserRouter>
    </div>
  );
}

export default App;
