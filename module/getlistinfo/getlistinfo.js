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

    }, {
        prompt: 'List name > '
    }); 


    return text;
}
