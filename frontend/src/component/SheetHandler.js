import React, { useState } from 'react'
import { read, utils } from "xlsx";
import './sheetHandler.css';

const SheetHandler = () => {

	const url = 'http://localhost:5000'

	const [sheetData, setSheetData] = useState([]);
	const [dataToStore, setDataToStore] = useState({});

	const getFieldData = (data, num) => {
		console.log('Getting Field : '+data[0][num]);
		let tempArray = [];
		for(let email of data.slice(1)){
			tempArray.push(email[num]);
		}
		console.log(tempArray);
		return [tempArray, data[0][num]];
	}

	const storeData = async () => {
		const res = fetch(url+'/contact/add', {
			method : 'POST',
			 
		body : JSON.stringify(dataToStore),
        headers: {
            'Content-Type': 'application/json'
			
        }
		})


		console.log(res.status);
	}

	const extractData = (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		const rABS = !!reader.readAsBinaryString;
		reader.onload = e => {
			/* Parse data */
			const bstr = e.target.result;
			const wb = read(bstr, { type: rABS ? "binary" : "array" });
			/* Get first worksheet */
			const wsname = wb.SheetNames[0];
			const ws = wb.Sheets[wsname];
			//   console.log(rABS, wb);
			/* Convert array of arrays */
			const data = utils.sheet_to_json(ws, { header: 1 });
			console.log(data);
			setSheetData(data);
			const [arr, field] = getFieldData(data, 2);
			const tempObj = {};
			tempObj[field] = arr;
			console.log(tempObj);
			setDataToStore({...tempObj});
			/* Update state */
			//   this.setState({ data: data, cols: make_cols(ws["!ref"]) });
		};
		if (rABS) reader.readAsBinaryString(file);
		else reader.readAsArrayBuffer(file);





		const $ = document.querySelector.bind(document);

		//APP
		let App = {};
		App.init = (function () {
			//Init
			function handleFileSelect(evt) {
				const files = evt.target.files; // FileList object

				//files template
				let template = `${Object.keys(files)
					.map(file => `<div class="file file--${file}">
     <div class="name"><span>${files[file].name}</span></div>
     <div class="progress active"></div>
     <div class="done">
	<a href="" target="_blank">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 1000 1000">
		<g><path id="path" d="M500,10C229.4,10,10,229.4,10,500c0,270.6,219.4,490,490,490c270.6,0,490-219.4,490-490C990,229.4,770.6,10,500,10z M500,967.7C241.7,967.7,32.3,758.3,32.3,500C32.3,241.7,241.7,32.3,500,32.3c258.3,0,467.7,209.4,467.7,467.7C967.7,758.3,758.3,967.7,500,967.7z M748.4,325L448,623.1L301.6,477.9c-4.4-4.3-11.4-4.3-15.8,0c-4.4,4.3-4.4,11.3,0,15.6l151.2,150c0.5,1.3,1.4,2.6,2.5,3.7c4.4,4.3,11.4,4.3,15.8,0l308.9-306.5c4.4-4.3,4.4-11.3,0-15.6C759.8,320.7,752.7,320.7,748.4,325z"</g>
		</svg>
						</a>
     </div>
    </div>`)
					.join("")}`;

				$("#drop").classList.add("hidden");
				$("footer").classList.add("hasFiles");
				$(".importar").classList.add("active");
				setTimeout(() => {
					$(".list-files").innerHTML = template;
				}, 1000);

				Object.keys(files).forEach(file => {
					let load = 2000 + (file * 2000); // fake load
					setTimeout(() => {
						$(`.file--${file}`).querySelector(".progress").classList.remove("active");
						$(`.file--${file}`).querySelector(".done").classList.add("anim");
					}, load);
				});
			}

			// trigger input
			$("#triggerFile").addEventListener("click", evt => {
				evt.preventDefault();
				$("input[type=file]").click();
			});

			// drop events
			$("#drop").ondragleave = evt => {
				$("#drop").classList.remove("active");
				evt.preventDefault();
			};
			$("#drop").ondragover = $("#drop").ondragenter = evt => {
				$("#drop").classList.add("active");
				evt.preventDefault();
			};
			$("#drop").ondrop = evt => {
				$("input[type=file]").files = evt.dataTransfer.files;
				$("footer").classList.add("hasFiles");
				$("#drop").classList.remove("active");
				evt.preventDefault();
			};

			//upload more
			$(".importar").addEventListener("click", () => {
				$(".list-files").innerHTML = "";
				$("footer").classList.remove("hasFiles");
				$(".importar").classList.remove("active");
				setTimeout(() => {
					$("#drop").classList.remove("hidden");
				}, 500);
			});

			// input change
			$("input[type=file]").addEventListener("change", handleFileSelect);
		})();



	}


	return (
		<div>
			<h1 className="form-style">Welcome to Automation Tool</h1>
			<div className="container">
				<input onChange={extractData} type="file" />
				<button className='btn btn-primary' onClick={storeData}>Store Data</button>
				<div class="upload">
					<div class="upload-files">
						<header>
							<p>
								<i class="fa fa-cloud-upload" aria-hidden="true"></i>
								<span class="up">Up</span>
								<span class="load">Load</span>
							</p>
						</header>
						<div class="body" id="drop">
							<i class="fa fa-file-text-o pointer-none" aria-hidden="true"></i>
							<p class="pointer-none"><b>Drag and drop</b> files here <br /> or <a href="" id="triggerFile" type='file'>browse</a> to begin the upload</p>
							<input type="file" multiple="multiple" />
						</div>
						<footer>
							<div class="divider">
								<span>FILES</span>
							</div>
							<div class="list-files">

							</div>
							<button class="importar">UPDATE FILES</button>
						</footer>
					</div>
				</div>


			</div>
		</div>
	)


}

export default SheetHandler;