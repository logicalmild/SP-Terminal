var ArrQ = [];
var ArrA = [];

function ActivateATC(){
    var site = 'https://spofficial.sharepoint.com/sites/Guide';
    var list = 'ATC_Interview';
    var query = '?$select=Question,Answer&$top=5000&$orderby=Created asc';
    var data = GetItemFromOtherSite(site,list,query)
    if(data){
        for(i in data){
            ArrQ.push(data[i].Question);
            ArrA.push(data[i].Answer);
        }
    }


    
    
    terminal.push(function(command){
       if(command == '1'){
        RandomGame();
       }
       else if(command == '2'){
        terminal.clear();
        SequenceGame(0);
       }
       else if(command == '3'){

            var link = 'https://spofficial.sharepoint.com/sites/Guide/Lists/ATC_Interview/AllItems.aspx';
            var win = window.open(link, '_blank');
            win.focus();
            
       }
       else{
            this.echo('Please choose 1 or 2\n');
       }
       
    },{
        prompt: 'Choose 1 is random.\nChoose 2 is sequence.\nChoose 3 add a question.\nChoose > '
    });
}

function RandomGame(){
    
    terminal.push(function(command){
        terminal.clear();   
        var index = Math.floor(Math.random() * (ArrQ.length-1)); 
        terminal.echo('Question : ' + ArrQ[index] + '\n');    
        terminal.push(function(command){
            terminal.echo('\nAnswer : ' + ArrA[index] + '\n');    
            RandomGame();

        },{
            prompt: 'Show answer press enter.'
        });

    },{
        prompt: 'Press enter for random question.'
    });

}

function SequenceGame(index){
    terminal.push(function(command){
        terminal.clear();       
        terminal.echo('Question '+(index+1)+': ' + ArrQ[index] + '\n');  
        terminal.push(function(command){
            if(index < ArrQ.length - 1){
                terminal.echo('\nAnswer : ' + ArrA[index] + '\n');    
                SequenceGame(index+1);
            }else{
                terminal.clear();  
                terminal.echo('Out of question\n');  
            }
            

        },{
            prompt: 'Show answer press enter.'
        });

    },{
        prompt: 'Press enter for next question.'
    });
}