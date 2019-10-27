function GetListInfo(){
    var Listname = '';
    var text;
    terminal.push(function(command2) {
    
        Listname = command2;
        var requestUri = SiteUrl + '/_api/web/lists/GetByTitle(\''+Listname+'\')';
        var requestHeaders = {
        "accept": "application/json;odata=verbose"
        }
        

        $.ajax({
            url: requestUri,
            type: 'GET',
            dataType: 'json',
            async: false,
            headers: requestHeaders,
            success: function (data) 
            {      
            
                data = data.d.results;

                for(i in data){
                    terminal.echo(data[i][Listname]);
            
                }
                
                
            },
            error: function ajaxError(response) {
                console.log(response.status + ' ' + response.statusText);
            }
        });

    }, {
        prompt: 'List name > '
    }); 


    return text;
}
