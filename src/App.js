import React, { useState } from "react";
import "./App.css";
import FetchCustomersData from "./components/FetchCustomersData";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import FetchTrainingsData from "./components/FetchTrainingsData";
import CalendarActivity from "./components/CalendarActivity";
import ListAlt from '@material-ui/icons/ListAlt';

function App() {
  const [value, setValue] = useState("one");

  const handleChange = (event, value) => {
    setValue(value);
  };

  return (
    <div>
      <AppBar position="static" color="secondary">
        <Tabs value={value} onChange={handleChange} indicatorColor="secondary"
          style={{ color: 'white' }}
          className="w-full h-64" TabIndicatorProps={{
            style: { background: "orange", height: "5px", top: "40px" }
          }}>
          <ListAlt />
          <Tab textColor="primary" value="one" label="Customer List" />
          <Tab textColor="secondary" value="two" label="Trainings" />
          <Tab textColor="secondary" value="three" label="Calendar Activity" />
        </Tabs>
      </AppBar>
      <div className="ReactTable">
        {value === "one" && (<div><FetchCustomersData /></div>)}
      </div>
      {value === "two" && (<div> <FetchTrainingsData /></div>)}
      {value === "three" && (<div><CalendarActivity /></div>)}
    </div>
  );
}
export default App;
