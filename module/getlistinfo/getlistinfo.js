function GetListInfo(){
    var Listname = '';
    var text;
    terminal.push(function(command2) {
        Listname = command2;
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
                data = data.d.results;

                for(i in data){
                    terminal.echo(data[i][Listname]);
            
                }

                // text = JSON.stringify(data, null , 2);
                // text = text.replace(/"/g,'');
                // text = text.replace(/,/g,'');
                // terminal.echo(text);
        
            },

            error: {}
        
        });


    return text;

    }, {
        prompt: 'List name > '
    }); 


    return text;
}
