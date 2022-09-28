let employeeDetails=[
   {   
      FirstName:"Karthik", 
      LastName:"varma", 
      Email:"karthik@technovert.com",
      JobTitle:"BI developer",
      Office:"Seattle",
      Department:"Human Resources",
      PhoneNumber:8978803288,
      SkypeID:"karthik2912",
      ImgSrc:"images/profile-pic.jpg"
   },
   {
      FirstName:"Ashok", 
      LastName:"Kumar", 
      Email:"ashok@technovert.com",
      JobTitle:"UX Designer",
      Office:"Seattle",
      Department:"IT",
      PhoneNumber:67356737668,
      SkypeID:"ashok234",
      ImgSrc:"images/profile-pic.jpg"
   },
   {
      FirstName:"Ravi", 
      LastName:"Kiran", 
      Email:"ravi@technovert.com",
      JobTitle:"Business Analyst",
      Office:"India",
      Department:"MD",
      PhoneNumber:9876345448,
      SkypeID:"ravi123",
      ImgSrc:"images/profile-pic.jpg"
   },
   {
      FirstName:"Mahesh", 
      LastName:"Reddy", 
      Email:"mahesh@technovert.com",
      JobTitle:"Web Developer",
      Office:"India",
      Department:"IT",
      PhoneNumber:9876345448,
      SkypeID:"mahesh9687",
      ImgSrc:"images/profile-pic.jpg"
   },
   {
      FirstName:"Bhaskar", 
      LastName:"Raj", 
      Email:"bhaskar@technovert.com",
      JobTitle:"Web Developer",
      Office:"India",
      Department:"IT",
      PhoneNumber:98745675438,
      SkypeID:"raj233",
      ImgSrc:"images/profile-pic.jpg"
   },
   {
      FirstName:"Ajay", 
      LastName:"Ravada", 
      Email:"ajay@technovert.com",
      JobTitle:"Business Analyst",
      Office:"India",
      Department:"MD",
      PhoneNumber:9836522448,
      SkypeID:"ajay843",
      ImgSrc:"images/profile-pic.jpg"
   },
   {
      FirstName:"Shiva", 
      LastName:"Prasad", 
      Email:"shiva@technovert.com",
      JobTitle:"UX Designer",
      Office:"India",
      Department:"IT",
      PhoneNumber:98762655648,
      SkypeID:"shiva123",
      ImgSrc:"images/profile-pic.jpg"
   }
];
let tempemployeeDetails=employeeDetails;
function renderLetters(){
   var letters=document.getElementById("LettersDiv");
   for(let i=0;i<26;i++)
   {
      let code = 'A'.charCodeAt(0) + i;
      let text = String.fromCharCode(code);
      letters.innerHTML =letters.innerHTML+
      `<input name="lettersName" value=${text} type="checkbox" id=${text}><label value=${text} for=${text}>${text}</label>`;
   }
}
function displayLeftFilters(){
   var depList=document.getElementById("departmentList");
   var officesList=document.getElementById("officesList");
   var jobTitleList=document.getElementById("jobTitleList");
   while (depList.hasChildNodes()) {
      depList.removeChild(depList.firstChild);
   }
   while (officesList.hasChildNodes()) {
      officesList.removeChild(officesList.firstChild);
   }
   while (jobTitleList.hasChildNodes()) {
      jobTitleList.removeChild(jobTitleList.firstChild);
   }
   const departmentsArray=new Map();
   const officesArray=new Map();
   const jobTitleArray=new Map();
   for(var i=0;i<employeeDetails.length;i++)
   {
      var dep=employeeDetails[i].Department;
      var off=employeeDetails[i].Office;
      var job=employeeDetails[i].JobTitle;
      if(departmentsArray.has(dep)){
         departmentsArray.set(dep, departmentsArray.get(dep)+1);
      }
      else{
         departmentsArray.set(dep,1);
      }
      if(officesArray.has(off)){
         officesArray.set(off, officesArray.get(off)+1);
      }
      else{
         officesArray.set(off,1);
      }
      if(jobTitleArray.has(job)){
         jobTitleArray.set(job, jobTitleArray.get(job)+1);
      }
      else{
         jobTitleArray.set(job,1);
      }
   }
   var depList=document.getElementById("departmentList");
   for(const [key,value] of departmentsArray)
   {
      depList.innerHTML=depList.innerHTML+ 
      `<li onclick="leftFilterDisplayDepartment('${key}')" id=${key}>
         ${key}(${value})
      <li>`;
   }
   var officesList=document.getElementById("officesList");
   for(const [key,value] of officesArray)
   {
      officesList.innerHTML=officesList.innerHTML+ 
      `<li onclick="leftFilterDisplayOffices('${key}')" id=${key}>
         ${key}(${value})
      <li>`;
   
   }
   var jobTitleList=document.getElementById("jobTitleList");
   for(const [key,value] of jobTitleArray)
   {
      jobTitleList.innerHTML=jobTitleList.innerHTML+ 
      `<li onclick="leftFilterDisplayJobTitle('${key}')" id=${key}>
         ${key}(${value})
      <li>`;
   }
}
function renderEmployeeCards(arrayofcards){
   var parentdiv=document.getElementById("employee-div");
   while (parentdiv.hasChildNodes()) {
      parentdiv.removeChild(parentdiv.firstChild);
   }
   for(var i=0;i<arrayofcards.length;i++)
   { 
      parentdiv.innerHTML=parentdiv.innerHTML+
      `<div class="empCard" id="EmpCard">
         <img src=${arrayofcards[i].ImgSrc}>
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
         <div class="hidden-details" id="hiddenDetails">
               <p>${arrayofcards[i].Email}</p>
               <p>${arrayofcards[i].Office}</p>
               <p>${arrayofcards[i].PhoneNumber}</p>
               <p>${arrayofcards[i].SkypeID}</p>
               <button id="CloseBtn">Close</button>
         </div>
      </div>`
   }
}
let checkedCount=0;
function Invoke(){
   var lettersName=document.getElementsByName("lettersName");
   var count=0;
   for(var i=0;i<lettersName.length;i++)
   {
      if(lettersName[i].checked)
      {
         count++;
      }
   }
   // console.log(count+" "+checkedCount);
   if(count!=checkedCount)
   {
      letterFilter();
      checkedCount=count;
   }
}
function letterFilter(){
   var checkedLetters=[];
   var lettersName=document.getElementsByName("lettersName");
   var count=0;
   for(var i=0;i<lettersName.length;i++)
   {
      if(lettersName[i].checked)
      {
         count++;
         checkedLetters.push(lettersName[i].value);
      }
   }
   console.log(checkedLetters);
   if(count==0)
   {
      renderEmployeeCards(employeeDetails);
   }
   var AfterLetterFilter=[];

   for(var i=0;i<checkedLetters.length;i++)
   {
      var char=checkedLetters[i];
      for(var j=0;j<employeeDetails.length;j++)
      {
         if(employeeDetails[j].FirstName.charAt(0)==char)
         {
            AfterLetterFilter.push(employeeDetails[j]);
         }
      }
      renderEmployeeCards(AfterLetterFilter);
   }
}
function openForm(){
   var addBtn=document.getElementById("addBtn");
   console.log(addBtn.checked);
   if(addBtn.checked)
   {
      document.getElementById("myForm").style.display="block";
   }
   else
   {
      document.getElementById("myForm").style.display="none";
   }
}
function saveEmpData(event){
      event.preventDefault();
      const myFormdata=new FormData(event.target);
      const formDataobj={};
      myFormdata.forEach((value,key)=>(
         formDataobj[key]=value
      ));
      employeeDetails.push(formDataobj);
      alert("Employee added");
      form.reset();
      closeForm();
      renderEmployeeCards(employeeDetails);
      displayLeftFilters();
}
function leftFilterDisplayDepartment(dep)
{
   let temparr=[];
   for(var i=0;i<employeeDetails.length;i++)
   {
      if(employeeDetails[i].Department==dep)
      {
         temparr.push(employeeDetails[i]);
      }
   }
   tempemployeeDetails=temparr;
   renderEmployeeCards(tempemployeeDetails);
}
function leftFilterDisplayOffices(dep)
{
   let temparr=[];
   for(var i=0;i<employeeDetails.length;i++)
   {
      if(employeeDetails[i].Office==dep)
      {
         temparr.push(employeeDetails[i]);
      }
   }
   tempemployeeDetails=temparr;
   renderEmployeeCards(tempemployeeDetails);
}
function leftFilterDisplayJobTitle(dep)
{
   let temparr=[];
   for(var i=0;i<employeeDetails.length;i++)
   {
      if(employeeDetails[i].JobTitle==dep)
      {
         temparr.push(employeeDetails[i]);
      }
   }
   tempemployeeDetails=temparr;
   renderEmployeeCards(tempemployeeDetails);
}

window.onload = function(){
   renderLetters();
   displayLeftFilters();
   renderEmployeeCards(employeeDetails);
   openForm();
   document.getElementById("form").addEventListener('submit', saveEmpData);
   setInterval(Invoke,1000);
}


