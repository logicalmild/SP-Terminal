var CountQuestion = 0;
var ResultTime = [];
var t0,t1;
function ActivateCalMath(){
    terminal.clear();
    terminal.echo('1 : Plus number');
    terminal.echo('2 : Minus number');
    terminal.echo('3 : Multiply number');
    terminal.echo('4 : Divide number');
    terminal.echo('5 : Random');
    terminal.echo('6 : Exit\n');

    terminal.push(function(command){
        
        terminal.clear();
        switch(command){
            case '1':   operation = 'plus';
                    break;
            case '2':   operation = 'minus';
                    break;
            case '3':   operation = 'multiply';
                    break;
            case '4':   operation = 'divide';
                    break;
            case '5':   operation = 'random';
                    break;
            case '6':   location.reload();
                    break;
        }

        terminal.push(function(digit){

            terminal.push(function(Question){
                terminal.clear();
                CountQuestion = Question;
                ResultTime = [];
                Calculate(digit,operation,0);
            },{
                prompt:'Input number of question : '
            });



            

        },{
            prompt: 'Input digit : '
        });
        

    },{

        prompt:'Select game mode > '
    });


}




function Calculate(digit,operation,num){
    
    var max = 1;
    for(i=0;i<digit;i++){

        max = max * 10;
    }
    
    var num1 = Math.floor(Math.random() * max); 
    var num2 = Math.floor(Math.random() * max);


    var ans = 0;
    var symbol ='';
    switch(operation){
        case 'plus':    
                        ans = num1 + num2;
                        symbol = '+';
                        break;
        case 'minus':    
                        ans = num1 - num2;
                        symbol = '-';
                        break;
        case 'multiply':    
                        ans = num1 * num2;
                        symbol = 'x';
                        break;
        case 'divide':    
                        ans = num1 / num2;
                        symbol = '/';
                        break;
        case 'random':    
                        var ArrOper = ['+','-','*','/']
                        var synt = Math.floor(Math.random() * 3); 
                        if(ArrOper[synt] == '+'){
                            ans = num1 + num2;
                            symbol = '+';
                        }else if(ArrOper[synt] == '-'){
                            symbol = '-';
                            ans = num1 - num2;
                        }else if(ArrOper[synt] == '*'){
                            symbol = 'x';
                            ans = num1 * num2;
                        }else if(ArrOper[synt] == '/'){
                            symbol = '/';
                            ans = num1 / num2;
                        }
                        break;
    }
    
    
    t0 = performance.now();
    
    terminal.echo('\n' + num1 + ' ' + symbol + ' '+ num2 + ' = ?\n');

    terminal.push(function(command){
        t1 = performance.now();
        var t_result = t1-t0;
        ResultTime.push(t_result);
        terminal.echo('\nAnswer is ' + ans + ' Time : ' + t_result);
        terminal.echo('\n\nNext press enter.');
        terminal.echo('Back to home menu choose 1.\n');

        terminal.push(function(command){
            if(command == '1'){
                ActivateCalMath(); 
            }
            else{

                if(num < CountQuestion){
                    
                    terminal.clear();
                    
                    Calculate(digit,operation,num+1);

                }else{
                        var avg = 0;
                        var sum = 0;
                        
                        for(i=0;i<ResultTime.length;i++){
                            avg = avg + ResultTime[i];
                            sum = sum + ResultTime[i];
                        }
                        avg = avg / ResultTime.length;

                    terminal.echo('Average time per question is ' + avg + ' s.');
                    terminal.echo('You use time ' + avg + ' s.');
                }       

                
            }
        });

    },{
        prompt: 'Press enter for show answer.'
    });


}