/* global gapi */
/* global google */

import React, { useEffect, useState } from "react"
import "./dashboard.css"

const Dashboard = () => {

  const CLIENT_ID = '436370605107-a1a87949khjquees4o8m7cjeq3mpiu8b.apps.googleusercontent.com';
  const API_KEY = 'AIzaSyAzn3wRxPV_2kiXaRFkE480vDCEoiq1Nak';
  const contact = { 
    "phoneNumbers": [
      { "value": "87354657"},
    ] 
  };

  // Discovery doc URL for APIs used by the quickstart
  const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/people/v1/rest';

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  const SCOPES = 'https://www.googleapis.com/auth/contacts';
  const [gapiInited, setgapiInited] = useState(false);
  const [tokenClient, setTokenClient] = useState("");
  const [gisInited, setGisInited] = useState(false);

  function gapiLoaded() {
    gapi.load('client', intializeGapiClient);
  }

  async function intializeGapiClient() {
    await gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    });
    // gapiInited = true;
    setgapiInited(true);
    maybeEnableButtons();
  }

  function gisLoaded() {
    let token = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: '', // defined later
    });
    setTokenClient(token);
    // gisInited = true; 
    setGisInited(true);
    // maybeEnableButtons();
  }

  function maybeEnableButtons() {
    if (gapiInited && gisInited) {
      document.getElementById('authorize_button').style.visibility = 'visible';
    }
  }

  function handleAuthClick() {
    tokenClient.callback = async (resp) => {
      if (resp.error !== undefined) {
        throw (resp);
      }
      // document.getElementById('signout_button').style.visibility = 'visible';
      // document.getElementById('authorize_button').innerText = 'Refresh';
      await listConnectionNames();
    };

    if (gapi.client.getToken() === null) {
      // Prompt the user to select a Google Account and ask for consent to share their data
      // when establishing a new session.
      tokenClient.requestAccessToken({prompt: 'consent'});
    } else {
      // Skip display of account chooser and consent dialog for an existing session.
      tokenClient.requestAccessToken({prompt: ''});
    }
  }

  function handleSignoutClick() {
    const token = gapi.client.getToken();
    if (token !== null) {
      google.accounts.oauth2.revoke(token.access_token);
      gapi.client.setToken('');
      document.getElementById('content').innerText = '';
      document.getElementById('authorize_button').innerText = 'Authorize';
      document.getElementById('signout_button').style.visibility = 'hidden';
    }
  }

  async function listConnectionNames() {
    let response;
    try {
      // Fetch first 10 files
      response = await gapi.client.people.people.connections.list({
        'resourceName': 'people/me',
        'pageSize': 10,
        'personFields': 'names,emailAddresses,phoneNumbers',
      });
    } catch (err) {
      console.log(err);
      // document.getElementById('content').innerText = err.message;
      return;
    }
    const connections = response.result.connections;
    console.log(connections);
    if (!connections || connections.length === 0) {
      document.getElementById('content').innerText = 'No connections found.';
      return;
    }
    // Flatten to string to display
    const output = connections.reduce(
        (str, person) => {
          if (!person.names || person.names.length === 0) {
            return `${str}Missing display name\n`;
          }
          return `${str}${person.names[0].displayName}\n`;
        },
        'Connections:\n');
        console.log(output);
    // document.getElementById('content').innerText = output;
  }

  useEffect(() => {
    gapiLoaded();
    gisLoaded();
  }, [])

  const createContact = () => {
    console.log(contact);
    gapi.client.people.people.createContact({
      resource: contact
    }).then(function(response) {
      console.log(response);
    }).catch(function(err) {
      console.log(err);
    });
  }
  
  const batchCreateContacts = () => {
    
  }

  return (
    <div>
      <button className="btn btn-primary" onClick={handleAuthClick}>Signin</button>
      <button className="btn btn-danger" onClick={createContact}>Add Contact</button>
      <button className="btn btn-danger" onClick={listConnectionNames}>List Contacts</button>
      <section>
        <h1>LoggedIn User</h1>
        <p>
          <h6>Email</h6>
        </p>
        <p>
          <h6>User Id</h6>
        </p>
      </section>

      <section style={{ backgroundColor: "#eee" }}>
        <div class="container py-5">
          <h4 class="text-center mb-5">
            <strong>Choose any option</strong>
          </h4>

          <div class="row">
            <div class="col-lg-4 col-md-12 mb-3">
              <div class="bg-image hover-zoom ripple shadow-1-strong rounded">
                <div class="img-1 card-img"></div>

                <h1>Upload Data</h1>
                <a href="#!">
                  <div class="mask" style={{ backgroundColor: "" }}></div>
                  <div class="hover-overlay">
                    <div class="mask" style={{ backgroundColor: "rgba(253, 253, 253, 0.15)" }}></div>
                  </div>
                </a>
              </div>
            </div>

            <div class="col-lg-4 col-md-6 mb-3">
              <div class="bg-image hover-zoom ripple shadow-1-strong rounded">
                <div class="img-2 card-img"></div>

                <h1> Send Email</h1>
                <a href="#!">
                  <div class="mask" style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}>
                    <div class="d-flex justify-content-start align-items-start h-100"></div>
                  </div>
                  <div class="hover-overlay">
                    <div class="mask" style={{ backgroundColor: "rgba(253, 253, 253, 0.15)" }}></div>
                  </div>
                </a>
              </div>
            </div>

            <div class="col-lg-4 col-md-6 mb-3">
              <div class="bg-image hover-zoom ripple shadow-1-strong rounded">
                <div class="img-3 card-img"></div>

                <h1>Add Contacts</h1>
                <a href="#!">
                  <div class="mask" style={{ backgroundColor: "" }}>
                    <div class="d-flex justify-content-start align-items-start h-100"></div>
                  </div>
                  <div class="hover-overlay">
                    <div class="mask" style={{ backgroundColor: "" }}></div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-4 col-md-12 mb-3">
              <div class="bg-image hover-zoom ripple shadow-1-strong rounded ripple-surface">
                <div class="img-4 card-img"></div>

                <h1>Clean Data</h1>
                <a href="#!">
                  <div class="mask" style={{ backgroundColor: "" }}>
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
