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