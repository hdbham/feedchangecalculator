const form = document.querySelector('#login-form')
const control = document.querySelector('#control')
const oldAmount = document.querySelector('#old-amount')
const newAmount = document.querySelector('#new-amount')
const timesFed = document.querySelector('#times-fed')
const results = document.querySelector('#results')
const printButton = document.querySelector('#print-button')

function printDiv(divId, title){
  let mywindow;
  mywindow = window.open('', 'PRINT', 'fullscreen=yes');
  
  mywindow.document.write(`<html><head><title>${title}</title>`);
  mywindow.document.write('</head><body >');
  mywindow.document.write(document.getElementById(divId).innerHTML);
  mywindow.document.write('</body></html>');
  mywindow.document.write(`<script>print()</script>`)
  mywindow.document.print()
  mywindow.close();
  return true;
}

let subject = "subject";

function emaildiv(div, email ){
  control.insertAdjacentHTML("beforeend",
  `<a href="mailto:${email}subject=${subject}&body=${body}">Send email</a>`)

}

function convertToFraction (decimal) {
  // Round to the nearest 1/8th
  var rounded = (Math.ceil(decimal * 8) / 8).toFixed(8);
  var newVal = new Fraction(rounded).toFraction(true);
  return newVal;
}

function generate(newAmount, oldAmount) {
  
  if (oldAmount > newAmount) {
    
    console.log(`
    Nutrient Density Comparison
    New Food More Nutrient Dense
    Old : New
    ${oldAmount / newAmount} : 1 `)
  } else {
    console.log(`
    Nutrient Density Comparison
    Old Food More Nutrient Dense
    New : Old
    ${newAmount / oldAmount} : 1 `)
  }
  
  
  results.insertAdjacentHTML("beforeend", `
  <p>Times fed: ${timesFed.value}</p>
  
  <p>PER FEEDING <p>
  <p>Total current: ${oldAmount} cups<p>
  
  <p>--- First 3 days --- <p>

  <p> Old Food: ${convertToFraction(oldAmount * .75)} cups </p>
  <p> New Food: ${convertToFraction(newAmount * .25)} cups </p>
  <p> Total: ${convertToFraction(oldAmount * .75 + newAmount *.25)} cups </p>
  
  <p> --- Days 4 - 7 --- </p>
<p> Old Food: ${convertToFraction(oldAmount * .50)} cups </p>
<p> New Food: ${convertToFraction(newAmount * .50)} cups </p>
<p> Total: ${convertToFraction(oldAmount * .5 + newAmount *.5)} cups </p>

<p> --- Days 8 - 10 --- </p>
<p> Old Food: ${convertToFraction(oldAmount * .25)} cups </p>
<p> New Food: ${convertToFraction(newAmount * .75)} cups </p>
<p> Total: ${convertToFraction(oldAmount * .25 + newAmount *.75)} cups </p>

<p> --- Day 11 --- </p>
<p> New Food: ${convertToFraction(newAmount)} cups </p>`)
}

form.addEventListener("submit", (event) => {
  event.preventDefault()
  results.innerHTML = "";
  generate(newAmount.value / timesFed.value, oldAmount.value / timesFed.value)
})


printButton.addEventListener("click", () => {
  printDiv('results', 'feedingguide');
})

emailButton.addEventListener("click", () => {
  emailDiv(results);
})


