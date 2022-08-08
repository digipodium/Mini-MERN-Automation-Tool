import React, { useEffect, useState } from 'react'

const MailSender = () => {

    const [contactsData, setContactsData] = useState([]);
    const [loading, setLoading] = useState(false);

    const [letterContent, setLetterContent] = useState("");
  const [subject, setSubject] = useState("");

    const [currentUser, setCurrentUser] = useState(
        JSON.parse(sessionStorage.getItem("user"))
      );

      const url = "http://localhost:5000";

    const getDataFromBackend = async () => {
        setLoading(true);
        const res = await fetch(
          url + "/newsubscriber/getbyuser/" + currentUser._id
        );
        const data = await res.json();
        setContactsData(data);
        setLoading(false);
        console.log(data);
      };
    
      useEffect(() => {
        getDataFromBackend();
      }, []);
    
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
            from: "mariyamtariq27@gmail.com", // sender address
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
    
      const sendNewsLetter = (contacts) => {
        contacts.forEach(({ email }) => {
          console.log("mail sent to " + email);
          sendMail(email);
        });
      };

  return (
    <div>
        <h1 className='text-center display-4'>Mail Sender</h1>
        <hr />

        {displayContacts()}

        <div className="card mt-5 backcolor1">
            <div className="card-body">
              <input
                placeholder="Enter mail title"
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