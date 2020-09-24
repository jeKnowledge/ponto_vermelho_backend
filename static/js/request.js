var back = document.getElementById("back");
var next = document.getElementById("next");
var sub = document.getElementById("sub");

var op0 = document.getElementById("op0");
var op1 = document.getElementById("op1");
var op2 = document.getElementById("op2");

var inputs = document.getElementsByTagName('input');

var kind = document.querySelector(".kind-container");
var id = document.querySelector(".id-container");


//Se for escolhida a primeira opção transforma a seta next no botão de submissão
function option(){
  sub.style.display = "block";
  next.style.display = "none";
  //Se for escolhida a 1ª opção ignora os restantes inputs
  for (var i = 0; i < inputs.length; i++) {
      inputs[i].required = false;
  }
}
//Se for escolhida uma das outras volta a colocar a seta next
function option2(){
  sub.style.display = "none";
  next.style.display = "block";
}

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
