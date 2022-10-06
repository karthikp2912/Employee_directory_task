class empDataClass{
   static ImgSrc="images/profile-pic.jpg";
   constructor(FirstName,LastName,Email,JobTitle,Office,Department,PhoneNumber,SkypeID)
   {
      this.FirstName=FirstName;
      this.LastName=LastName;
      this.Email=Email;
      this.JobTitle=JobTitle;
      this.Office=Office;
      this.Department=Department;
      this.PhoneNumber=PhoneNumber;
      this.SkypeID=SkypeID;   
   }
}

let employeeDetails=[];
employeeDetails.push(new empDataClass("Karthik", "varma", "karthik@technovert.com","BI developer","Seattle","Human Resources",8978803288,"karthik2912"));
employeeDetails.push(new empDataClass("Sai","Krishna","saiki@gmail.com","Mobile Developer","Seattle","IT", 6256254567,"krishna846"));
employeeDetails.push(new empDataClass("Ajay", "Ravada", "ajay@technovert.com",
"Business Analyst","India","MD",9836522448,"ajay843",));
employeeDetails.push(new empDataClass("Shiva", "Prasad", "shiva@technovert.com","UX Designer","India","IT",9876265564,"shiva123",));
employeeDetails.push(new empDataClass("Bhaskar", "Raj", "bhaskar@technovert.com","Web Developer","India","IT",9845675438,"raj233",));
employeeDetails.push(new empDataClass("Mahesh", "Reddy", "mahesh@technovert.com","Web Developer","India","IT",9876345477,"mahesh9687",));
employeeDetails.push(new empDataClass("Ravi", "Kiran", "ravi@technovert.com","Web Developer","India","MD",9876345448,"ravi123",))
employeeDetails.push(new empDataClass("Ashok", "Kumar", "ashok@technovert.com","UX Designer","Seattle","IT",6735673768,"ashok234",))

function renderLetters1(){
   var letters=document.getElementById("lettersDiv");
   var firstletters=employeeDetails.map(emp=> emp.FirstName.charAt(0))
   firstletters=firstletters.filter((v,i,a)=>a.indexOf(v)==i);
   firstletters.sort();
   var temp='';
   firstletters.forEach(text=>{
      temp +=`<input name="lettersName" value=${text} type="checkbox" id=${text}><label value=${text} for=${text}>${text}</label>`;
   })
   letters.innerHTML=temp;
}

function displayLeftFilters(){
   var depList=document.getElementById("departmentList");
   var text="";
   var departmentsArray=employeeDetails.map(emp => emp.Department).filter((v,i,a)=>a.indexOf(v)==i);
   departmentsArray.forEach(dep=>{
      var count=employeeDetails.filter(_=>_.Department==dep).length;
      text+=`<input class="depName" value="${dep}" type="checkbox" id=${dep}>
      <label value=${dep} for=${dep}>
         ${dep}(${count})
      </label>`
   });
   depList.innerHTML=text;
   var officesList=document.getElementById("officesList");
   text="";
   var officesArray=employeeDetails.map(emp => emp.Office).filter((v,i,a)=>a.indexOf(v)==i);
   officesArray.forEach(off=>{
      var count=employeeDetails.filter(_=>_.Office==off).length;
      text+=`<input class="offName" value="${off}" type="checkbox" id=${off}>
      <label value=${off} for=${off}> 
         ${off}(${count})
      </label>`
   });
   officesList.innerHTML=text;
   var jobTitleArray=document.getElementById("jobTitleList");
   text="";
   var jobTitleArray=employeeDetails.map(emp => emp.JobTitle).filter((v,i,a)=>a.indexOf(v)==i);
   jobTitleArray.forEach(job=>{
      var count=employeeDetails.filter(_=>_.JobTitle==job).length;
      text+=`<input class="jobName" value="${job}" type="checkbox" id=${job}>
      <label value=${job} for=${job}>
         ${job}(${count})
      </label>`
   });
   jobTitleList.innerHTML=text;
}

function displayFullDetails(id){
   document.getElementById("h"+id).style.display="block";
}

function closeContent(id){
   document.getElementById("h"+id).style.display="none";
}

function renderEmployeeCards(arrayofcards){
   var parentdiv=document.getElementById("employeeDiv");
   var temp="";
   for(var i=0;i<arrayofcards.length;i++)
   { 
      temp=temp+`<div class="emp-card" id=${arrayofcards[i].Email} onclick="displayFullDetails(id)">
      <img src=${empDataClass.ImgSrc}>
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
      </div>
      <div class="hidden-details" id=h${arrayofcards[i].Email}>
         <div class="hidden-content">
            <img src=${empDataClass.ImgSrc}>
            <table>
               <tr>
                  <td>Name</td><td>${arrayofcards[i].FirstName} ${arrayofcards[i].LastName}</td>
               </tr>
               <tr>
                  <td>JobTitle</td><td>${arrayofcards[i].JobTitle}</td>
               </tr>
               <tr>
                  <td>Department</td><td>${arrayofcards[i].Department}</td>
               </tr>
               <tr>
                  <td>Email</td><td>${arrayofcards[i].Email}</td>
               </tr>
               <tr>
                  <td>Office</td><td>${arrayofcards[i].Office}</td>
               </tr>
               <tr>
                  <td>PhoneNumber</td><td>${arrayofcards[i].PhoneNumber} </td>
               </tr>
               <tr>
                  <td>SkypeID</td><td>${arrayofcards[i].SkypeID}</td>
               </tr>
            </table>
            <button class="closeContentBtn" name="${arrayofcards[i].Email}" onclick="closeContent(name)">Close</button>
         </div>
      </div>
      `
   }
   parentdiv.innerHTML=temp;
}

let AfterLetterFilter=[];
function letterFilter(){
   var checkedLetters=[];
   var lettersName=document.getElementsByName("lettersName");
   var count=0;
   for(var i=0;i<lettersName.length;i++){
      if(lettersName[i].checked){
         count++;
         checkedLetters.push(lettersName[i].value);
      }
   }
   AfterLetterFilter=[];
   for(var i=0;i<checkedLetters.length;i++){
      var char=checkedLetters[i];
      for(var j=0;j<employeeDetails.length;j++){
         if(employeeDetails[j].FirstName.charAt(0)==char){
            AfterLetterFilter.push(employeeDetails[j].Email);
         }
      }
   }   
}

let AfterdepFilter=[];
function DepFilter(){
   var checkeddep=[];
   var depName=document.getElementsByClassName("depName");
   for(var i=0;i<depName.length;i++){
      if(depName[i].checked){
         checkeddep.push(depName[i].value);
      }
   }
   console.log(checkeddep);
   AfterdepFilter=[]
   for(var i=0;i<checkeddep.length;i++){
      var char=checkeddep[i];
      for(var j=0;j<employeeDetails.length;j++){
         if(employeeDetails[j].Department==char){
            AfterdepFilter.push(employeeDetails[j].Email);
         }
      }
   }
}

let AfteroffFilter=[];
function OffFilter(){
   var checkedoff=[];
   var offName=document.getElementsByClassName("offName");
   for(var i=0;i<offName.length;i++){
      if(offName[i].checked){
         checkedoff.push(offName[i].value);
      }
   }
   AfteroffFilter=[];
   for(var i=0;i<checkedoff.length;i++){
      var char=checkedoff[i];
      for(var j=0;j<employeeDetails.length;j++){
         if(employeeDetails[j].Office==char){
            AfteroffFilter.push(employeeDetails[j].Email);
         }
      }
   }
}

let AfterjobFilter=[];
function jobFilter(){
   var checkedjob=[];
   var jobName=document.getElementsByClassName("jobName");
   for(var i=0;i<jobName.length;i++){
      if(jobName[i].checked){
         checkedjob.push(jobName[i].value);
      }
   }
   AfterjobFilter=[];
   for(var i=0;i<checkedjob.length;i++){
      var char=checkedjob[i];
      for(var j=0;j<employeeDetails.length;j++){
         if(employeeDetails[j].JobTitle==char){
            AfterjobFilter.push(employeeDetails[j].Email);
         }
      }
   }
}

let afterSearchFilter=[];
function searchkey(){
   var filterby = document.getElementById('filterBy');
   var property = filterby.options[filterby.selectedIndex].value;
   var searchValue = String(document.getElementById("search").value);
   afterSearchFilter=[];
   try{
         for(var i=0;i<employeeDetails.length;i++){
            if(employeeDetails[i][property].includes(searchValue)){
               afterSearchFilter.push(employeeDetails[i].Email)
            }
         }
         if(afterSearchFilter.length==0){
            document.getElementById("employeeDiv").innerHTML=`<p style="opacity:0.7;font-size:13px;text-align:center">"No data found"</p>`;
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
      renderEmployeeCards(employeeDetails);
   else{
      var finalMerge=intersection(data);
      finalRender=[];
      for( var i=0;i<finalMerge.length;i++){
         var str=finalMerge[i];
         for(var j=0;j<employeeDetails.length;j++){
            if(employeeDetails[j].Email==str){
               finalRender.push(employeeDetails[j]);
            }
         }
      }
      if(finalRender.length==0){
         document.getElementById("employeeDiv").innerHTML=`<p style="opacity:0.7;font-size:13px;text-align:center">"No data found"</p>`;
      }
      else renderEmployeeCards(finalRender);
   }
}

function clearContents(){
   document.getElementById("search").value="";
   searchkey();
}

function openForm(){
   document.getElementById("myForm").style.display="block";
}

function closeForm(){
   document.getElementById("myForm").style.display="none";
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
      employeeDetails.push(formDataobj);
      alert("Employee added");
      form.reset();
      closeForm();
      renderEmployeeCards(employeeDetails);
      displayLeftFilters();
      renderLetters1();
}

window.onload = function(){
   renderLetters1();
   renderEmployeeCards(employeeDetails);
   displayLeftFilters();
   document.getElementById("clearBtn").onclick=function(){clearContents()};
   document.getElementById("addEmpBtn").onclick= function(){openForm()};
   document.getElementById("cancelBtn").onclick=function(){closeForm()};
   document.getElementById("form").addEventListener('submit', saveEmpData);
   document.getElementById("lettersDiv").onclick=function(){letterFilter();merge()};
   document.getElementById("departmentList").onclick=function(){DepFilter();merge()};
   document.getElementById("officesList").onclick=function(){OffFilter();merge()};
   document.getElementById("jobTitleList").onclick=function(){jobFilter();merge()};
   document.getElementById("search").oninput=function(){searchkey()};
}


