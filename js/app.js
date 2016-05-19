"use strict";

var $screen = $('#screen');
var error = false;
var oper = false;
// var numbers = [48,49,50,51,52,53,54,55,56,57,96,97,98,99,100,101,102,103,104,105];
// var operators = [106,107,109,111];
// var special = [13,27];

$('.buttons').on('click', 'span:not("#clear")', function(event){
   displayInput(event);
});

// $(document).on('keydown', function(event){
//    console.log(String.fromCharCode(event.which));
//    console.log("You accessed a key!");
//    console.log(event);
// });

var displayInput = function(event){
   if (!error){
      var $target = $(event.target);
      if($target.is('#equals'))
      {
         $screen.text(evalCalc());
      }
      else if(haveRoom() && extraOperator($target)){
         if ($target.is('.operator')){
            oper = true;
         }
         $screen.append($target.text());
      }
   }
};

var extraOperator = function(temp){
   console.log(temp);
   if (temp.hasClass("operator") && oper){
      return false;
   }
   else{
      return true;
   }
}

var haveRoom = function(){
   return $screen.text().length < 16;
}

$('#clear').click(function(){
   clear();
});


var evalCalc = function(){
   var result = '';
   try{
      result = eval($screen.text());
   }
   catch(err){
      result = setError();
   }
   if (result === "Infinity" || result === "-Infinity"){
      result = setError();
   }
   oper = false;
   return result;
};

var clear = function(){
   $screen.text('');
   error = false;
   oper = false;
};

var setError = function(){
   error = true;
   return "ERROR";
}
