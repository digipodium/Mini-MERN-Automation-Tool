import React, { useEffect, useState } from 'react'

const MailSender = () => {

  const [contactsData, setContactsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [letterContent, setLetterContent] = useState("");
  const [subject, setSubject] = useState("");
  const [selContact, setSelContact] = useState(null);

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

  const url = "http://localhost:5000";

  const showData = () => {
    return <table className="table align-middle mb-0 bg-white">
        <thead className="bg-light">
          <tr>
            <td>Title</td>
            <td>Created On</td>
          </tr>
        </thead>
        <tbody>
          {contactData.map(contact => (
            <tr>
                <td>{contact.title}</td>
                <td>{contact.createdAt}</td>
                <td>
                  <button className='btn btn-primary' onClick={e => setSelContact(contact)}>Use This</button>
                </td>
                <td>
                  <button className='btn btn-danger' onClick={e => {
                    fetch(url+'/contact/delete/'+contact._id, {method : 'DELETE'})
                    .then(res => {
                      console.log(res.status);
                      getContactsFromBackend();
                    })
                  }}>Delete</button>
                </td>
            </tr>
          ))}

        </tbody>
      </table>
  }


  useEffect(() => {
    getContactsFromBackend();
  }, []);

  const [contactData, setContactData] = useState([]);


  const displayContacts = () => {
    if (!loading) {
      return contactsData.map(({ title }) => (
        <tr>
          <td>{title}</td>
        </tr>
      ));
    }
  };

  const sendMail = async (recAddress) => {
    const res = await fetch("http://localhost:5000/util/sendmail", {
      method: "POST",
      body: JSON.stringify({
        from: "mymmm656@gmail.com", // sender address
        to: recAddress, // list of receivers
        subject: subject,
        html: letterContent,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(res);
  };

  const sendNewsLetter = () => {
    if(!selContact)
    return
    selContact.data.Email.forEach((email ) => {
      console.log("mail sent to " + email);
      sendMail(email);
    });
  };

  const getContactsFromBackend = () => {
    fetch(url + "/contact/getall")
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setContactData(data);
      })
  }

  return (
    <div>
      <h1 className='text-center display-4'>Mail Sender</h1>
      <hr />

      {displayContacts()}
      {showData()}

      <div className="card mt-5 backcolor1">
        <div className="card-body">
          <input
            placeholder="Enter Mail Subject"
            className="form-control"
            onChange={(e) => setSubject(e.target.value)}
          />
          <textarea
            className="form-control mt-4"
            rows="10"
            onChange={(e) => setLetterContent(e.target.value)}
          ></textarea>
          <button className="btn btn-primary mt-4" onClick={sendNewsLetter}>
            Send
          </button>
        </div>
      </div>

    </div>
  )
}

export default MailSender;