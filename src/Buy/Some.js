import React from "react";
import "../App.css";
import { SomeData } from "./SomeData";
import { SomeDatax } from "./SomeDatax";

    

 function Some() {
  return (
    <div className="Buya">
      <div className="Buyb">
        {SomeData.map((val, key) => {
          return (
            <div 
                key={key}
                className="raw"
                id={window.location.pathname === val.link ? "active" : ""}
                onClick={() => {window.location.pathname = val.link}}
            >
                {" "}
              <div className="iconx" id="icon">{val.icon}</div>{" "}
            </div>
          );
        })}
      </div>
      <div className="Buyb">
        {SomeData.map((val, key) => {
          return (
            <div 
                key={key}
                className="rawb"
                id={window.location.pathname === val.link ? "activex" : ""}
                onClick={() => {window.location.pathname = val.link}}
            >
                {" "}
              <div className="titlex" id="title">{val.title}</div>{" "}
            </div>
          );
        })}
      </div>
      <div className="Buyc">
      {SomeDatax.map((val, key) => {
          return (
            <div 
                key={key}
                className="rew"
                id={window.location.pathname === val.link ? "active" : ""}
                onClick={() => {window.location.pathname = val.link}}
            >
                {" "}
              <div className="icond" id="icon">{val.icon}</div>{" "}
            </div>
          );
        })}
      </div>
      <div className="Buyc">
      {SomeDatax.map((val, key) => {
          return (
            <div 
                key={key}
                className="rewb"
                id={window.location.pathname === val.link ? "actived" : ""}
                onClick={() => {window.location.pathname = val.link}}
            >
                {" "}
              <div className="titled"id="title">{val.title}</div>{" "}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Some;
