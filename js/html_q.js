console.log("HTML PAGE");
import { html_ques } from "./html_ques.js";


console.log("HTML questiuons === ",html_ques[0]['opt']);
console.log("HTML questiuons === ",html_ques[0]['opt'][1]);

let quiz_data = JSON.parse(localStorage.getItem("quiz_data"));
console.log("QUIZ DATA +++ ",quiz_data);
let username = quiz_data.username;
console.log("QUIZ DATA +++ ",username);


let banner_heading = document.getElementById("banner_heading");
banner_heading.style.fontSize = "40px";
banner_heading.innerHTML = "HTML Online Quiz";

let img = document.getElementById("banner_img");
img.src = "../img/html.png";

html_ques.map((ele,index)=>{
    console.log("index ===== ", ele, index++);

    
    let indexCapText = capitalize( convertNumberToEnglish(index) );
    
    console.log("indexCapText" , indexCapText);

    let ques_ele = `<div class="accordion-item">
    <h2 class="accordion-header" id="heading${indexCapText}">
    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${indexCapText}" aria-expanded="true" aria-controls="collapse${indexCapText}">
       # ${index} ${ele.ques}
    </button>
    </h2>
    <div id="collapse${indexCapText}" class="accordion-collapse collapse show" aria-labelledby="heading${indexCapText}" data-bs-parent="#accordionExample">
    <div class="accordion-body">
        <div class="form-check">
            <input class="form-check-input" type="radio" name="opt" id="exampleRadios2" value="">
            <label class="form-check-label" for="opt">${ele.opt[0]}</label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="opt" id="exampleRadios2" value="option2">
            <label class="form-check-label" for="opt">${ele.opt[1]}</label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="opt" id="exampleRadios2" value="option2">
            <label class="form-check-label" for="opt">${ele.opt[2]}</label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="opt" id="exampleRadios2" value="option2">
            <label class="form-check-label" for="opt">${ele.opt[3]}</label>
        </div>
        <div class="quest-btn-group">
            <button type="button" class="btn btn-success" id="show-btn-${ele.id}" >Show Answer</button>
            <button type="button" class="btn btn-primary ques-submit" id="check-btn-${ele.id}" onclick="ques_submit(${ele.ans})">Submit</button>
        </div>
    </div>
    </div>
    </div>`;

    // console.log(ques_ele);
    
    let ques_div = document.querySelector('#accordionExample');
    ques_div.insertAdjacentHTML('beforeend', ques_ele);
} );

// convertNumberToEnglish
function convertNumberToEnglish(number) {
    const ones = [
      "", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
      "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"
    ];
    const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
    const scales = ["", "thousand", "million", "billion", "trillion"];
  
    if (number === 0) {
      return "zero";
    }
  
    const sign = number < 0 ? "negative " : "";
    let englishNumber = "";
    let scaleIndex = 0;
  
    number = Math.abs(number);
  
    while (number > 0) {
      const hundreds = Math.floor(number % 1000 / 100);
      const onesAndTens = number % 100;
  
      if (hundreds !== 0) {
        englishNumber = ones[hundreds] + " hundred " + englishNumber;
      }
  
      if (onesAndTens < 20) {
        englishNumber = ones[onesAndTens] + " " + englishNumber;
      } else {
        englishNumber = tens[Math.floor(onesAndTens / 10)] + " " + ones[onesAndTens % 10] + " " + englishNumber;
      }
  
      number = Math.floor(number / 1000);
      scaleIndex++;
      if (number > 0) {
        englishNumber = scales[scaleIndex] + " " + englishNumber;
      }
    }
  
    return sign + englishNumber.trim();
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function ques_submit(actual_ans){

    actual_ans = actual_ans.value;
    let msg = document.querySelector('.accordion-body');
    console.log("actual_ans ====== ",actual_ans);
    
    let sel_ans = document.querySelector('input[name = "opt" ]:checked' );
    if ( sel_ans != null ){
        if( sel_ans === actual_ans ){
            msg.insertAdjacentHTML('afterend',`<div class="alert alert-success d-flex align-items-center" role="alert"><svg class="bi flex-shrink-0 me-2" role="img" aria-label="Sluccess:"><use xink:href="#check-circle-fill"/></svg><div>Correct Answer</div></div>`);
        }
        else{
            msg.insertAdjacentHTML('afterend',`<div class="alert alert-danger d-flex align-items-center" role="alert">
            <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
            <div>Wrong Answer</div>
            </div>`);
        }
    }
    else{
        msg.insertAdjacentHTML('afterend',`<div class="alert alert-danger d-flex align-items-center" role="alert">
            <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
            <div>Please Select atleast One Option</div>
            </div>`);
    }
   

  }



