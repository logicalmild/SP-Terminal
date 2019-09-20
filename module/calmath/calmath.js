function ActivateCalMath(){
    terminal.clear();
    terminal.echo('1 : Plus number');
    terminal.echo('2 : Minus number');
    terminal.echo('3 : Multiply number');
    terminal.echo('4 : Divide number');
    terminal.echo('5 : Random');

    terminal.push(function(command){
        
        terminal.clear();
        switch(command){
            case '1':   
                    terminal.push(function(digit){

                        PlusNumber(digit);

                    },{
                        prompt: 'Input digit :'
                    });
                    break;
        }
        

    },{

        prompt:'Select game mode > '
    });


}

function PlusNumber(digit){
    
    var max = 1;
    for(i=0;i<digit;i++){

        max = max * 10;
    }
    
    var num1 = Math.floor(Math.random() * max); 
    var num2 = Math.floor(Math.random() * max);
    var ans = num1 + num2;
    terminal.echo(num1 + ' + '+ num2 + '= ?');

    terminal.push(function(command){
        terminal.echo('Answer is ' + ans);
        terminal.echo('\n\nNext press enter.');
        terminal.echo('\nBack to home menu choose 1.');

        terminal.push(function(command){
            if(command == '1'){
                ActivateCalMath(); 
            }
            else{
                PlusNumber(digit);
            }
        });

    },{
        prompt: 'Press enter for show answer.'
    });


}