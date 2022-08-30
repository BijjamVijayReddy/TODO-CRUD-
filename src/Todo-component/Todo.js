/**
 * ToDO List by using Function Component,
 * Author:Vijay.
 */

import React, { useState, useEffect } from "react";
import "./Todo.css";

const ToDolist = () => {
  const initialValue = {
    firstname: "",
    country: "",
    number: "",
    role: "",
  };
  const [Inputvalues, setInputvalues] = useState(initialValue);
  const [store, setstore] = useState([]);
  const [InputErrors, setInputErrors] = useState({});
  const [isSubmit, setisSubmit] = useState(false);
 const [search ,SetSearch] = useState("");

  const changeHandler = (e) => {
    setInputvalues({ ...Inputvalues, [e.target.name]: e.target.value });
    // console.log(setInputvalues)
  };
  
  const submitHandler = (e) => {
    e.preventDefault();
    setInputErrors(Validate(Inputvalues));
    setisSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(InputErrors).length === 0 && isSubmit) {
      const newstore = [...store, Inputvalues];
      setstore(newstore);
    }
  }, [InputErrors]);

  // Delete Button function
  const deleteHandler = (IndexValue) => {
    const FilteredTodo = store.filter((elem, index) => index !== IndexValue);
    setstore(FilteredTodo);
  };

  // Edit Button function
  const editHandler = (editIndexValue) => {
    const FilteredTodo = store.filter(
      (elem, index) => index !== editIndexValue
    );
    setstore(FilteredTodo);
    const editSelector = store.find((elem, index) => index === editIndexValue);
    setInputvalues({
      firstname: editSelector.firstname,
      country: editSelector.country,
      number: editSelector.number,
      role: editSelector.role,
    });
  };

  const Validate = (values) => {
    const error = {};
    const OnlyNum = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    const OnlyStrings = /^[a-zA-Z ]*$/;
    if (!values.firstname) {
      error.firstname = "ENTER YOUR NAME!";
    } else if (!values.firstname.match(OnlyStrings)) {
      error.firstname = "Please enter only Alphabets";
    }
    if (!values.country) {
      error.country = "Please enter your Country!";
    } 
    if (!values.number) {
      error.number = "ENTER MOBILE NUMBER FOR LATEST UPDATES!";
    } else if (!values.number.match(OnlyNum)) {
      error.number = "Please enter numbers only";
    }
    if (!values.role) {
      error.role = "CHOOSE YOUR ROLE!";
    }
    return error;
  };

  return (
    <div>
      <h5>NIA CRICKET ACADEMY</h5>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="ENTER FULL NAME"
          name="firstname"
          value={Inputvalues.firstname}
          onChange={changeHandler}
        />
        <small>{InputErrors.firstname}</small>
        <input
          type="text"
          placeholder="COUNTRY"
          name="country"
          value={Inputvalues.country}
          onChange={changeHandler}
        />
        <small>{InputErrors.country}</small>
        <input
          type="text"
          maxLength={10}
          placeholder="Enter A Valid Mobile Number"
          name="number"
          value={Inputvalues.number}
          onChange={changeHandler}
        />
        <small>{InputErrors.number}</small>
        <select name="role" onChange={changeHandler} value={Inputvalues.role}>
          <option value="" disabled selected hidden>
            CHOOSE YOUR ROLE
          </option>
          <option>BATSMAN</option>
          <option>BOWLER</option>
          <option>ALL-ROUNDER</option>
          <option>WICKET-KEPPER</option>
        </select>
        <small>{InputErrors.role}</small> <br />
        <button>SAVE</button>
      </form>
      {/* FILTER BUTTONS */}
      <div style={{display:"flex",justifyContent:"space-evenly"}}>
       <button onClick={(e)=>{SetSearch(e.target.value)}}  value="Batsman" className="Role">BATSMAN </button>
       <button onClick={(e)=>{SetSearch(e.target.value)}}  value="BOWLER"  className="Role">BOWLER </button>
       <button onClick={(e)=>{SetSearch(e.target.value)}}  value="ALL-ROUNDER"  className="Role">ALL-ROUNDER </button>
       <button onClick={(e)=>{SetSearch(e.target.value)}}  value="WICKET-KEPPER"  className="Role">WICKET KEPPER</button>
       <button onClick={(e)=>{SetSearch(e.target.value)}}    className="Role">All Players </button>
       </div>
      {/* Table if user-enter data table will show */}
      {Object.keys(store).length > 0 ? (
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>S.NO</th>
              <th>Name</th>
              <th>country</th>
              <th>MOBILE NUMBER</th>
              <th>ROLE</th>

              <th> Edit / Delete</th>
            </tr>
          </thead>
          <tbody>
            {store.filter((val)=>{
              if(search === ""){
                return val
              } else if (val.role.toLowerCase().includes(search.toLowerCase())){
                return val
              }
            }).map((todo, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{todo.firstname}</td>
                  <td>{todo.country}</td>
                  <td>{todo.number}</td>
                  <td>{todo.role}</td>

                  <td>
                    <button
                      onClick={() => editHandler(index)}
                      className="EditButton"
                    >
                      EDIT
                    </button>
                    <button
                      onClick={() => deleteHandler(index)}
                      className="DeleteButton"
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : null}
    </div>
  );
};

export default ToDolist;
