import React from "react";
import { Cart, Heart, PersonCircle } from "react-bootstrap-icons";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-black py-3">
        <div className="container-fluid">
            <a className="navbar-brand d-flex d-block d-lg-none" href="/">
              NodeStaff
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-md-center" id="navbarSupportedContent">
              <a className="navbar-brand d-flex d-none d-lg-flex" href="/">
                NodeStaff
              </a>
              <ul className="navbar-nav mb-2 mb-lg-0 mt-lg-0 mt-4">
                <li className="nav-item d-block mx-auto mx-sm-3">
                  <input className="form-control py-2 fw-bold rounded-1 search" type="search" placeholder="Пошук"/>
                </li>
                <div className="d-flex mt-lg-0 mt-4 justify-content-between ms-3">
                  <li className="nav-item p-0">
                    <a className="nav-link active text-icon p-0 text-center" href="/"><Cart width={22} height={22} className="d-block mx-auto mb-2"/>Кошик</a>
                  </li>
                  <li className="nav-item p-0">
                    <a className="nav-link active text-icon p-0 text-center" href="/"><Heart width={22} height={22} className="d-block mx-auto mb-1 mt-1"/>Обране</a>
                  </li>
                  <li className="nav-item p-0">
                    <a className="nav-link active text-icon p-0 text-center" href="/"><PersonCircle width={22} height={22} className="d-block mx-auto mb-1 mt-1"/>Вхід</a>
                  </li>
                </div>
              </ul>
          </div>
        </div>
      </nav>
      <div style={{backgroundColor: "rgba(0,0,0,0.85)"}} className="container-fluid p-1 d-none d-lg-block">
        <div className="container d-flex justify-content-center align-content-center">
            <div className="d-flex flex-row align-items-center py-1 fw-bold category">
              <Link to={"/"} className={"mx-3 text-light text-decoration-none"}>Новини</Link>
              <Link to={"/"} className={"mx-3 text-light text-decoration-none"}>Хіти продажів</Link>
              <Link to={"/"} className={"mx-3 text-light text-decoration-none"}>Плаття</Link>
              <Link to={"/"} className={"mx-3 text-light text-decoration-none"}>Одяг</Link>
              <Link to={"/"} className={"mx-3 text-light text-decoration-none"}>Штани та спідниці</Link>
              <Link to={"/"} className={"mx-3 text-light text-decoration-none"}>Костюми</Link>
              <Link to={"/"} className={"mx-3 text-light text-decoration-none"}>Блузки та сорочки</Link>
              <Link to={"/"} className={"mx-3 text-light text-decoration-none"}>Plus Size</Link>
              <Link to={"/"} className={"mx-3 text-light text-decoration-none"}>Спортивний одяг</Link>
              <Link to={"/"} className={"mx-3 text-light text-decoration-none"}>Взуття</Link>
            </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Layout;
