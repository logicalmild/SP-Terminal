function LogOut(){

    terminal.push(function(command) {
        var history = terminal.history();
        terminal.clear();
        history.disable();
        
        terminal.push(function(command) {
            if (command.match(/^(y|yes)$/i)) {
                // terminal.echo('execute your command here');
                terminal.logout();
                terminal.clear();
                terminal.pop();
                history.enable();
                
            } else if (command.match(/^(n|no)$/i)) {
                terminal.pop();
                history.enable();
            }
        }, {
            prompt: 'Are you sure to log out ? [y/n]\n'
        });
    
    });
}