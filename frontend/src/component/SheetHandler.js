import React, { useEffect, useState } from "react"
import { read, utils } from "xlsx"
import "./sheetHandler.css"

const SheetHandler = () => {
  const url = "http://localhost:5000"

  const [sheetData, setSheetData] = useState([])
  const [dataToStore, setDataToStore] = useState({})

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
        title: "Contact Data",
        addedBy: currentUser._id,
        data: dataToStore,
        createdAt: new Date(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })

    console.log(res.status)
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
      setSheetData(data)
      const [arr, field] = getFieldData(data, 2)
      const tempObj = {}
      tempObj[field] = arr
      console.log(tempObj)
      setDataToStore({ ...tempObj })
      /* Update state */
      //   this.setState({ data: data, cols: make_cols(ws["!ref"]) });
    }
    if (rABS) reader.readAsBinaryString(file)
    else reader.readAsArrayBuffer(file)

  }

  const showShowSheetData = () => {
    if(sheetData.length){
      return <table className="table align-middle mb-0 bg-white">
    <thead className="bg-light">
      <tr>
        {sheetData[0].map(heading => (
        <th>{heading}</th>
        ))
        
      }
      </tr>
    </thead>
    <tbody>
      {sheetData.map(col => (

      <tr>
        {col.map(dat =>(
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
    }
    
  
  }

  const getContactsFromBackend = () => {
    fetch(url + "/contact/getall")
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
      })
  }

  useEffect(() => {
    getContactsFromBackend()
  }, [])

  return (
    <div>
      <h1 className="form-style">Welcome to Automation Tool</h1>
      <div className="container">
        <input onChange={extractData} type="file" />
        <button className="btn btn-primary" onClick={storeData}>
          Store Data
        </button>
        <hr />
        {showShowSheetData()}
      </div>
    </div>
  )
}

export default SheetHandler
