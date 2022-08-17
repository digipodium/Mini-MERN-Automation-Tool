import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./dashboard.css"
const Dashboard = () => {

  const navigate = useNavigate();

  return (
    <div>

      <section style={{ backgroundColor: "#eee" }}>
        <div class="container py-5">
          <h4 class="text-center mb-5">
            <strong>Choose any option</strong>
          </h4>

          <div className="row">
            <div className="col-md-4">
              <div className="card" onClick={e => navigate('/sheet')}>
                <img src="upload_icon.png" alt="" />
                <div className="card-body">
                  <h3 className="text-center">Sheet Manager</h3>

                  <div class="hover-overlay">
                  <Link to="/sheet">
                    <div class="mask" style={{ backgroundColor: "rgba(253, 253, 253, 0.15)" }}></div>
                  </Link>
                </div>

                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card" onClick={e => navigate('/mailsender')}>
                <img src="mail_icon.png" alt="" />
                <div className="card-body">
                  <h3 className="text-center">Send Mail</h3>

                  <div class="hover-overlay">
                  <Link to="/mailsender">
                    <div class="mask" style={{ backgroundColor: "rgba(253, 253, 253, 0.15)" }}></div>
                  </Link>
                </div>

                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card" onClick={e => navigate('/addcontact')}>
                <img src="contact_icon.png" alt="" />
                <div className="card-body">
                  <h3 className="text-center">Add Contacts</h3>
              
                  <div class="hover-overlay">
                  <Link to="/addcontact">
                    <div class="mask" style={{ backgroundColor: "rgba(253, 253, 253, 0.15)" }}></div>
                  </Link>
                </div>

                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-4 col-md-12 mb-3">
              <div class="bg-image hover-zoom ripple shadow-1-strong rounded">
                <div class="img-1 card-img"></div>

                <h1>Upload Data</h1>

                <div class="mask" style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}></div>

                <div class="hover-overlay">
                  <Link to="/sheet">
                    <div class="mask" style={{ backgroundColor: "rgba(253, 253, 253, 0.15)" }}></div>
                  </Link>
                </div>
              </div>
            </div>

            <div class="col-lg-4 col-md-6 mb-3">
              <div class="bg-image hover-zoom ripple shadow-1-strong rounded">
                <div class="img-2 card-img"></div>

                <h1> Send Email</h1>

                <div class="mask" style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}>
                  <div class="d-flex justify-content-start align-items-start h-100"></div>
                </div>

                <div class="hover-overlay">
                  <Link to="/mailsender">
                    <div class="mask" style={{ backgroundColor: "rgba(253, 253, 253, 0.15)" }}></div>
                  </Link>
                </div>
              </div>
            </div>

            <div class="col-lg-4 col-md-6 mb-3">
              <div class="bg-image hover-zoom ripple shadow-1-strong rounded">
                <div class="img-3 card-img"></div>

                <h1>Add Contacts</h1>

                <div class="mask" style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}>
                  <div class="d-flex justify-content-start align-items-start h-100"></div>
                </div>
                <div class="hover-overlay">
                  <Link to="/addcontact">
                    <div class="mask" style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}></div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-4 col-md-12 mb-3">
              <div class="bg-image hover-zoom ripple shadow-1-strong rounded ripple-surface">
                <div class="img-4 card-img"></div>

                <h1>Clean Data</h1>
                <a href="#!">
                  <div class="mask" style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}>
                    <div class="d-flex justify-content-start align-items-start h-100"></div>
                  </div>
                  <div class="hover-overlay">
                    <div class="mask" style={{ backgroundColor: "" }}></div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard
