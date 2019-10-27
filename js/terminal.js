
var SiteUrl = '';
var LastCommand = '';
var TitleCommand = 'SP> ';
var ListSelected = '';
var GreetingMessage = 'Welcome to terminal for SharePoint via browser interface [Version '+Version+']\nCreated by Saranchai Anunthananaruporn. All rights reserved\n\nType \'Help\' for suggest the command.\n\n';

var terminal = $('#term_demo').terminal(function(command) {

    var Url = 'https://logicalmild.github.io/SP-Terminal/module/command/command.js';
        $.ajax({
            url: Url,
            dataType: "script",
            success : function(data)
            {
                var text = GetHelp();
                terminal.echo(text);
            },
    
        });


    command = command.toUpperCase();
    SiteUrl = _spPageContextInfo.webServerRelativeUrl;

    if(command.match(/HELP/gi)){

        var Url = 'https://logicalmild.github.io/SP-Terminal/module/help/help.js';
        $.ajax({
            url: Url,
            dataType: "script",
            success : function(data)
            {
                var text = GetHelp();
                terminal.echo(text);
            },
    
          });

    }
    else if(command.match(/GET LIST/gi)){
        if(command == 'GET LIST'){

            var text = GetList('title');
            terminal.echo(text);

        }
        else{

            var ListName = command.split(' ');
            ListName.splice(0,2);
            ListName = ListName.toString();
            ListName = ListName.replace(/,/g,' ');
            var text = GetList(ListName);
            terminal.echo(text);
        
        }
        
    }
    else if(command.match(/SITE INFO/gi)){

        var Url = 'https://logicalmild.github.io/SP-Terminal/module/getsiteinfo/getsiteinfo.js';
        $.ajax({
            url: Url,
            dataType: "script",
            success : function(data)
            {
                var text = GetSiteInfo();
                terminal.echo(text);
            },
    
          });
        

    }
    else if(command.match(/GET SUBSITE/gi)){

        var Url = 'https://logicalmild.github.io/SP-Terminal/module/getsubsite/getsubsite.js';
        $.ajax({
            url: Url,
            dataType: "script",
            success : function(data)
            {
                var text = GetSubsite();
                terminal.echo(text);
            },
    
          });

        

    }
    else if(command.match(/CREDIT/gi)){
        
        var text = '\nSharePoint Developer : [Saranchai Anunthananaruporn]\nJob position : [Senior Software Engineer]\nEmail: [Saranchai@SPOfficial.onmicrosoft.com]\n';
        terminal.echo(text);
        

    }
    else if(command.match(/QUERY LIST/gi)){
        
        var Url = 'https://logicalmild.github.io/SP-Terminal/module/querylist/querylist.js';
        $.ajax({
            url: Url,
            dataType: "script",
            success : function(data)
            {
                ModuleQueryList();
            },
    
          });
        

    }
    else if(command.match(/GET API/gi)){
        
        var Url = 'https://logicalmild.github.io/SP-Terminal/module/api/api.js';
        $.ajax({
            url: Url,
            dataType: "script",
            success : function(data)
            {
                var text = API(command);
                terminal.echo(text);
            },
    
          });

        

    }
    else if(command.match(/ATC/gi)){
        var Url = 'https://logicalmild.github.io/SP-Terminal/module/ATC/ATC.js';
        $.ajax({
            url: Url,
            dataType: "script",
            success : function(data)
            {
                ActivateATC();
            },
    
          });
        
    }
    else if(command.match(/CAL MATH/gi)){
        var Url = 'https://logicalmild.github.io/SP-Terminal/module/calmath/calmath.js';
        $.ajax({
            url: Url,
            dataType: "script",
            success : function(data)
            {
                ActivateCalMath();
            },
    
          });
        
    }
    else if(command.match(/LOGOUT/gi)){
        
        var Url = 'https://logicalmild.github.io/SP-Terminal/module/logout/logout.js';
        $.ajax({
            url: Url,
            dataType: "script",
            success : function(data)
            {
                LogOut();
            },
          });   
    }
    
    else if(command.match(/CREATE LIST/gi)){
        
        var Url = 'https://logicalmild.github.io/SP-Terminal/module/createlist/createlist.js';
        $.ajax({
            url: Url,
            dataType: "script",
            success : function(data)
            {
                CreateList();
            },
          });   
    }
    
    else if(command.match(/DELETE LIST/gi)){
        
        var Url = 'https://logicalmild.github.io/SP-Terminal/module/deletelist/deletelist.js';
        $.ajax({
            url: Url,
            dataType: "script",
            success : function(data)
            {
                DeleteList();
            },
          });   
    }
    else{
        var text = 'This command is not match.\n';
        terminal.echo(text);
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