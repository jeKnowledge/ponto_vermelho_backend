var back = document.getElementById("back");
var next = document.getElementById("next");
var sub = document.getElementById("sub");

var op0 = document.getElementById("op0");
var op1 = document.getElementById("op1");
var op2 = document.getElementById("op2");

var inputs = document.getElementsByTagName('input');

var kind = document.querySelector(".kind-container");
var id = document.querySelector(".id-container");


function submition() {
  if (op0.checked == false && op1.checked == false && op2.checked == false) {
    alert("Por favor escolha uma opção.");
    return false;
  }

  //Carrega a página de identificação do benificiário
  //caso não seja escolhida a opção de requisição interna
  if (op1.checked == true || op2.checked == true) {
    kind.style.display = "none";
    id.style.display = "block";
    sub.style.display = "block";
    next.style.display = "none";
  }

  //Ativar o botão de back quando se passa para a página seguinte
  if (kind.style.display == "none") {
    back.style.opacity = 1;
    back.style.cursor = "pointer";
    back.onmouseover = function() {
      back.style.opacity = 0.6;
    }
    back.onmouseout = function() {
      back.style.opacity = 1;
    }
  }

  //Voltar atrás
  if (back.style.opacity == 1) {
    back.onclick = function() {
      id.style.display = "none";
      kind.style.display = "block";
      sub.style.display="none";
      next.style.display="block";
      //oculta o botão back
      back.style.cursor = "default";
      back.style.opacity = 0.3;
      back.onmouseover = function() {
        back.style.opacity = 0.3;
      }
      back.onmouseout = function() {
        back.style.opacity = 0.3;
      }
    }
  }
}
var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n)
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false:
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}
