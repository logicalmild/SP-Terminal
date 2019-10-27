
function CreateList(SiteUrl) {
    var Listname = '';
    terminal.push(function(command2) {
    
        Listname = command2;
        
        var clientContext = new SP.ClientContext(SiteUrl);
        var oWebsite = clientContext.get_web();
        var listCreationInfo = new SP.ListCreationInformation();
        listCreationInfo.set_title(Listname);
        listCreationInfo.set_templateType(SP.ListTemplateType.announcements);
        // this.oList = oWebsite.get_lists().add(listCreationInfo);
        var oList = oWebsite.get_lists().add(listCreationInfo);
        clientContext.load(oList);
        clientContext.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceeded), Function.createDelegate(this, this.onQueryFailed));
            
    }, {
        prompt: 'List name > '
    }); 
}

function onQuerySucceeded() {
    // var result = oList.get_title() + ' created.';
    terminal.echo('Successful');

}

function onQueryFailed(sender, args) {
    // alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    terminal.echo('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
}