'use strict';

(function(global){
    var digitElements = document.querySelectorAll('.digit');
    var operationsElements = document.querySelectorAll('.action');
    var input = document.querySelector('#screen');
    var operand1 = null, operation;
    var resetInput = false;
    
    for(var i=0; i<digitElements.length; i++){
        digitElements[i].addEventListener('click', digitAddedEvent);
    }
    
    for(var i=0; i<operationsElements.length; i++){
        operationsElements[i].addEventListener('click', actionEvent);
    }
    
    
    
    function digitAddedEvent(event){
        inputUpdate(event.target.innerHTML);
    }
    
    function actionEvent(event){
        var action = event.target.innerHTML;
        console.log(action);
        if(action === 'C'){
            input.value = '0';
            operand1 = null;
            operation = null;
            return;
        }
        
        if(action === '&lt;&lt;'){
            removeLastInputDigit();
            return;
        }
        
        resetInput = true;
        
        if(operand1 === null){
            operand1 = input.value;
            operation = action;
            return;
        }
        
        if(operation != null){
            calculate(operand1, input.value, operation);
            operation = action;
            operand1 = input.value;
        }
        
        if(action === '='){
            operand1 = null;
            operation = null;
        }
    }
    
    function inputUpdate(value){
        if(resetInput){
            resetInput = false;
            input.value = '';
        }
        if(validateDigitInput(value)){
            input.value += value;    
        }
    }
    
    function validateDigitInput(value){
        if(value === '.'){
            if(input.value.indexOf(value) === -1){
                return true;
            }
            return false;
        }
        
        if(value === '0'){
            if(input.value.indexOf(value) != 0 || input.value.indexOf('.') === 1){
                return true;
            }
            return false;
        }
        
        if(input.value === '0'){
            input.value = '';
        }
        return true;
    }
    
    function calculate(value1, value2, operation){
        var result = eval(value1 + operation + value2);
        input.value = result;
    }
    
    function removeLastInputDigit(){
         if(input.value != '0' 
            && input.value.length > 0){
                
                input.value = input.value.slice(0, -1);
            }
            if(input.value.length === 0){
                input.value = 0;
            }
    }
    
})(window)