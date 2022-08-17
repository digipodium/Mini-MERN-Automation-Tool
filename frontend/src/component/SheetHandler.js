import React, { useEffect, useState } from "react"
import { read, utils } from "xlsx"
import "./sheetHandler.css"

const SheetHandler = () => {
  const url = "http://localhost:5000"

  const [sheetData, setSheetData] = useState([])
  const [dataToStore, setDataToStore] = useState({})
  const [contactData, setContactData] = useState([]);

  const [dataTitle, setDataTitle] = useState("");

  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem("user")))

  const getFieldData = (data, num) => {
    console.log("Getting Field : " + data[0][num])
    let tempArray = []
    for (let email of data.slice(1)) {
      tempArray.push(email[num])
    }
    console.log(tempArray)
    return [tempArray, data[0][num]]
  }

  const storeData = async () => {
    const res = await fetch(url + "/contact/add", {
      method: "POST",

      body: JSON.stringify({
        title: dataTitle,
        addedBy: currentUser._id,
        data: dataToStore,
        createdAt: new Date(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })

    console.log(res.status);
    getContactsFromBackend();
    // popup
  }

  const extractData = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    const rABS = !!reader.readAsBinaryString
    reader.onload = (e) => {
      /* Parse data */
      const bstr = e.target.result
      const wb = read(bstr, { type: rABS ? "binary" : "array" })
      /* Get first worksheet */
      const wsname = wb.SheetNames[0]
      const ws = wb.Sheets[wsname]
      //   console.log(rABS, wb);
      /* Convert array of arrays */
      const data = utils.sheet_to_json(ws, { header: 1 })
      console.log(data)
      setSheetData(data);
      let tempObj = {};
      for(let i=0;i<data[0].length;i++){
        const [arr, field] = getFieldData(data, i)
        // tempObj = {};
        tempObj[field] = arr;
      }
      console.log(tempObj)
      setDataToStore({ ...tempObj })
      /* Update state */
      //   this.setState({ data: data, cols: make_cols(ws["!ref"]) });
    }
    if (rABS) reader.readAsBinaryString(file)
    else reader.readAsArrayBuffer(file)

  }

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

  const showShowSheetData = () => {
    if (sheetData.length) {
      return <div className="card mt-4">
        <div className="card-header">
          <h4 className="m-0">Excel Sheet Data</h4>
        </div>
        <div className="card-body">

        
      <table className="table align-middle mb-0 bg-white">
        <thead className="bg-light">
          <tr>
            {sheetData[0].map(heading => (
              <th>{heading}</th>
            ))
            }
          </tr>
        </thead>
        <tbody>
          {sheetData.slice(1).map(col => (

            <tr>
              {col.map(dat => (
                <td>
                  <div className="d-flex align-items-center">
                    <div className="ms-3">
                      <p>{dat}</p>
                    </div>
                  </div>
                </td>
              ))}
            </tr>
          ))}

        </tbody>
      </table>
      </div>
      </div>
    }
  }

  const getContactsFromBackend = () => {
    fetch(url + "/contact/getbyuser/"+currentUser._id)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setContactData(data);
      })
  }

  useEffect(() => {
    getContactsFromBackend()
  }, [])

  return (
    <div className="main-bg">
      <h1 className="form-style">Welcome to Automation Tool</h1>
      <div className="container">
        <div className="card mt-5">
          <div className="card-header">
            <h4 className="m-0">Upload Excel Sheet</h4>
          </div>
          <div className="card-body">
            <div className="input-group">
              <label htmlFor="sheet-upload" className="btn btn-link btn-lg"> <i class="fas fa-upload    "></i> Upload Sheet</label>
              <input hidden id="sheet-upload" onChange={extractData} type="file" />
              <input type="text" className="form-control" disabled={!Object.keys(dataToStore).length} onChange={e => setDataTitle(e.target.value)} />
              <button className="btn btn-primary" disabled={!Object.keys(dataToStore).length} onClick={storeData}>Store Sheet Data</button>
            </div>
          </div>
        </div>
        {showShowSheetData()}
        <div className="card mt-5">
          <div className="card-header">
            <h4 className="m-0">Existing Data</h4>
          </div>
          <div className="card-body">
          {showData()}
          </div>
        </div>
        
        
      </div>
    </div>
  )
}

export default SheetHandler
