function GetSiteInfo(){
    terminal.echo('get list info na');
    var text = '\n';
    var Reserve = 50;
    text = JSON.stringify(_spPageContextInfo, null , 2);
    text = text.replace(/"/g,'');
    text = text.replace(/,/g,'');
    SiteUrl = _spPageContextInfo.webServerRelativeUrl;

    return text;
}