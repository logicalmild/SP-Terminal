var ArrQ = [];
var ArrA = [];

function ActivateATC(){
    var site = 'https://spofficial.sharepoint.com/sites/Guide';
    var list = 'ATC_Interview';
    var query = '?$select=Question,Answer&$top=5000&$orderby=Created asc';
    var data = GetItemFromOtherSite(site,list,query)
    if(data){
        for(i in data){
            if(data[i].Question){
                ArrQ.push(data[i].Question);
                ArrA.push(data[i].Answer); 
            }
        }
    }


    terminal.clear();
    
    terminal.push(function(command){
        
    

       if(command == '1'){
        RandomGame();
       }
       else if(command == '2'){
        terminal.clear();
        SequenceGame(0);
       }
       else if(command == '3'){
            terminal.clear();
            var link = 'https://spofficial.sharepoint.com/sites/Guide/Lists/ATC_Interview/NewForm.aspx';
            var win = window.open(link, '_blank');
            win.focus();
            
       }
       else{
            this.echo('Please choose 1 , 2 or 3\n');
       }
       
    },{
        prompt: 'Choose 1 for random question.\nChoose 2 for show question by squence.\nChoose 3 add a question.\nChoose > '
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
        if(command == '1'){
            var link = 'https://spofficial.sharepoint.com/sites/Guide/Lists/ATC_Interview/EditForm.aspx?ID='+index;
            var win = window.open(link, '_blank');
        }else{
            terminal.clear();       
            terminal.echo('Question '+(index+1)+': ' + ArrQ[index] + '\n');  
            terminal.push(function(command){

                
                    if(index < ArrQ.length - 1){
                        terminal.clear();       
                        terminal.echo('Question '+(index+1)+': ' + ArrQ[index] + '\n');  
                        terminal.echo('\nAnswer : ' + ArrA[index] + '\n');   
                        terminal.echo('\n\nPress 1 for edit this item.\n'); 
                        SequenceGame(index+1);
                    }else{
                        terminal.clear();  
                        terminal.echo('Out of question\n');  

                        terminal.push(function(command){
                                SequenceGame(0);
                        },{
                            prompt: 'Replay press enter.'
                        });
                    }      

            },{
                prompt: 'Press enter for show answer.'
            });
        }
        

    },{
        prompt: 'Press enter for next question. '
    });
}