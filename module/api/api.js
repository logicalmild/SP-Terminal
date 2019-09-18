function API(){
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

        return text;
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