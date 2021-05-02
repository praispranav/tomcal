import React, { Component } from "react";
const Actions = ({ actionN, backgroundC }) => {
  const changeVisibility = (number) => {
    const AllCardsD = document.querySelectorAll(".cardsD");
    const cardsD = AllCardsD[number];
    cardsD.classList.forEach((classname) => {
      classname === "false"
        ? cardsD.classList.remove("false")
        : cardsD.classList.add("false");
      classname === "false"
        ? (cardsD.style.backgroundColor = backgroundC)
        : (cardsD.style.backgroundColor = "#fff");
    });
  };

  return (
    <div className="mb-2 actions">
      <div className=" d-inline-flex drpdwn">
        <div class="btn-group pull-right axn-sel">
          <button type="button" class="btn btn-default btn-xs">
            Action
          </button>
          <button
            type="button"
            class="btn btn-default btn-xs dropdown-toggle"
            data-toggle="dropdown"
          ></button>
          <ul class="dropdown-menu pull-right">
            <li>
              <a className="dropdown-item f-s-13" href="#">
                <i className="fa fa-save"></i> Save
              </a>
            </li>
            <li>
              <a className="dropdown-item f-s-13" href="#">
                <i className="far fa-trash-alt"></i> Delete
              </a>
            </li>
            <li>
              <a className="dropdown-item f-s-13" href="#">
                <i className="fas fa-edit"></i> Edit
              </a>
            </li>
            <li>
              <a className="dropdown-item f-s-13" href="#">
                <i className="fas fa-print"></i> Print
              </a>
            </li>
            <li>
              <a className="dropdown-item f-s-13" href="#">
                <i className="ion-md-card"></i> Add Card
              </a>
            </li>
            <li>
              <a className="dropdown-item f-s-13" href="#">
                <i className="fa fa-comment"></i> Comments
              </a>
            </li>
            <li>
              <a className="dropdown-item f-s-13" href="#">
                <i className="fas fa-archive"></i> Archive
              </a>
            </li>
            <li>
              <a className="dropdown-item f-s-13" href="#">
                <i className="ion-md-share"></i> Share
              </a>
            </li>
            <hr />
            <li>
              <a className="dropdown-item f-s-13" href="#">
                <i class="fas fa-search"></i> Search in List
              </a>
            </li>
          </ul>
        </div>
        {/* <div className="dropdown">
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Action
          </button>
          <ul
            className="dropdown-menu ml-5"
            aria-labelledby="dropdownMenuButton1"
          >
            <li>
              <a className="dropdown-item f-s-13" href="#">
                <i className="fa fa-save"></i> Save
              </a>
            </li>
            <li>
              <a className="dropdown-item f-s-13" href="#">
                <i className="far fa-trash-alt"></i> Delete
              </a>
            </li>
            <li>
              <a className="dropdown-item f-s-13" href="#">
                <i className="fas fa-edit"></i> Edit
              </a>
            </li>
            <li>
              <a className="dropdown-item f-s-13" href="#">
                <i className="fas fa-print"></i> Print
              </a>
            </li>
            <li>
              <a className="dropdown-item f-s-13" href="#">
                <i className="fas fa-card-alt"></i> Add Card
              </a>
            </li>
            <li>
              <a className="dropdown-item f-s-13" href="#">
                <i className="fa fa-comment"></i> Comments
              </a>
            </li>
            <li>
              <a className="dropdown-item f-s-13" href="#">
                <i className="fas fa-archive"></i> Archive
              </a>
            </li>
            <li>
              <a className="dropdown-item f-s-13" href="#">
                <i className="ion-md-share"></i> Share
              </a>
            </li>
            <hr />
            <li>
              <a className="dropdown-item f-s-13" href="#">
                <i class="fas fa-search"></i> Search in List
              </a>
            </li>
          </ul>
        </div> */}
      </div>
      <button className="min" onClick={() => changeVisibility(actionN)}>
        <i className="fa fa-minus"></i>
      </button>
    </div>
  );
};

export default Actions;
