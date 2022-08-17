class Validator{

    constructor(){
       this.validations = [
            'data-campo-obrigatorio',
           'data-minimo-caracter', 
           'data-validacao-email',
           'data-igual',              
           
       ]
    }

   
    validate(form){

       let currentValidations = document.querySelectorAll('form .error-validation')

       if(currentValidations.length > 0){
           this.cleanValidations(currentValidations);
       }

       let inputs = form.getElementsByTagName('input');

       //tranformando HTMLCollection em array
       let inputsArray = [...inputs];

       inputsArray.forEach(function(input) {

           for(let i = 0; this.validations.length > i; i++){

               if(input.getAttribute(this.validations[i]) != null){

                   //limpando a string para virar um metodo
                   let method = this.validations[i].replace('data-', '').replace('-', '');


                   let value = input.getAttribute(this.validations[i]);

                   this[method](input,value);
               }
           }
       
       }, this);

   }

   //verifica se o input tem um numero minimo de caracteres
   minimocaracter(input, minValue){

       let inputLength = input.value.length;

       let errorMenssage = 'O campo precisa de ter pelo menos ' + minValue + ' caracteres'

       if(inputLength < minValue){
           this.exibirmensagem(input, errorMenssage)
       }

   }

   //valida emails
   validacaoemail(input){

    let re = /\S+@\S+\.\S+/;

    let email = input.value;

    let errorMessage = 'E-mail inválido';

    if(!re.test(email)){
        this.exibirmensagem(input, errorMessage);
    }
   }

   //verifica se o input é requerido
   campoobrigatorio(input){

    let inputValue  = input.value;

    if(inputValue === ''){
        let errorMenssage = 'Campo obrigatório';

        this.exibirmensagem(input, errorMenssage);
    }

   }

   igual(input, inputName){

    let inpuToCompare = document.getElementsByName(inputName)[0];

    let inputValue  = input.value;

    let errorMenssage = 'As senhas digitadas não estão iguais';

    if(inputValue != inpuToCompare.value){
        this.exibirmensagem(input, errorMenssage);
    }

   }

   //metodo para imprimir mensagem de erro na tela
   exibirmensagem(input, mensagem){

    //quantidade de erros
    let erro = input.parentNode.querySelector('.error-validation');

       if(erro === null){

        let template = document.querySelector('.error-validation').cloneNode(true);

       template.textContent = mensagem;

       let inputParent = input.parentNode;

       template.classList.remove('template');

       inputParent.appendChild(template)
       }
   }

   //limpando as validações da tela
   cleanValidations(validations){
       validations.forEach(el => el.remove());

   }
}

let form = document.getElementById("register-form");
let submit = document.getElementById("btn-submit");
let validator = new Validator();

// evento que dispara as validações
submit.addEventListener('click', function(e) {
   
   
   e.preventDefault();


   validator.validate(form);
});