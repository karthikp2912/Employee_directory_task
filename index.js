const ImgSrc="images/profile-pic.jpg";
var xhReq = new XMLHttpRequest();
xhReq.open("GET", "./employeeDetails.json", false);
xhReq.send(null);
let employeeDetails = JSON.parse(xhReq.responseText);

function displayLetters(){
   var letters=document.getElementById("lettersContainer");
   var temp="";
   for(var i=65;i<=90;i++){
      var text =String.fromCharCode(i);
      temp = temp + `<input name="lettersName" class="letters" value=${text} type="checkbox" id=${text}><label value=${text} for=${text}>${text}</label>`;   
   }
   letters.innerHTML=temp;
}

function displayLeftFilters(filterId,property){
   var filterList=document.getElementById(filterId);
   var text="";
   var Array=employeeDetails.map(emp => emp[property]).filter((v,i,a)=>a.indexOf(v)==i);
   Array.forEach(ele=>{
      var count=employeeDetails.filter(_=>_[property]==ele).length;
      text+=`<input class="${property}" name="${property}" value="${ele}" type="checkbox" id="${ele}">
      <label value="${ele}" name="${property}" for="${ele}">
         ${ele}(${count})
      </label>`
   });          
   filterList.innerHTML=text;
}

function displaydropdown(){
   var filterContainer=document.getElementById("filterBy");
   var temp="";
   Object.keys(employeeDetails[0]).forEach(element => {
      temp+=`<option value="${element}">${element}</option>`
   });
   filterContainer.innerHTML+=temp;
}

function displayEmployeeDetails(id){
   var ele=employeeDetails.find(_=>_.Email==id);
   document.getElementById("FormFirstName").value= ele.FirstName;
   document.getElementById("FormLastName").value= ele.LastName;
   document.getElementById("FormEmail").value= ele.Email;
   document.getElementById("FormJobTitle").value= ele.JobTitle;
   document.getElementById("FormOffice").value= ele.Office;
   document.getElementById("FormDepartment").value= ele.Department;
   document.getElementById("FormPhoneNumber").value= ele.PhoneNumber;
   document.getElementById("FormSkypeID").value= ele.SkypeID;
   openFormToChange();
}

function displayEmployeeCards(arrayofcards){
   var parentDiv=document.getElementById("employeeContainer");
   var temp="";
   for(var i=0;i<arrayofcards.length;i++)
   { 
      temp=temp+`<div class="emp-card" id=${arrayofcards[i].Email} onclick="displayEmployeeDetails(id)">
      <img src=${ImgSrc}>
         <div class="detailsDiv"> 
            <p>${arrayofcards[i].FirstName} ${arrayofcards[i].LastName}</p>
            <p>${arrayofcards[i].JobTitle}</p>
            <p>${arrayofcards[i].Department}</p>
            <p>
               <i class="fa-solid fa-square-phone"></i>
               <i class="fa-solid fa-envelope"></i>
               <i class="fa-solid fa-comment"></i>
               <i class="fa-solid fa-star"></i>
               <i class="fa-solid fa-heart"></i>
            </p>
         </div>
      </div> `
   }
   parentDiv.innerHTML=temp;
}

let selectedItems={}, AfterdepFilter=[], AfterjobFilter=[], AfteroffFilter=[], AfterLetterFilter=[];
function applyFilters(){
   selectedItems={};
   AfterdepFilter=[];
   AfteroffFilter=[];
   AfterLetterFilter=[];
   AfterjobFilter=[];
   var allCheckBoxes=document.querySelectorAll('input[type="checkbox"]:checked');
   allCheckBoxes.forEach(element => {
      if(!selectedItems.hasOwnProperty(element.className)){
         selectedItems[element.className] = [];
      }
      selectedItems[element.className].push(element.value);
   });
   for(var p in selectedItems){
      fillArrays(p);  
   }
}

function fillArrays(p){
   selectedItems[p].forEach(i => {
      employeeDetails.forEach(j => {
         if(j[p]==i){
            if(p=="Department") AfterdepFilter.push(j.Email);   
            else if(p=="Office") AfteroffFilter.push(j.Email);
            else if(p=="JobTitle") AfterjobFilter.push(j.Email);
         }   
         if(p=="letters"){
            if(j.FirstName.charAt(0)==i) AfterLetterFilter.push(j.Email); 
         }
      });
   });
}

let afterSearchFilter=[];
function searchKey(){
   var filterBy = document.getElementById('filterBy');
   var property = filterBy.options[filterBy.selectedIndex].value;
   var searchValue = String(document.getElementById("search").value);
   afterSearchFilter=[];
   try{
      employeeDetails.forEach(i => {
         if(i[property].includes(searchValue)){
            afterSearchFilter.push(i.Email)
         }
      });
      if(afterSearchFilter.length==0){
         document.getElementById("employeeContainer").innerHTML=`<p style="opacity:0.7;font-size:13px;text-align:center">"No data found"</p>`;
      }
      else merge();
   }
   catch(err){
      alert("select Preffered Name first");
      document.getElementById("search").value="";
   }
}

function intersection(a) {
   if (a.length > 2)
      return intersection([intersection(a.slice(0, a.length / 2)), intersection(a.slice(a.length / 2))]);
   if (a.length == 1)
      return a[0];
   return a[0].filter(function(item) {
      return a[1].indexOf(item) !== -1;
   });
}

let finalRender=[]
function merge(){
   var data=[];
   if(AfterLetterFilter.length!=0)
      data.push(AfterLetterFilter);
   if(AfterdepFilter.length!=0)
      data.push(AfterdepFilter);
   if(AfteroffFilter.length!=0)
      data.push(AfteroffFilter);
   if(AfterjobFilter.length!=0)
      data.push(AfterjobFilter);
   if(afterSearchFilter.length!=0)
      data.push(afterSearchFilter);
   if(data.length==0)
      displayEmployeeCards(employeeDetails);
   else{
      var finalMerge=intersection(data);
      finalRender=[];
      finalMerge.forEach(i => {
         employeeDetails.forEach(j => {
            if(j.Email==i){
               finalRender.push(j);
            }
         });
      });
      if(finalRender.length==0){
         document.getElementById("employeeContainer").innerHTML=`<p style="opacity:0.7;font-size:13px;text-align:center">"No data found"</p>`;
      }
      else displayEmployeeCards(finalRender);
   }
}

function clearContents(){
   document.getElementById("search").value="";
   searchKey();
}

function openFormToAdd(){
   document.getElementById("myForm").style.display="block";
   document.getElementById("saveChangesBtn").style.display="none";
   document.getElementById("closeBtn").style.display="none";
}

function closeForm(){
   document.getElementById("myForm").style.display="none";
   document.getElementById("saveChangesBtn").style.display="block";
   document.getElementById("closeBtn").style.display="block";
}

function openFormToChange(){
   document.getElementById("myForm").style.display="block";
   document.getElementById("submitBtn").style.display="none";
   document.getElementById("cancelBtn").style.display="none";
}

function closeFormAfterChanges(){
   document.getElementById("myForm").style.display="none";
   document.getElementById("submitBtn").style.display="block";
   document.getElementById("cancelBtn").style.display="block";
}

function saveEmpData(event){
      event.preventDefault();
      const myFormdata=new FormData(event.target);
      const formDataobj={};
      myFormdata.forEach((value,key)=>(
         formDataobj[key]=value
      ));
      if(formDataobj.PhoneNumber.length!=10){
         alert("Invalid phone number");
         return false;
      }
      if(formDataobj.FirstName.length<3 || formDataobj.LastName.length<3){
         alert("Name is too short. please fill a valid name!");
         return false;
      }
      var ele=employeeDetails.find(_=>_.Email==formDataobj.Email);
      if(ele==undefined){
         employeeDetails.push(formDataobj);
         alert("Employee added");
      }
      else{
         Object.assign(ele, formDataobj);
         alert("Employee Details saved");
      }
      form.reset();
      closeForm();
      displayEmployeeCards(employeeDetails);
      displayLeftFilters("departmentList","Department");
      displayLeftFilters("officesList","Office");
      displayLeftFilters("jobTitleList","JobTitle");
      displayLetters();
}

window.onload = function(){
   displayLetters();
   displayEmployeeCards(employeeDetails);
   displaydropdown();
   displayLeftFilters("departmentList","Department");
   displayLeftFilters("officesList","Office");
   displayLeftFilters("jobTitleList","JobTitle");
   document.getElementById("clearBtn").onclick=function(){clearContents()};
   document.getElementById("addEmpBtn").onclick= function(){openFormToAdd()};
   document.getElementById("cancelBtn").onclick=function(){closeForm()};
   document.getElementById("closeBtn").onclick=function(){closeFormAfterChanges()};
   document.getElementById("form").addEventListener('submit', saveEmpData);
   document.getElementById("lettersContainer").onchange=function(){applyFilters();merge();};
   document.getElementById("departmentList").onchange=function(){applyFilters();merge();};
   document.getElementById("officesList").onchange=function(){applyFilters();merge();};
   document.getElementById("jobTitleList").onchange=function(){applyFilters();merge();};
   document.getElementById("search").oninput=function(){searchKey()};
}
