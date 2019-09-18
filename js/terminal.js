var LastCommand = '';
var TitleCommand = 'SP> ';
var ListSelected = '';
var SiteUrl = '';
var Version = '1.0.0.12';
var GreetingMessage = 'Welcome to terminal for SharePoint via browser interface [Version '+Version+']\nCreated by Saranchai Anunthananaruporn. All rights reserved\n\nType \'Help\' for suggest the command.\n\n';

var command = {
    '[Site Information]':{
        'SITE INFO              ':'Show all information of current site.',
        'GET SUBSITE            ':'Show all subsite.',
    },
    '[API]':{
        'GET API                ':'Show all SharePoint API.',
        'GET API [Properties]   ':'Get data form api name.',
    },
    '[List]':{
        'GET LIST               ':'Show all list name of current site.',
        'GET LIST [Listname]    ':'Show all properties of list.',
        // 'Create List            ':'Create list data.',
        // 'Delete List            ':'Delete list data.',
    },
    '[Retrieve Data]':{
        'QUERY LIST [Listname]  ':'Query data of list.', 
    },
    '[Others]':{
        'HELP                    ':'Show command and informations.',
        'CLEAR                   ':'Clear screen.',
        'LOGOUT                  ':'Logout from terminal',
        'CREDIT                  ':'Credits',
    },
    '[Mini Game]':{
        'RANDOM GAME':'Random the queston interview',
    }
    
};

var QuestionATC = {

    1:{
        Question:'Who Is An Air Traffic Controller (atc)?',
        Answer:'An ATC is a person who coordinates the movement of air traffic, to ensure that aircraft stay safe distances apart.'
    },
    2:{
        Question:'Why An Atc?',
        Answer:'Because I have a great potential to manage things, and my education also meets the required qualification skills where have complete the training for an ATC and I feel that I can use my knowledge and experience in a resourceful way for this job.'
    },
    3:{
        Question:'At Which Position Do You Work As An Atc?',
        Answer:'There are basically three positions: Junior Executive, Senior Assistant and a Manager. Tell them about what position you are applying for.'
    },
    4:{
        Question:' What Is The Job Of A Junior Executive Atc?',
        Answer:'A Junior Executive has to keep track of all the flights which are arriving and departing at a particular time. In-case if there are two different flights arriving or departing at the same time then he needs to report he Senior Assistant.'
    },
    5:{
        Question:'What Is The Duty Of A Senior Assistant?',
        Answer:'Senior Assistant is responsible for Instructing the pilots about their movements. A senior assistant takes reports from the Junior Executive and reports to the Manager for instructions at extreme  cases.'
    },
    6:{
        Question:'',
        Answer:''
    },
    7:{
        Question:'',
        Answer:''
    },
    8:{
        Question:'',
        Answer:''
    },
    9:{
        Question:'',
        Answer:''
    },
    10:{
        Question:'',
        Answer:''
    },
    11:{
        Question:'',
        Answer:''
    },
    12:{
        Question:'',
        Answer:''
    },
    13:{
        Question:'',
        Answer:''
    },
    14:{
        Question:'',
        Answer:''
    },
    15:{
        Question:'',
        Answer:''
    },
    16:{
        Question:'',
        Answer:''
    },
    17:{
        Question:'',
        Answer:''
    },
    18:{
        Question:'',
        Answer:''
    },
    19:{
        Question:'',
        Answer:''
    },
    20:{
        Question:'',
        Answer:''
    },
    // 1:{
    //     Question:'',
    //     Answer:''
    // },
    
};


var terminal = $('#term_demo').terminal(function(command) {
    command = command.toUpperCase();
    var FirstStep = GetSiteInfo();


    if(command.match(/HELP/gi)){

        var text = GetHelp();
        this.echo(text);

    }
    else if(command.match(/GET LIST/gi)){
        if(command == 'GET LIST'){

            var text = GetList('title');
            this.echo(text);

        }
        else{

            var ListName = command.split(' ');
            ListName.splice(0,2);
            ListName = ListName.toString();
            ListName = ListName.replace(/,/g,' ');
            var text = GetList(ListName);
            this.echo(text);
        
        }
        
    }
    else if(command.match(/SITE INFO/gi)){

        var text = GetSiteInfo();
        this.echo(text);

    }
    else if(command.match(/GET SUBSITE/gi)){

        var text = GetSubsite();
        this.echo(text);

    }
    else if(command.match(/CREDIT/gi)){
        
        var text = '\nSharePoint Developer : [Saranchai Anunthananaruporn]\nJob position : [Senior Software Engineer]\nEmail: [Saranchai@SPOfficial.onmicrosoft.com]\n';
        this.echo(text);
        

    }
    else if(command.match(/QUERY LIST/gi)){

        var text ='';
        var Listname = '';
        var Query = '';

        terminal.push(function(command2) {
    
            Listname = command2;
            
            terminal.push(function(command3) {
    
                terminal.echo(command3);
                Query = command3;

                text = GetItemByRestAPI(Listname,Query);
                text = JSON.stringify(text, null , 2);
                // text = text.replace(/"/g,'');
                // text = text.replace(/,/g,'');
                // text = text.replace(/{/g,'');
                // text = text.replace(/}/g,'');
                // text = text.replace(/:/g,'\t\t');
                this.echo(text);

            }, {
                prompt: 'Query > '
            });
                
        }, {
            prompt: 'List name > '
        });
    





        


    }
    else if(command.match(/GET API/gi)){
        
        var text = '';
        var api = command.split(' ');
            api.splice(0,2);
            api = api.toString();
            api = api.replace(/,/g,' ');

        if(command.toUpperCase() == 'GET API'){
            
            text = GetAPI();

        }
        else{
            
            text = GetAPIByProp(api);

        }
        
        this.echo(text);

    }
    else if(command.match(/RANDOM GAME/gi)){
        
        terminal.push(function(command){
           if(command == '1'){
            RandomGame();
           }
           else if(command == '2'){
            SequenceGame();
           }
           else{
                this.echo('Please choose 1 or 2\n');
           }
           
        },{
            prompt: 'Choose 1 is random game.\n Choose 2 is sequence game.\nChoose > '
        });
       

    }
    else if(command.match(/LOGOUT/gi)){
        
        terminal.push(function(command) {
            var history = terminal.history();
            terminal.clear();
            history.disable();
            
            terminal.push(function(command) {
                if (command.match(/^(y|yes)$/i)) {
                    // terminal.echo('execute your command here');
                    terminal.logout();
                    terminal.clear();
                    terminal.pop();
                    history.enable();
                    
                } else if (command.match(/^(n|no)$/i)) {
                    terminal.pop();
                    history.enable();
                }
            }, {
                prompt: 'Are you sure to log out ? [y/n]\n'
            });
        
        });
        
    }
    else{
        var text = 'This command is not match.\n';
        this.echo(text);
    }

}, { 
        greetings: GreetingMessage,
        name: 'SPTerminal',
        prompt: TitleCommand , 
        login :function(user, password, callback) {
            if (user == 'admin' && password == 'P@ssw0rd') {
                terminal.clear();
                callback('AUTHENTICATION TOKEN');
            } else {
                callback(null);
            }
        },
        
        
    });


function scroll_to_bottom() {
    var body = $('body');
    var sHeight = body.prop('scrollHeight');
    body.scrollTop(sHeight);
}

function GetHelp(){
    
    var text = '\n';
    var HelpMessage = command;
    text = JSON.stringify(HelpMessage, null , 2);
    text = text.replace(/"/g,'');
    text = text.replace(/,/g,'');
    text = text.replace(/{/g,'');
    text = text.replace(/}/g,'');
    text = text.replace(/:/g,'\t\t');
    return text;
}

function GetList(ListName){

    var text = '\n';

    
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + '/_api/web/lists',
        type: 'GET',
        async: false,
        headers: {
        'accept': 'application/json;odata=verbose',
        'content-type': 'application/json;odata=verbose',
        },
        success: function (data) {
            var temp = data.d.results;
            
            if(ListName == 'title'){
                for(i=0 ; i < temp.length ; i++){
                    text += temp[i].Title + '\n';
                }
            }else{
                for(i=0 ; i < temp.length ; i++){
                    if(ListName.toUpperCase() == temp[i].Title.toUpperCase()){
                        text += PackTextRow(40,temp[i]) + '\n';
                    }else if(i == (temp.length-1)){
                        text = 'List ' + ListName + ' is not found.\n';

                    }
                    
                }
            }   
            
        },

        error: {}
    
    });


    return text;
}

function GetSiteInfo(){
    
    var text = '\n';
    var Reserve = 50;
    text = JSON.stringify(_spPageContextInfo, null , 2);
    text = text.replace(/"/g,'');
    text = text.replace(/,/g,'');
    SiteUrl = _spPageContextInfo.webServerRelativeUrl;

    return text;
}

function PackTextRow(Reserve,data){
    var text = '';
    for(i in data){
        var Title = i;
        var Desc = data[i];
        
        text += GroupData(Reserve,Title,Desc) + '\n';
    }
    
    function GroupData(Reserve,Title,Desc){
        var text2 = '';
        for(i=0;i<Reserve;i++){
            if(Title[i]){
                text2 += Title[i];
            }else{
                text2 += ' ';
            }
        }
        
        text2 = text2 + Desc;
        return text2;
    }

    

    return text;
}

function QueryList(Listname,query){
    var data = GetItemByRestAPI(Listname,query);
    text = JSON.stringify(data, null , 2);
    text = text.replace(/"/g,'');
    text = text.replace(/,/g,'');
    return text;
}

function GetItemByRestAPI(Listname,Query){ 

    var requestUri = SiteUrl + "/_api/web/lists/getByTitle('"+Listname+"')/items" + Query;
    var requestHeaders = {
    "accept": "application/json;odata=verbose"
    }
    var extr_Data;

    $.ajax({
        url: requestUri,
        type: 'GET',
        dataType: 'json',
        async: false,
        headers: requestHeaders,
        success: function (data) 
        {      
            data = data.d.results; 
            extr_Data = data;
            
        },
        error: function ajaxError(response) {
            console.log(response.status + ' ' + response.statusText);
        }
    });

    return extr_Data;
}


function GetAPI(){

    var requestUri = SiteUrl + "/_api/web/";
    var requestHeaders = {
    "accept": "application/json;odata=verbose"
    }
    var text;

    $.ajax({
        url: requestUri,
        type: 'GET',
        dataType: 'json',
        async: false,
        headers: requestHeaders,
        success: function (data) 
        {      
        
            data = data.d; 
            text = JSON.stringify(data, null , 2);
            text = text.replace(/"/g,'');
            text = text.replace(/,/g,'');
            
        },
        error: function ajaxError(response) {
            console.log(response.status + ' ' + response.statusText);
        }
    });

    return text;

}


function GetAPIByProp(Prop){
    
    var requestUri = SiteUrl + "/_api/web/" + Prop;
    var requestHeaders = {
    "accept": "application/json;odata=verbose"
    }
    var text;

    $.ajax({
        url: requestUri,
        type: 'GET',
        dataType: 'json',
        async: false,
        headers: requestHeaders,
        success: function (data) 
        {      
        
            data = data.d; 
            text = JSON.stringify(data, null , 4);
            text = text.replace(/"/g,'');
            text = text.replace(/,/g,'');
            // text = text.replace(/{/g,'');
            // text = text.replace(/}/g,'');
            
            
        },
        error: function ajaxError(response) {
            console.log(response.status + ' ' + response.statusText);
        }
    });

    return text;
}
function GetSubsite(){
    var requestUri = "https://spofficial.sharepoint.com/_api/search/query?querytext='contentclass:STS_Site contentclass:STS_Web'&selectproperties='Title,Path'&rowlimit=500";
    var requestHeaders = {
    "accept": "application/json;odata=verbose"
    }
    var text;

    $.ajax({
        url: requestUri,
        type: 'GET',
        dataType: 'json',
        async: false,
        headers: requestHeaders,
        success: function (data) 
        {      
        
            data = data.d; 
            text = JSON.stringify(data, null , 4);
            text = text.replace(/"/g,'');
            text = text.replace(/,/g,'');
            // text = text.replace(/{/g,'');
            // text = text.replace(/}/g,'');
            
            
        },
        error: function ajaxError(response) {
            console.log(response.status + ' ' + response.statusText);
        }
    });

    return text;

}


function RandomGame(){
    
    terminal.push(function(command){
        terminal.clear();   
        var text = '';
        var ArrQ = [];
        var ArrA = [];
        for(i in QuestionATC){
            ArrQ.push(QuestionATC[i].Question);
            ArrA.push(QuestionATC[i].Answer);
        }
        ArrQ = ArrQ[Math.floor(Math.random()*ArrQ.length)];
        terminal.echo('Question : ' + ArrQ + '\n');    
        terminal.push(function(command){

            terminal.echo('\nAnswer : ' + ArrA + '\n');    
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
        var text = '';
        var ArrQ = [];
        var ArrA = [];
        for(i in QuestionATC){
            ArrQ.push(QuestionATC[i].Question);
            ArrA.push(QuestionATC[i].Answer);
        }
        terminal.echo('Question : ' + ArrQ + '\n');  

        terminal.push(function(command){

            terminal.echo('\nAnswer : ' + ArrA + '\n');    
            SequenceGame(i);

        },{
            prompt: 'Show answer press enter.'
        });

    },{
        prompt: 'Press enter for next question.'
    });
}