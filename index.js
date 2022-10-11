class empDataClass{
   static ImgSrc="images/profile-pic.jpg";
   FirstName;LastName;Email;JobTitle;Office;Department;PhoneNumber;SkypeID;
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
   var propertyArray=employeeDetails.map(emp => emp[property]).filter((v,i,a)=>a.indexOf(v)==i);
   propertyArray.forEach(ele=>{
      var count=employeeDetails.filter(_=>_[property]==ele).length;
      text+=`<input class="${property}" name="${property}" value="${ele}" type="checkbox" id="${ele}">
      <label value="${ele}" name="${property}" for="${ele}">
         ${ele}(${count})
      </label>`
   });          
   filterList.innerHTML=text;
}

function displayEmployeeDetails(id){
   var ele=employeeDetails.filter(_=>_.Email==id);
   document.getElementById("firstName").value= ele[0].FirstName;
   //Not yet completed
   openForm();
}

function displayEmployeeCards( arrayofcards){
   var parentDiv=document.getElementById("employeeContainer");
   var temp="";
   for(var i=0;i<arrayofcards.length;i++)
   { 
      temp=temp+`<div class="emp-card" id=${arrayofcards[i].Email} onclick="displayEmployeeDetails(id)">
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
   for(p in selectedItems){
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
function searchkey(){
   var filterBy = document.getElementById('filterBy');
   var property = filterBy.options[filterBy.selectedIndex].value;
   var searchValue = String(document.getElementById("search").value);
   afterSearchFilter=[];
   try{
         for(var i in employeeDetails){
            if(i[property].includes(searchValue)){
               afterSearchFilter.push(i.Email)
            }
         }
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
      for( var i in finalMerge){
         for(var j in employeeDetails){
            if(j.Email==i){
               finalRender.push(j);
            }
         }
      }
      if(finalRender.length==0){
         document.getElementById("employeeContainer").innerHTML=`<p style="opacity:0.7;font-size:13px;text-align:center">"No data found"</p>`;
      }
      else displayEmployeeCards(finalRender);
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
      displayEmployeeCards(employeeDetails);
      displayLeftFilters("departmentList","Department",);
      displayLeftFilters("officesList","Office",);
      displayLeftFilters("jobTitleList","JobTitle",);
      displayLetters();
}

window.onload = function(){
   displayLetters();
   displayEmployeeCards(employeeDetails);
   displayLeftFilters("departmentList","Department");
   displayLeftFilters("officesList","Office");
   displayLeftFilters("jobTitleList","JobTitle");
   document.getElementById("clearBtn").onclick=function(){clearContents()};
   document.getElementById("addEmpBtn").onclick= function(){openForm()};
   document.getElementById("cancelBtn").onclick=function(){closeForm()};
   document.getElementById("form").addEventListener('submit', saveEmpData);
   document.getElementById("lettersContainer").onchange=function(){applyFilters();merge();};
   document.getElementById("departmentList").onchange=function(){applyFilters();merge();};
   document.getElementById("officesList").onchange=function(){applyFilters();merge();};
   document.getElementById("jobTitleList").onchange=function(){applyFilters();merge();};
   document.getElementById("search").oninput=function(){searchkey()};
}


