var LastCommand = '';
var TitleCommand = 'SP> ';
var ListSelected = '';
var SiteUrl = '';
var Version = '1.0.0.15';
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
        var Url = SiteUrl+'/sitepages/web/terminal/module/ATC/ATC.js';
        IncludeModule('body',Url);
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




function IncludeModule(Selector,Url){
        
    var response;
        $.ajax({ type: "GET",   
            url: Url,   
            async: false,
            success : function(text)
            {
                response = text;
            
            },
    
        });

    $(Selector).append(response);
} 