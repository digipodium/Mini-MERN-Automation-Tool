/* global gapi */
/* global google */

import React, { useEffect, useState } from "react";
import {Swal} from 'sweetalert2';

const AddContact = () => {
  const CLIENT_ID = "436370605107-a1a87949khjquees4o8m7cjeq3mpiu8b.apps.googleusercontent.com"
  const API_KEY = "AIzaSyAzn3wRxPV_2kiXaRFkE480vDCEoiq1Nak"
  const url = "http://localhost:5000"

  const [contactsToAdd, setContactsToAdd] = useState([]);
  const [fieldsToAdd, setFieldsToAdd] = useState({});

  const contact = {
    phoneNumbers: [{ value: "87354657" }],
  }

  const [contactData, setContactData] = useState([])
  const [selContact, setSelContact] = useState(null)

  // Discovery doc URL for APIs used by the quickstart
  const DISCOVERY_DOC = "https://www.googleapis.com/discovery/v1/apis/people/v1/rest"

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  const SCOPES = "https://www.googleapis.com/auth/contacts"
  const [gapiInited, setgapiInited] = useState(false)
  const [tokenClient, setTokenClient] = useState("")
  const [gisInited, setGisInited] = useState(false)

  function gapiLoaded() {
    gapi.load("client", intializeGapiClient)
  }

  async function intializeGapiClient() {
    await gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    })
    // gapiInited = true;
    setgapiInited(true)
    maybeEnableButtons()
  }

  function gisLoaded() {
    let token = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: "", // defined later
    })
    setTokenClient(token)
    // gisInited = true;
    setGisInited(true)
    // maybeEnableButtons();
  }

  function maybeEnableButtons() {
    if (gapiInited && gisInited) {
      document.getElementById("authorize_button").style.visibility = "visible"
    }
  }

  function handleAuthClick() {
    tokenClient.callback = async (resp) => {
      if (resp.error !== undefined) {
        throw resp
      }
      // document.getElementById('signout_button').style.visibility = 'visible';
      // document.getElementById('authorize_button').innerText = 'Refresh';
      await listConnectionNames()
    }

    if (gapi.client.getToken() === null) {
      // Prompt the user to select a Google Account and ask for consent to share their data
      // when establishing a new session.
      tokenClient.requestAccessToken({ prompt: "consent" })
    } else {
      // Skip display of account chooser and consent dialog for an existing session.
      tokenClient.requestAccessToken({ prompt: "" })
    }
  }

  function handleSignoutClick() {
    const token = gapi.client.getToken()
    if (token !== null) {
      google.accounts.oauth2.revoke(token.access_token)
      gapi.client.setToken("")
      document.getElementById("content").innerText = ""
      document.getElementById("authorize_button").innerText = "Authorize"
      document.getElementById("signout_button").style.visibility = "hidden"
    }
  }

  async function listConnectionNames() {
    let response
    try {
      // Fetch first 10 files
      response = await gapi.client.people.people.connections.list({
        resourceName: "people/me",
        pageSize: 10,
        personFields: "names,emailAddresses,phoneNumbers",
      })
    } catch (err) {
      console.log(err)
      // document.getElementById('content').innerText = err.message;
      return
    }
    const connections = response.result.connections
    console.log(connections)
    // if (!connections || connections.length === 0) {
    //   document.getElementById("content").innerText = "No connections found."
    //   return
    // }
    // Flatten to string to display
    const output = connections.reduce((str, person) => {
      if (!person.names || person.names.length === 0) {
        return `${str}Missing display name\n`
      }
      return `${str}${person.names[0].displayName}\n`
    }, "Connections:\n")
    console.log(output)
    // document.getElementById('content').innerText = output;
  }

  const getContactsFromBackend = () => {
    fetch(url + "/contact/getall")
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setContactData(data)
      })
  }

  useEffect(() => {
    gapiLoaded()
    gisLoaded()
    getContactsFromBackend()
  }, [])

  const createContact = () => {
    console.log(contact)
    gapi.client.people.people
      .createContact({
        resource: contact,
      })
      .then(function (response) {
        console.log(response)
      })
      .catch(function (err) {
        console.log(err)
      })
  }

  const batchCreateContacts = () => {
    let tempContacts = [];
    for(let i=0;i<selContact.data[Object.keys(selContact.data)[0]].length;i++){
      tempContacts.push({
        contactPerson: {
          names: [
            {
              givenName: selContact.data[fieldsToAdd.Name][i],
              familyName: "",
            },
          ],
          phoneNumbers: [{ value: ""+selContact.data[fieldsToAdd.Number][i] }],
        },
      })
    }
    console.log(tempContacts);
    gapi.client.people.people
      .batchCreateContacts({
        contacts: tempContacts,
      })
      .then(function (response) {
        console.log(response)
        Swal.fire({
          icon : 'success',
          title : 'Contacts Added',
          text : 'Contacts have been to your Google Account'
        })
      })
      .catch(function (err) {
        console.log(err)
      })
  }

  const showData = () => {
    return (
      <table className="table align-middle mb-0 bg-white">
        <thead className="bg-light">
          <tr>
            <td>Title</td>
            <td>Created On</td>
          </tr>
        </thead>
        <tbody>
          {contactData.map((contact) => (
            <tr>
              <td>{contact.title}</td>
              <td>{contact.createdAt}</td>
              <td>
                <button className="btn btn-primary" onClick={(e) => setSelContact(contact)}>
                  Use This
                </button>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={(e) => {
                    fetch(url + "/contact/delete/" + contact._id, { method: "DELETE" }).then((res) => {
                      console.log(res.status)
                      getContactsFromBackend()
                    })
                  }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  const updateContactField = (field, sheetField) => {
    let tempFields = fieldsToAdd;
    tempFields[field] = sheetField; 
    setFieldsToAdd(tempFields);
    console.log(fieldsToAdd);

    

  }

  const contactField = () => {
    if (selContact) {
      return (
        <div className="card">
          <div className="card-header">
            <h4 className="m-0">Select the Correct Fields Form your sheet</h4>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <h3>Name</h3>
                <select className="form-control" onChange={e => updateContactField('Name',e.target.value)}>
                  {Object.keys(selContact.data).map((key) => (
                    <option value={key}>{key}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <h3>Phone No.</h3>
                <select className="form-control" onChange={e => updateContactField('Number',e.target.value)}>
                  {Object.keys(selContact.data).map((key) => (
                    <option>{key}</option>
                  ))}
                </select>
              </div>
            </div>
            <button className="btn btn-primary mt-4" onClick={batchCreateContacts}>
              Add Contacts
            </button>
          </div>
        </div>
      )
    }
  }

  return (
    <div>
      <div className="container">
        <h1>Add COntacts</h1>
        <hr />
        <button className="btn btn-primary" onClick={handleAuthClick}>
          Authorize
        </button>

        {showData()}
        {contactField()}
      </div>
    </div>
  )
}

export default AddContact
