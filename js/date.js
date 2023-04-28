// myApp.controller('dateCtrl', ['$scope', '$state', 'ajax', 'R1Util', '$filter',
//   function ($scope, $state, ajax, R1Util, $filter) {

//     var vm = this;
//     vm.entity = {};

//     vm.entity.from_date = new Date();
    
//     $scope.calculateAge = function () {
//       //aaj chi date
//       //input box madhye date defined(ahe)
//       if (vm.entity.from_date != undefined) {
//         var todayDate = new Date();
//         var ageyear = todayDate.getFullYear() -vm.entity.from_date.getFullYear();
//         //aaj chya month pasun birth date minus
//         var agemonth = todayDate.getMonth()-vm.entity.from_date.getMonth();
//         var ageday = todayDate.getDate()-vm.entity.from_date.getDate();
//         // jar agemonth zero kivha tyapeksha lahan asel tar age month madhe plus 12 karayche
//         if (agemonth <= 0) {
//           ageyear--;
//           agemonth = (12 + agemonth);

//         }
//         //    jar ajchi date birthdate peksha lahan asel tar 
//         //  ageday madhe 30 divas add karayche

//         if (todayDate < vm.entity.from_date) {
//           agemonth--;
//           ageday = 30 + ageday;
//         }
//         //   jar agemonth 12 asel tar  age yearmadhe plus 1 karayche
//         if (agemonth == 12) {
//           ageyear = ageyear + 1;
//           agemonth = 0;
//         }
//         vm.entity.age = "Age in Year:" + ageyear + ',' + 'Month:' + agemonth + ',' + 'Day:' + ageday 
//         //   Math.floor((todayDate - vm.entity.from_date) / (1000*60*60*24));
//         //   alert("Age in Year:" + ageyear + ',' + 'Month:' + agemonth + ',' + 'Day:' + ageday);

//       }

//     }
  
 







//     $scope.calculateAge1 = function () {
//       //aaj chi date
//       //input box madhye date defined(ahe)
//       if (vm.entity.birthdate != undefined) {
//         var todayDate = vm.entity.to_date1;
//         var ageyear = todayDate.getFullYear() - vm.entity.birthdate.getFullYear();
//         //aaj chya month pasun birth date minus
//         var agemonth = todayDate.getMonth() - vm.entity.birthdate.getMonth();
//         var ageday = todayDate.getDate() - vm.entity.birthdate.getDate();
//         // jar agemonth zero kivha tyapeksha lahan asel tar age month madhe plus 12 karayche
//         if (agemonth <= 0) {
//           ageyear--;
//           agemonth = (12 + agemonth);

//         }
//         //    jar ajchi date birthdate peksha lahan asel tar 
//         //  ageday madhe 30 divas add karayche

//         if (todayDate < vm.entity.birthdate) {
//           agemonth--;
//           ageday = 30 + ageday;
//         }
//         //   jar agemonth 12 asel tar age yearmadhe plus 1 karayche
//         if (agemonth == 12) {
//           ageyear = ageyear + 1;
//           agemonth = 0;
//         }
//         vm.entity.age1 = "Age in Year:" + ageyear + ',' + 'Month:' + agemonth + ',' + 'Day:' + ageday
//         //   Math.floor((todayDate - vm.entity.from_date) / (1000*60*60*24));
//         //   alert("Age in Year:" + ageyear + ',' + 'Month:' + agemonth + ',' + 'Day:' + ageday);

//       }

//     }




// $scope.calculateDays =function(){


// if(vm.entity.birthdate !=undefined){
//   var today=vm.entity.today = new Date ();
//    var bday=vm.entity.birthdate;
//   var age = today.getFullYear() - bday.getFullYear()+1;

//   var upcomingBday = new Date(today.getFullYear(), bday.getMonth(), bday.getDate());
// //
//   if(today > upcomingBday) {
//     upcomingBday.setFullYear(today.getFullYear() + 1);
//   }

//   var one_day = 24 * 60 * 60 * 1000;

//   var daysleft= Math.ceil((upcomingBday.getTime() - today.getTime()) / (one_day));
//   if (daysleft && age < 200) {

//    vm.entity.daysleft ="In" + daysleft +"day(s)"+","+"you will be" +age+"!"  ;
//   } 
// }

// }



// // Set the date we're counting down to
// var countDownDate = new Date("April 10, 2023 15:37:25").getTime();

// // Update the count down every 1 second
// $scope.show=function() {

//   // Get today's date and time
//   var now = new Date().getTime();
    
//   // Find the distance between now and the count down date
//   var distance = countDownDate - now;
    
//   // Time calculations for days, hours, minutes and seconds
//   var days = Math.floor(distance / (1000 * 60 * 60 * 24));
//   var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//   var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//   var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
//   // Output the result in an element with id="demo"
//   vm.entity.birth = days + "d " + hours + "h"
//   + minutes + "m " + seconds + "s ";
    
//   // If the count down is over, write some text 
//   if (distance < 0) {
//     clearInterval(x);
//     vm.entity.birth= "EXPIRED";
//   }
// }






// // $scope.countDays=function(){
 
// //   vm.entity.f_date = new Date("10/04/2023");
// //   vm.entity.t_date =new Date("15/04/2023");

// //   // var dayDif = (datetwo - dateone)

// //   // vm.entity.calcDays=(vm.entity.f_date-vm.entity.f_date);

// //     //calculate days difference by dividing total milliseconds in a day
    
      
      
      
// //       var time =  vm.entity.t_date.getTime() - vm.entity.f_date.getTime();  

// //       var days = time/ (1000 * 60 * 60 * 24);
  
    
     
// //       // vm.entity.age3="Number of days between date:" + vm.entity.f_date+ ',' + 'and'+ vm.entity.t_date  
// //       //                 + "are:"+days_difference + " days";


// //                       // console.log("Total number of days between dates  <br>"
// //                       // + vm.entity.f_date + "<br> and <br>" 
// //                       // + vm.entity.t_date + " is: <br> " 
// //                       // + Difference_In_Days);

// //        vm.entity.age3 = "Total number of days between dates"+vm.entity.f_date+','+vm.entity.t_date+','+days;
                    
// //                       // document.write("Number of days between dates <br>" +   
// //                       // date1 + " and <br>" + date2 + " are: <br>"   
// //                       // + days_difference + " days");  

// //                       // vm.entity.age = "Age in Year:" + ageyear + ',' + 'Month:' + agemonth + ',' + 'Day:' + ageday


// // }

// // Define the two dates
// vm.entity.startDate = new Date("2023-04-03");
// vm.entity.endDate = new Date();
// $scope.countDays=function(){
// // Calculate the number of milliseconds between the two dates
// var time = 1000 * 60 * 60 * 24;
// var timeDifference = vm.entity.endDate.getTime() - vm.entity.startDate.getTime();

// // Calculate the number of days between the two dates
// var daysDifference = Math.floor(timeDifference / time);

// // Output the result
// vm.entity.calcDays="The number of days between the two dates is: " + daysDifference;

// }







// // // Define the year for which you want to calculate the weeks
// // var year = 2023;

// // // Create an array to store the start and end date for each week
// // var weeks = [];

// // // Create a new date object for January 1 of the given year
// // var date = new Date(year, 0, 1);

// // // Find the first Monday of the year
// // while (date.getDay() !== 1) {
// //   date.setDate(date.getDate() + 1);
// // }

// // // Loop through the weeks of the year and add the start and end date for each week to the array
// // for (var i = 1; i <= 52; i++) {
// //   var startDate = new Date(date.getTime());
// //   var endDate = new Date(date.getTime() + 6 * 24 * 60 * 60 * 1000);

// //   weeks.push({
// //     weekNumber: i,
// //     startDate: startDate,
// //     endDate: endDate
// //   });

// //   // Increment the date by one week
// //   date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);
// // }

// // // Output the array of weeks
// // console.log(weeks);

// // $scope.weeknumber=function(){
// //   vm.entity.currentd = new Date();

// //   vm.entity.startd = new Date(vm.entity.currentd.getFullYear(), 0, 1);
// // 	var days = Math.floor((vm.entity.currentd  - vm.entity.startd) /
// // 		(24 * 60 * 60 * 1000));
// // 		var weekNumber = Math.ceil(days / 7);
	


// // 	// Display the calculated result	
// // 	vm.entity.calcweek="Week number of"+ vm.entity.currentd +
// // 		" is : " + weekNumber;
// // }
	

//   // $scope.getWeekNumber = function() {

//   //           var oneJan = 
//   //               new Date(this.getFullYear(), 0, 1);

//   //           // calculating number of days 
//   //         //in given year before given date
  
//   //           var numberOfDays =Math.floor((todaz - oneJan) / (24 * 60 * 60 * 1000));
            
//   //           // adding 1 since this.getDay()
//   //           //returns value starting from 0
//   //           vm.entity.calcweek=Math.ceil((this.getDay() + 1 + numberOfDays) / 7);
//   //       }
  
//         // function printWeekNumber() {
//         //     var dateInput = 
//         //         document.getElementById("dateInput").value;
//         //     var date = new Date(dateInput);
//         //     var result = date.getWeekNumber();
//         //     document.getElementById("result").innerHTML = 
//         //       "Week Numbers is " + result;
//         // }
//         vm.entity.todaydate = new Date();
//    $scope.WeekNumber =function(){
//       //define a date object variable that will take the current system date  
      
  
//       //find the year of the current date  

//       // vm.entity.startd =  new Date(vm.entity.startd.getFullYear(), 0, 1);                                       
  
//        // calculating number of days in given year before a given date   
//        var numberOfDays =  Math.floor((vm.entity.todaydate -  vm.entity.startd)/(24 * 60 * 60 * 1000));   
    
//        // adding 1 since to current date and returns value starting from 0   
//        var result = Math.ceil(( vm.entity.todaydate.getDay() + 1 + numberOfDays) / 7);

//        //display the calculated result        
//        vm.entity.calcweek=("Week Numbers of  (" + vm.entity.todaydate +   
//        ',' + result); 
//       }

//  }])
    




