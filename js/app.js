const buttonpressed=document.querySelectorAll("#btn");
buttonpressed.forEach(button=>button.addEventListener('click',chosenButton));
window.addEventListener('keydown',chosenButton);
let display_screen=document.getElementById("inputField");
console.log(display_screen);
let inputStr='';

add=(a,b)=>{

    if(a.includes(".")|| b.includes(".")){
        return (parseFloat(b)+parseFloat(a)).toString();
    }
    return (parseInt(b)+parseInt(a)).toString();
}
multiply=(a,b)=>{
    if(a.includes(".")|| b.includes(".")){
        return (parseFloat(b)*parseFloat(a)).toString();
    }
    return (parseInt(b)*parseInt(a)).toString();
}
subtract=(a,b)=>{

    if(a.includes(".")|| b.includes(".")){
        return (parseFloat(b)-parseFloat(a)).toString();
    }
    return parseInt(b)-parseInt(a);
}
divide=(a,b)=>{

    if(a.includes(".")|| b.includes(".")){
        return (parseFloat(b)/parseFloat(a)).toString();
    }
    return (parseInt(b)/parseInt(a)).toString();
}
mod=(a,b)=>{
    return (parseInt(b)%parseInt(a)).toString();
}
let checkdeci=false;
/**Reading input on the display as String */

function chosenButton(e){
    let buttonChoice="";
    if(e.type=='keydown'){
        buttonChoice=e.key;
        console.log(e.key);
    }
    else{
        buttonChoice=e.path[0].innerHTML;
        console.log(buttonChoice);
    }
    switch(buttonChoice){
        case '0':
            if(inputStr.length>0){
                inputStr+=0;
                display_screen.value=inputStr;
            }
            
            break;
        case '1':
            inputStr+=1;
            display_screen.value=inputStr;
            break;
        case '2':
            inputStr+=2;
            display_screen.value=inputStr;
            break;
        case '3':
            inputStr+=3;
            display_screen.value=inputStr;
            break;
        case '4':
            inputStr+=4;
            display_screen.value=inputStr;
            break;
        case '5':
            inputStr+=5;
            display_screen.value=inputStr;
            break;
        case '6':
            inputStr+=6;
            display_screen.value=inputStr;
            break;
        case '7':
            inputStr+=7;
            display_screen.value=inputStr;
            break;
        case '8':
            inputStr+=8;
            display_screen.value=inputStr;
            break;
        case '9':
            inputStr+=9;
            display_screen.value=inputStr;
            break;
        case "AC":
            display_screen.value='';
            inputStr=''
            break;
        case "C": case "Backspace":
            inputStr=inputStr.slice(0,inputStr.length-1);
            display_screen.value=inputStr;
            break;
        case 'X' :case "*":
            if(inputStr.length>0){
                let check=check_previous_operator(inputStr[inputStr.length-1]);
                console.log(check)
                if(check==true){
                    inputStr=inputStr.substring(0,inputStr.length-1)+"*";
                }
                else{
                    inputStr+='*';
                }
                display_screen.value=inputStr;
            }
            break;
        case '/':
            if(inputStr.length>0){
                let check=check_previous_operator(inputStr[inputStr.length-1]);
                console.log(check)
                if(check==true){
                    inputStr=inputStr.substring(0,inputStr.length-1)+"/";
                }
                else{
                    inputStr+='/';
                }
                display_screen.value=inputStr;
            }
            break;
        case '+':
            if(inputStr.length>0){
                checkdeci=false;
                let check=check_previous_operator(inputStr[inputStr.length-1]);
                console.log(check)
                if(check==true){
                    inputStr=inputStr.substring(0,inputStr.length-1)+"+";
                }
                else{
                    inputStr+='+';
                }
                display_screen.value=inputStr;
            }
            break;
        case '-':
            if(inputStr.length>0){
                checkdeci=false;
                let check=check_previous_operator(inputStr[inputStr.length-1]);
                console.log(check)
                if(check==true){
                    inputStr=inputStr.substring(0,inputStr.length-1)+"-";
                }
                else{
                    inputStr+='-';
                }
                display_screen.value=inputStr;
            }
        break;
        case ".":
            if(inputStr.length>0){
                let check=check_previous_operator(inputStr[inputStr.length-1]);
                let decimalcheck=checkdecimal(inputStr);
                if(!decimalcheck && !check){
                    console.log(decimalcheck);
                    inputStr+=".";
                }
                display_screen.value=inputStr;
            }
            break;
        case "%":
            if(inputStr.length>0){
                checkdeci=false;
                let check=check_previous_operator(inputStr[inputStr.length-1]);
                let decimalcheck=checkdecimal(inputStr);
                if(!decimalcheck){
                    if(check){
                        inputStr=inputStr.substring(0,inputStr.length-1)+"%";
                    }
                    else{
                        inputStr+="%";
                    }
                }
                display_screen.value=inputStr;
            }
            break;
        case "=": case "Enter":
            if(inputStr.length>0){
              let postfix_expression=calculateExpression(inputStr);
              let result=compute(postfix_expression);
              display_screen.value="";
              display_screen.value=result;
              inputStr='';
            }
        break;

    }  
}

/**Check if pervious character is operator or not */
function check_previous_operator(thischar){
    console.log(thischar);
    return (thischar==="*" || thischar==="/" || thischar==="+" || thischar==="-"|| thischar==="%")?true:false;
}
/**Check if expression contains decimal or not*/
function checkdecimal(inputstr){
    checkdeci=false;

    for(let i=0;i<inputstr.length;i++){
        if(inputStr[i]==="."){
            checkdeci= true;
        }
        if(isOperator(inputStr[i])){
            checkdeci=false;
        }
    }
    return checkdeci;
}

calculateExpression=(inputStr)=>{
    let postfixString='';
    let postfixExpression=[];
    postfixExpression.push("#");
    for (let i=0;i<inputStr.length;i++){
        if(isOperand(inputStr[i])){
            postfixString+=inputStr[i];
        }
        else if(isOperator(inputStr[i])){
            postfixString+=" ";
            if(inputStr[i]==="*"){
                postfixExpression.push(" *");
                console.log("1: "+postfixExpression);
            }
            else if (inputStr[i]==="/"){
                postfixExpression.push(" / ");
                console.log("2: "+postfixExpression);
            }

           else if(checkprecidence(inputStr[i])>checkprecidence(postfixExpression[postfixExpression.length-1])){
               console.log(checkprecidence(postfixExpression[postfixExpression.length-1]));
                if(i!=inputStr.length-1){
                    postfixExpression.push(" "+inputStr[i]+" ");
                    console.log("3: "+postfixExpression);

                }
                else{
                    postfixExpression.push(" "+inputStr[i]+" ");
                    console.log("4: "+postfixExpression);

                }
            }
           
            else{
                
                while(postfixExpression[postfixExpression.length-1]!="#" && checkprecidence(inputStr[i])<=checkprecidence(postfixExpression[postfixExpression.length-1].trim())){
                    console.log("in loop");
                    let x=postfixExpression[postfixExpression.length-1].trim();
                    postfixString+=" "+x+" ";
                    postfixExpression.pop();
                }
                console.log("5: "+postfixExpression);

                postfixExpression.push(" "+inputStr[i]+" ");
                console.log("6: "+postfixExpression);

            }

        }
    }
    while(postfixExpression[postfixExpression.length-1]!="#"){
        postfixString+=postfixExpression[postfixExpression.length-1];
        postfixExpression.pop();
    }
    return postfixString;

}
isOperator=(value)=>{
    return (value==="+"||value==="-"||value==="*"||value==="/"||value==="%")?true:false;
}
isOperand=(value)=>{
    if(!isOperator(value)){
        return true;
    }
    else{
        return false;
    }
}
checkprecidence=(value)=>{
    if(value==="+" || value==="-"){
        return 1;
    }
    else if(value==="*"||value==="/"|| value==="%"){
        return 2;
    }
    
}
which=(value,a,b)=>{
    switch(value){
        case '+':
            return add(a,b);
        break;
        case '-':
            return subtract(a,b);
        case '*':
            return multiply(a,b);
            break;
        case '/':
            return divide(a,b);
            break;
        case '%':
            return mod(a,b);
            break;

    }
}
compute=(postfix_expression)=>{
    let postfix_array=postfix_expression.split(" ");
    let clean_posfix=[];
    for (let i=0;i<postfix_array.length;i++){
        if(!postfix_array[i]==""){
            clean_posfix.push(postfix_array[i]);
        }
    }
    console.log(clean_posfix);

    let resultStack=[]
    for (let i =0;i<clean_posfix.length;i++){
        if(isOperand(clean_posfix[i])){
            resultStack.push(clean_posfix[i]);
        }
        else if(isOperator(clean_posfix[i])){
            let x=resultStack.pop();
            let y=resultStack.pop();
            let result=which(clean_posfix[i],x,y);
            resultStack.push(result);
        }
    }
    return resultStack[0];

}
