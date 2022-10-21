class Employee {
   constructor(args) {
      args = !!args ? args : {};
      this.id = args && args.id ?args.id : this.generateID();
      this.firstName = args.firstName;
      this.lastName = args.lastName;
      this.office = args.office;
      this.jobTitle = args.jobTitle;
      this.department = args.department;
      this.phoneNumber = args.phoneNumber;
      this.skypeId = args.skypeId;
      this.email = args.email;
   }
   generateID() {
      return employeeDetails.length + 1;
   }
}
const profilePicture ="images/profile-pic.jpg";
const skypeRegx=/^[\w]+$/;
const lettersRegx=/^[A-Za-z\s]+$/;
const numberRegx=/^[6-9]\d{9}$/;
const emailRegx=/^([a-zA-Z0-9\.]+)@([a-zA-z]+).([a-z]+)$/;
 const employeeDetailsArray =[
   { firstName:"Karthik", lastName:"varma", email:"karthik@technovert.com",jobTitle:"BI developer",office:"Seattle",department:"Human Resources",phoneNumber:8978803288,skypeId:"karthik2912" },
   {firstName:"Ashok", lastName:"Kumar", email:"ashok@technovert.com",jobTitle:"UX Designer",office:"Seattle",department:"IT",phoneNumber:6735673768,skypeId:"ashok234" },
   { firstName:"Ravi", lastName:"Kiran", email:"ravi@technovert.com",jobTitle:"Business Analyst",office:"India",department:"MD",phoneNumber:9876345448,skypeId:"ravi123" },
   { firstName:"Mahesh", lastName:"Reddy", email:"mahesh@technovert.com",jobTitle:"Web Developer",office:"India",department:"IT",phoneNumber:9876945448,skypeId:"mahesh9687" },
   { firstName:"Bhaskar", lastName:"Raj", email:"bhaskar@technovert.com",jobTitle:"Web Developer",office:"India",department:"IT",phoneNumber:9874567538,skypeId:"raj233" },
   { firstName:"Ajay", lastName:"Ravada", email:"ajay@technovert.com",jobTitle:"Business Analyst",office:"India",department:"MD",phoneNumber:9836522448,skypeId:"ajay843" },
   { firstName:"Shiva", lastName:"Prasad", email:"shiva@technovert.com",jobTitle:"UX Designer",office:"India",department:"IT",phoneNumber:9862314555,skypeId:"shiva123" }
]
