import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./dashboard.css"
const Dashboard = () => {
  const navigate = useNavigate()

  return (
    <div>
      <section style={{ backgroundColor: "#eee" }}>
        <div class="container py-5">
          <h4 class="text-center mb-5">
            <strong>Choose any option</strong>
          </h4>

          <div className="row">
            <div className="col-md-4">
              <div className="card" onClick={(e) => navigate("/sheet")}>
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
              <div className="card" onClick={(e) => navigate("/mailsender")}>
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
              <div className="card" onClick={(e) => navigate("/addcontact")}>
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
        </div>
      </section>
    </div>
  )
}

export default Dashboard
