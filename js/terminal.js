
var SiteUrl = '';
var LastCommand = '';
var TitleCommand = 'SP> ';
var ListSelected = '';
var Version = '1.0.2.0';
var GreetingMessage = 'Welcome to terminal for SharePoint via browser interface [Version '+Version+']\nCreated by Saranchai Anunthananaruporn. All rights reserved\n\nType \'Help\' for suggest the command.\n\n';
var command = {
    '[Site Information]':{
        'SITE INFO                ':'Show all information of current site.',
        // 'GET SUBSITE              ':'Show all subsite.', // bug
    },
    '[API]':{
        'GET API                  ':'Show all SharePoint API.',
        'GET API [Properties]     ':'Get data form api name.',
    },
    '[List]':{
        'GET LIST                 ':'Show all list name of current site.',
        'GET LIST INFO            ':'Show all properties of list.',
        'Create List  [bug]       ':'Create list in current site.',
        'Delete List  [bug]       ':'Delete list in current site.',
        // 'Create List           ':'Create list data.',
        // 'Delete List           ':'Delete list data.',
    },
    '[Framework]':{
        'GLIB                     ':'Form & Workflow (Guide Library)', 
    },
    '[Tools]':{
        'SPBoxQuery               ':'Tools for query data in sharepoint', 
    },
    '[Others]':{
        'HELP                     ':'Show command and informations.',
        'CLEAR                    ':'Clear screen.',
        'LOGOUT                   ':'Logout from terminal',
        'CREDIT                   ':'Credits',
    }, 
    '[Mini Game]':{
        'CAL MATH                 ':'Calculate math 2 and 3 digit by random',
        // 'CHAT BOT                 ':'Baby Bot', //not create
    }
    
};



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

    else if(command == 'GET LIST INFO'){
        
        var Url = 'https://logicalmild.github.io/SP-Terminal/module/getlistinfo/getlistinfo.js';
        $.ajax({
            url: Url,
            dataType: "script",
            success : function(data)
            {
                terminal.push(function(command){
                    var Listname = command;
                    GetListInfo(Listname);
               
                },{
                    prompt: 'List name > '
                });
                
            },
    
          });
    }

    else if(command.match(/GET LIST/gi)){

        var Url = 'https://logicalmild.github.io/SP-Terminal/module/getlist/getlist.js';
        $.ajax({
            url: Url,
            dataType: "script",
            success : function(data)
            {
                var text = GetList();
                terminal.echo(text);
            },
    
          });
        
        
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

    else if(command.match(/SPBOXQUERY/gi)){
        
        window.open('SPBoxQuery.aspx', '_blank');
        
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
    else if(command.match(/GLIB/gi)){
        
        var Url = 'https://logicalmild.github.io/SP-Terminal/module/glib/glib.js';
        $.ajax({
            url: Url,
            dataType: "script",
            success : function(data)
            {
                GlibStart();
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