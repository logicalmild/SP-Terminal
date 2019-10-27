function GetList(){
    var text = '';
    if(command == 'GET LIST'){

        text = GetList('title');
        // terminal.echo(text);

    }
    else{

        var ListName = command.split(' ');
        ListName.splice(0,2);
        ListName = ListName.toString();
        ListName = ListName.replace(/,/g,' ');
        text = GetList(ListName);
        // terminal.echo(text);
    
    }
    return text;
}