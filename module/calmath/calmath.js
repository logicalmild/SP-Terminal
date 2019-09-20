function ActivateCalMath(){
    
    terminal.echo('1 : Plus number');
    terminal.echo('2 : Minus number');
    terminal.echo('3 : Multiply number');
    terminal.echo('4 : Divide number');
    terminal.echo('5 : Random');

    terminal.push(function(command){
        
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
    for(i=1;i<digit;i++){

        max = max * 10;
    }

    terminal.echo(max);
    //var index = Math.floor(Math.random() * (ArrQ.length-1)); 

}