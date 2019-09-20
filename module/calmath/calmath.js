function ActivateCalMath(){
    terminal.clear();
    terminal.echo('1 : Plus number');
    terminal.echo('2 : Minus number');
    terminal.echo('3 : Multiply number');
    terminal.echo('4 : Divide number');
    terminal.echo('5 : Random\n');

    terminal.push(function(command){
        
        terminal.clear();
        switch(command){
            case '1':   operation = 'plus'
                    break;
            case '2':   operation = 'minus'
                    break;
            case '3':   operation = 'multiply'
                    break;
            case '4':   operation = 'divide'
                    break;
            case '5':   operation = 'random'
                    break;
        }

        terminal.push(function(digit){

            Calculate(digit,operation);

        },{
            prompt: 'Input digit : '
        });
        

    },{

        prompt:'Select game mode > '
    });


}

function Calculate(digit,operation){
    
    var max = 1;
    for(i=0;i<digit;i++){

        max = max * 10;
    }
    
    var num1 = Math.floor(Math.random() * max); 
    var num2 = Math.floor(Math.random() * max);


    var ans = 0;
    switch(operation){
        case 'plus':    
                        ans = num1 + num2;
                        operation = '+';
                        break;
        case 'minus':    
                        ans = num1 - num2;
                        operation = '-';
                        break;
        case 'multiply':    
                        ans = num1 * num2;
                        operation = 'x';
                        break;
        case 'divide':    
                        ans = num1 / num2;
                        operation = '/';
                        break;
        case 'random':    
                        var ArrOper = ['+','-','*','/']
                        var synt = Math.floor(Math.random() * 3); 
                        if(ArrOper[synt] == '+'){
                            ans = num1 + num2;
                            operation = '+';
                        }else if(ArrOper[synt] == '-'){
                            operation = '-';
                            ans = num1 - num2;
                        }else if(ArrOper[synt] == '*'){
                            operation = 'x';
                            ans = num1 * num2;
                        }else if(ArrOper[synt] == '/'){
                            operation = '/';
                            ans = num1 / num2;
                        }
                        break;
    }
    
    
    
    
    terminal.echo('\n' + num1 + ' ' + operation + ' '+ num2 + ' = ?\n');

    terminal.push(function(command){
        terminal.echo('\nAnswer is ' + ans);
        terminal.echo('\n\nNext press enter.');
        terminal.echo('Back to home menu choose 1.\n');

        terminal.push(function(command){
            if(command == '1'){
                ActivateCalMath(); 
            }
            else{
                terminal.clear();
                Calculate(digit,operation);
            }
        });

    },{
        prompt: 'Press enter for show answer.'
    });


}