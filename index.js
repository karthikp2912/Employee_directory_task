var employeeDetails= [], activeEmp ;
var selectedFilters = {
    officeFilter: [],
    jobtitleFilter: [],
    departmentFilter: [],
    activeLetter: '',
    activeFilter: '',
    searchKey: ''
};

window.onload = function () {
   this.initiate();
}

function initiate() {
   this.initateEmployees();
   this.generateFilters();
   this.generateLetters();
   this.generateDropdown();
   this.generateEmployeeCards(employeeDetails);
}

function toggleForm(){
   let visibility=document.getElementById("formPopup").style.display;
   if(visibility=="none" || visibility=="")
      document.getElementById("formPopup").style.display="block";
   else{
      document.getElementById("formPopup").style.display="none";
      document.getElementById("form").reset();
      clearBorderError();
   }
}

function clearContents(){
   document.getElementById("searchKeyWord").value="";
   selectedFilters.searchKey="";
   filterEmployees();
}

function clearBorderError(){
   Object.keys(employeeDetails[0]).forEach(element => {
      if(element!="id")
         document.getElementById(element).classList.remove('border-error');
  });
}

function initateEmployees() {
   employeeDetailsArray.forEach(element => {
      employeeDetails.push(new Employee(element));
   });
   activeEmp=new Employee({});
}

function generateFilters() {
   this.generateLeftFilters('departmentList', 'department');
   this.generateLeftFilters('officesList', 'office');
   this.generateLeftFilters('jobTitleList', 'jobTitle');
}

function generateLeftFilters(eleId, property) {
   let filterList = document.getElementById(eleId);
   let text = "";
   let array = employeeDetails.map(emp => emp[property]).filter((v, i, a) => a.indexOf(v) == i);
   array.forEach(ele => {
       let count = employeeDetails.filter(_ => _[property] == ele).length;
       text += `<input class="${property}" name="${property}" value="${ele}" type="checkbox" id="${ele}">
     <label value="${ele}" name="${property}" for="${ele}">
        ${ele}(${count})
     </label>`
   });
   filterList.innerHTML = text;
}

function generateLetters() {
   let letters = document.getElementById("lettersContainer");
   let temp = "";
   for (let i = 65; i <= 90; i++) {
       let text = String.fromCharCode(i);
       temp = temp + `<input name="lettersName" class="letters" value=${text} type="radio" id=${text}><label value=${text} for=${text}>${text}</label>`;
   }
   letters.innerHTML += temp;
}

function generateDropdown() {
   let filterContainer = document.getElementById("filterBy");
   let temp = "";
   Object.keys(employeeDetails[0]).forEach(element => {
      if(element!="id")
       temp += `<option value="${element}">${element}</option>`
   });
   filterContainer.innerHTML += temp;
}

function generateEmployeeCards(employees) {
   let empEle = document.getElementById("employeeContainer");
   let temp = "";
   if (!!empEle && !!employees) {
      employees.forEach(employee => {
           temp += `<div class="emp-card" id=${employee.email} onclick="displayEmployeeDetails(${employee.id} )">
                   <img src=${profilePicture} />
                   <div class="detailsDiv">
                       <p>${employee.firstName} ${employee.lastName}</p>
                       <p>${employee.jobTitle}</p>
                       <p>${employee.department}</p>
                       <p>
                          <i class="fa-solid fa-square-phone"></i>
                          <i class="fa-solid fa-envelope"></i>
                          <i class="fa-solid fa-comment"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-heart"></i>
                       </p>
                   </div>
                </div> `;
       });
       empEle.innerHTML = temp;
   }
}

function validateForm() {
   clearBorderError();
   let isValid = true;
   if (!!this.activeEmp && !!this.activeEmp.id) {
      if (!this.activeEmp.firstName || !lettersRegx.test(this.activeEmp.firstName)) {
         document.getElementById('firstName').classList.add('border-error');
         isValid = false;
      }
      if (!this.activeEmp.lastName || !lettersRegx.test(this.activeEmp.lastName)) {
         document.getElementById('lastName').classList.add('border-error');
         isValid = false;
      }
      if (!this.activeEmp.email|| !emailRegx.test(this.activeEmp.email)) {
         document.getElementById('email').classList.add('border-error');
         isValid = false;
      }
      if (!this.activeEmp.jobTitle || !lettersRegx.test(this.activeEmp.jobTitle)) {
         document.getElementById('jobTitle').classList.add('border-error');
         isValid = false;
      }
      if (!this.activeEmp.office|| !lettersRegx.test(this.activeEmp.office)) {
         document.getElementById('office').classList.add('border-error')
         isValid = false;
      }
      if (!this.activeEmp.department || !lettersRegx.test(this.activeEmp.department)) {
         document.getElementById('department').classList.add('border-error')
         isValid = false;
      }
      if (!this.activeEmp.phoneNumber || !numberRegx.test(this.activeEmp.phoneNumber)) {
         document.getElementById('phoneNumber').classList.add('border-error');
         isValid = false;
      }
      if (!this.activeEmp.skypeId || !skypeRegx.test(this.activeEmp.skypeId)) {
         document.getElementById('skypeId').classList.add('border-error');
         isValid = false;
      }    
   }
   return isValid;
}

function saveEmpData() {
   if (this.validateForm()) {
      if (!!this.activeEmp && !!this.activeEmp.id) {
         let index = this.employeeDetails.findIndex(_ => _.id == this.activeEmp.id);
         if (index > -1){
            employeeDetails[index] = this.activeEmp;
         }
         else {
            employeeDetails.push(this.activeEmp);
         }
      } 
      this.generateFilters();
      this.generateEmployeeCards(employeeDetails);
      toggleForm();
      activeEmp=new Employee({});
   }
}

function displayEmployeeDetails(empid){
   let emp=employeeDetails.find(_=>_.id==empid);
   activeEmp=emp;
   Object.keys(employeeDetails[0]).forEach(element => {
      if(element!="id")
         document.getElementById(element).value= emp[element];
   });
   toggleForm();
}

function onChange(type, value) {
   this.activeEmp[type] = value;
}

function filterEmployees() {
   let filteredEmps = employeeDetails.filter(employee => 
       !!selectedFilters
           && (!!selectedFilters.officeFilter && !!selectedFilters.officeFilter.length ? selectedFilters.officeFilter.findIndex(_ => _.value == employee.office) > -1 : true)
           && (!!selectedFilters.jobtitleFilter && !!selectedFilters.jobtitleFilter.length ? selectedFilters.jobtitleFilter.findIndex(_ => _.value == employee.jobTitle) > -1 : true)
           && (!!selectedFilters.departmentFilter && !!selectedFilters.departmentFilter.length ? selectedFilters.departmentFilter.findIndex(_ => _.value == employee.department) > -1 : true)
           && (!!selectedFilters.activeLetter ? (!!employee.firstName && employee.firstName[0] == selectedFilters.activeLetter) : true)
           && (!!selectedFilters.activeFilter && !!selectedFilters.searchKey ? (employee[selectedFilters.activeFilter].includes(selectedFilters.searchKey)) : true)
   );
   generateEmployeeCards(filteredEmps);
}

function updateLeftFilters(){
   selectedFilters.departmentFilter=Array.from(document.querySelectorAll('#departmentList input[type="checkbox"]:checked'));
   selectedFilters.officeFilter= Array.from(document.querySelectorAll('#officesList input[type="checkbox"]:checked'));
   selectedFilters.jobtitleFilter= Array.from(document.querySelectorAll('#jobTitleList input[type="checkbox"]:checked'));
}

function updateSearchFilters(){
   selectedFilters.activeLetter=(!!document.querySelector('input[type="radio"]:checked'))? document.querySelector('input[type="radio"]:checked').value : "";
   selectedFilters.activeFilter = document.getElementById('filterBy').options[filterBy.selectedIndex].value;
   selectedFilters.searchKey=document.getElementById("searchKeyWord").value;
}
