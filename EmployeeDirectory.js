let employeeDetails=[
   {
      ImgSrc:"images/profile pic.jpg",
      FirstName:"karthik", 
      LastName:"varma", 
      Email:"karthik@technovert.com",
      JobTitle:"BI developer",
      Office:"Seattle",
      Department:"Human Resources",
      PhoneNumber:8978803288,
      SkypeID:"karthik2912"
   },
   {
      ImgSrc:"images/profile pic.jpg",
      FirstName:"karthik", 
      LastName:"varma", 
      Email:"karthik@technovert.com",
      JobTitle:"BI developer",
      Office:"Seattle",
      Department:"IT",
      PhoneNumber:8978803288,
      SkypeID:"karthik2912"
   },
   {
      ImgSrc:"images/profile pic.jpg",
      FirstName:"karthik", 
      LastName:"varma", 
      Email:"karthik@technovert.com",
      JobTitle:"BI developer",
      Office:"Seattle",
      Department:"IT",
      PhoneNumber:8978803288,
      SkypeID:"karthik2912"
   }
];

function filterCount(){
   let itCount=0,hrCount=0, mdCount=0,sCount=0,seattleCount=0,indiaCount=0,spphCount=0, netCount=0, reCount=0 , bidCount=0, baCount=0;
   for(var i=0;i<employeeDetails.length;i++)
   {
      var curr=employeeDetails[i];
      if(curr.Department=="IT")
         itCount++;
      if(curr.Department=="Human Resources")
         hrCount++;
      if(curr.Department=="MD")
         mdCount++;
      if(curr.Department=="Sales")
         sCount++;
      if(curr.Office=="Seattle")
         seattleCount++;
      if(curr.Office=="India")
         indiaCount++;
      if(curr.JobTitle=="BI developer")
         bidCount++;
      if(curr.JobTitle=="SharePoint Practice Head")
         spphCount++;
      if(curr.JobTitle==".Net development lead")
         netCount++;
      if(curr.JobTitle=="Recruiting Expert")
         reCount++;
      if(curr.JobTitle=="Business analyst")
         baCount++;
   }
   document.getElementById("itFilter").innerHTML=document.getElementById("itFilter").innerHTML+"("+itCount+")";
   document.getElementById("hrFilter").innerHTML=document.getElementById("hrFilter").innerHTML+"("+hrCount+")";
   document.getElementById("mdFilter").innerHTML=document.getElementById("mdFilter").innerHTML+"("+mdCount+")";
   document.getElementById("sFilter").innerHTML=document.getElementById("sFilter").innerHTML+"("+sCount+")";
   document.getElementById("seattleFilter").innerHTML=document.getElementById("seattleFilter").innerHTML+"("+seattleCount+")";
   document.getElementById("indiaFilter").innerHTML=document.getElementById("indiaFilter").innerHTML+"("+indiaCount+")";
   document.getElementById("spphFilter").innerHTML=document.getElementById("spphFilter").innerHTML+"("+spphCount+")";
   document.getElementById("netFilter").innerHTML=document.getElementById("netFilter").innerHTML+"("+netCount+")";
   document.getElementById("reFilter").innerHTML=document.getElementById("reFilter").innerHTML+"("+reCount+")";
   document.getElementById("bidFilter").innerHTML=document.getElementById("bidFilter").innerHTML+"("+bidCount+")";
   document.getElementById("baFilter").innerHTML=document.getElementById("baFilter").innerHTML+"("+baCount+")";  
   document.createElement 
}
function renderEmployeeCards(){
   var parentdiv=document.getElementById("employeeDiv");
   for(var i=0;i<employeeDetails.length;i++)
   {
      var EmployeeCard = document.createElement('div');
      EmployeeCard.className="empCard";
      var pic=document.createElement("img"); pic.src=employeeDetails[i].ImgSrc;
      var name=document.createElement("p"); 
      name.innerHTML=employeeDetails[i].FirstName+" "+employeeDetails[i].LastName;
      var jobTitle=document.createElement("p");
      jobTitle.innerHTML=employeeDetails[i].JobTitle;
      var department=document.createElement("p");
      department.innerHTML=employeeDetails[i].Department+" Department";
      var detailsDiv=document.createElement("div");
      detailsDiv.className="detailsDiv";
      detailsDiv.appendChild(name);
      detailsDiv.appendChild(jobTitle);
      detailsDiv.appendChild(department);
      var icons=document.createElement("p"); 
      EmployeeCard.appendChild(pic);
      EmployeeCard.appendChild(detailsDiv);
      parentdiv.appendChild(EmployeeCard);
   }
}
