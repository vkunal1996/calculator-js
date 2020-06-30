let seven=document.querySelector('.seven');
let eight=document.querySelector('.eight');
let nine=document.querySelector('.nine');
let four=document.querySelector('.four');
let five=document.querySelector('.five');
let six=document.querySelector('.six');
let one=document.querySelector('.one');
let two=document.querySelector('.two');
let three=document.querySelector('.three');
let zero=document.querySelector(".zero");
let clear=document.querySelector(".clear");
let plusoperation=document.querySelector('.plus_operation');
let multiplyoperation=document.querySelector('.multiply_operation');
let divisionoperation=document.querySelector('.division_operation');
let minusoperations=document.querySelector('.minus_operation');
let input1=0;
let input2=0;
let input=0;
let display_screen=document.querySelector('.input');
let equality=document.querySelector('.equal_operation');
let operation='';
display_screen.textContent='';
let display_string=[]
function keyPressed(){
    if(keycode==='48'){
        display_screen.textContent=0;
    }
}
zero.onclick=()=>{
    display_screen.textContent='';
    display_string.push(0);
    output();
}
one.onclick=()=>{
    display_screen.textContent='';

    display_string.push(1);
    output();
}
two.onclick=()=>{
    display_screen.textContent='';
    display_string.push(2);
    output();
}
three.onclick=()=>{
    display_screen.textContent='';

    display_string.push(3);
    output();
}
four.onclick=()=>{
    display_screen.textContent='';

    display_string.push(4);
    output();
}
five.onclick=()=>{
    display_screen.textContent='';

    display_string.push(5);
    output();
}
six.onclick=()=>{
    display_screen.textContent='';

    display_string.push(6);
    output();
}
seven.onclick=()=>{
    display_screen.textContent='';

    display_string.push(7);
    output();
}
eight.onclick=()=>{
    display_screen.textContent='';
    display_string.push(8);
    output();
}
nine.onclick=()=>{
    display_screen.textContent='';

    display_string.push(9);
    output();
}
plusoperation.onclick=()=>{
    display_screen.textContent='';

    if(display_string.length>0){

        let symbol=check_symbol('+',display_string.length-1);
        console.log(symbol);
        if(symbol===true){
            display_string[display_string.length-1]='+'
        }
        else{
            display_string.push("+");
        }
    }
    output();
}
multiplyoperation.onclick=()=>{
    display_screen.textContent='';
    if(display_string.length>0){
        let symbol=check_symbol('*',display_string.length-1);
        console.log(symbol);

        if(symbol===true){
            display_string[display_string.length-1]='*'
        }
        else{
            display_string.push("*");
        }
    }

    output();
}
divisionoperation.onclick=()=>{
    display_screen.textContent='';

    if(display_string.length>0){
        let symbol=check_symbol('/',display_string.length-1);
        console.log(symbol);

        if(symbol===true){
            display_string[display_string.length-1]='/'
        }
        else{
            display_string.push("/");
        }
    }
    output();
}
minusoperations.onclick=()=>{
    display_screen.textContent='';

    if(display_string.length>0){
        let symbol=check_symbol('-',display_string.length-1);
        console.log(symbol);

        if(symbol===true){
            display_string[display_string.length-1]='-'
        }
        else{
            display_string.push("-");
        }
    }
    output();
}
check_symbol=(operation,last_position)=>{
    if(display_string[last_position]==='/' ||display_string[last_position]==='+' ||
       display_string[last_position]==='-' ||display_string[last_position]==='*' ){
        return true;
    }
    return false;
}
equality.onclick=()=>{
    if(display_string.length>0){
        evaluate_expression(display_string);
    }
}
let expression='';
evaluate_expression=(display_string)=>{
    let result=0;
    let operand=[];
    let operator=[];
    let expression=[];
    let sum=0;
    let newStr=[];
    console.log(display_string);
    for (let i=0;i<display_string.length;i++){
        if(!isOperator(display_string[i])){
            sum=sum*10+display_string[i];
        }
        if(isOperator(display_string[i])){
            newStr.push(sum);
            newStr.push(display_string[i]);
            sum=0;
        }
        if(i==display_string.length-1){
            newStr.push(sum);
        }
    }
    console.log(newStr.toString());
    let postfix_expression=InfixToPostfix(newStr.toString(),'arr');
    let post_expr='';
    for (let i =0;i<postfix_expression.length;i++){
        if(postfix_expression[i]===' '){
            continue;
        }
        else{
            post_expr+=postfix_expression[i];
        }
    }
    expression=post_expr;
    console.log(expression.toString());
    console.log(expression.length);
    let nn='';
    sum=0;
    let nn_arr=[];
    for (let i=0;i<expression.length;i++){
        if(expression[i]!=','){
            if(isOperand(expression[i])){
                sum=sum*10 +parseInt(expression[i]);
            }
            else if(isOperator(expression[i])){
                nn_arr.push(sum);
                sum=0;
                nn_arr.push(expression[i]);
            }
        }
        else{
            nn_arr.push(sum);
            sum=0;
        }
    }
    console.log(nn_arr);
    for(let i=0;i<nn_arr.length;i++){
        if(nn_arr[i]===0){
            continue;
        }
        else{
            if(i==0){
                nn+=nn_arr[i];
            }
            else{
                nn+=" "+nn_arr[i];
            }
            
        }
    }
    console.log(nn);
    console.log(nn.length);
    
    
    evaluatethis(nn);
};


function push_stack(stackArr,ele)
{
 stackArr[stackArr.length]=ele;
}

function pop_stack(stackArr)
{
 var _temp=stackArr[stackArr.length-1];
 delete stackArr[stackArr.length-1];
 stackArr.length--;
 return(_temp);
}

function isOperand(who)
{
 return(!isOperator(who)? true : false);
}

function isOperator(who)
{
 return((who=="+" || who=="-" || who=="*" || who=="/" || who=="(" || who==")")? true : false);
}

function topStack(stackArr)
{
 return(stackArr[stackArr.length-1]);
}

function isEmpty(stackArr)
{
 return((stackArr.length==0)? true : false);
}

/* Check for Precedence */
function prcd(char1,char2)
{
 var char1_index,char2_index;
 var _def_prcd="-+*/";
 for(var i=0; i<_def_prcd.length; i++)
 {
  if(char1==_def_prcd.charAt(i)) char1_index=i;
  if(char2==_def_prcd.charAt(i)) char2_index=i;
 }
 if(((char1_index==0)||(char1_index==1)) && (char2_index>1)) return false;
 else return true;
}

function InfixToPostfix(infixStr,postfixStr)
{
 var postfixStr=new Array();
 var stackArr=new Array();
 var postfixPtr=0;
 infixStr=infixStr.split('');
 for(var i=0; i<infixStr.length; i++)
 {
  if(isOperand(infixStr[i]))
  {
   postfixStr[postfixPtr]=infixStr[i];
   postfixPtr++;
  }
  else
  {
   while((!isEmpty(stackArr)) && (prcd(topStack(stackArr),infixStr[i])))
   {
    postfixStr[postfixPtr]=topStack(stackArr);
    pop_stack(stackArr);
    postfixPtr++;
   }
   if((!isEmpty(stackArr)) && (infixStr[i]==")"))
   {
    pop_stack(stackArr);
   }
   else
   {
    push_stack(stackArr,infixStr[i]);
   }
  }
 }
 while(!isEmpty(stackArr))
 {
  postfixStr[postfixStr.length]=topStack(stackArr);
  pop_stack(stackArr);
 }
 var returnVal='';
 for(var i=0; i<postfixStr.length; i++)
 {
  returnVal+=postfixStr[i];
 }
 return(returnVal);
}

clear.onclick=()=>{
    clear_screen();
}
output=()=>{
    let fstring='';
    for (let i =0;i<display_string.length;i++){
        fstring+=display_string[i];
    }
    display_screen.textContent=fstring;
};

clear_screen=()=>{
    display_string=[];
    display_screen.textContent='';
}



// let expression=post_expr;
function evaluatethis(expression){

    let postfix=expression.split(" ");
    console.log(postfix);
let postfixStack=[];
postfix.forEach( function(current) {
    if ( isOperator(current) ) {
        postfixStack.push( 
            compute( postfixStack.pop(), 
				symbolToOperator(current), 
				postfixStack.pop() 
			)
        );
    }
    else {
        postfixStack.push(current);
    }   
});
display_screen.textContent='';
display_screen.textContent=postfixStack[0];


}

function compute(a, operator, b) {
    return operator(a,b); 
}
function symbolToOperator(symbol) {
    switch (symbol) {
        case '+': return plus;
        case '-': return minus;
        case '*': return multiply;
        case '/': return divide;
        case '%': return modulo;
    }
}
function plus(a,b) { return b + a; } 
function minus(a,b) { return b - a; }
function multiply(a,b) { return b * a; }
function divide(a,b) { return b / a; }
function modulo(a,b) { return b % a; }


