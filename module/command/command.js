var LastCommand = '';
var TitleCommand = 'SP> ';
var ListSelected = '';
var SiteUrl = '';
var Version = '1.0.2.0';
var GreetingMessage = 'Welcome to terminal for SharePoint via browser interface [Version '+Version+']\nCreated by Saranchai Anunthananaruporn. All rights reserved\n\nType \'Help\' for suggest the command.\n\n';

var command = {
    '[Site Information]':{
        'SITE INFO                ':'Show all information of current site.',
        'GET SUBSITE              ':'Show all subsite.',
    },
    '[API]':{
        'GET API                  ':'Show all SharePoint API.',
        'GET API [Properties]     ':'Get data form api name.',
    },
    '[List]':{
        'GET LIST                 ':'Show all list name of current site.',
        'GET LIST [Listname](BUG) ':'Show all properties of list.',
        'Create List              ':'Create list in current site.',
        'Delete List              ':'Delete list in current site.',
        // 'Create List           ':'Create list data.',
        // 'Delete List           ':'Delete list data.',
    },
    '[Retrieve Data]':{
        'QUERY LIST [Listname]    ':'Query data of list.', 
    },
    '[Others]':{
        'HELP                     ':'Show command and informations.',
        'CLEAR                    ':'Clear screen.',
        'LOGOUT                   ':'Logout from terminal',
        'CREDIT                   ':'Credits',
    }, 
    '[Mini Game]':{
        'ATC                      ':'ATC Interviewing script',
        'CAL MATH                 ':'Calculate math 2 and 3 digit by random',
        'CHAT BOT                 ':'Baby Bot',
    }
    
};