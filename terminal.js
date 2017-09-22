var Terminal = function(){
	this.linePrompt = '>'
	this.currentLine = '';
	this.lineHistory = [];
	this.searchEng = "https://www.google.co.uk/search?q=";
	window.addEventListener('keydown', this.backspaceHandler.bind(this), false);
	window.addEventListener('keypress', this.keyHandler.bind(this), false);
	this.reqs = [];
	this.help = [
		'***************************************************',
		'*find    <search string> -- google thing          *',
		'*youtube <opt search>    -- go to youtube         *',
		'*clear                   -- clear screen          *',
		'*help                    -- display this message  *',
        '*reddit  board           -- goto ure fav reddit:-)*',
		'***************************************************'
	]
	this.maxHist = 50;
}

Terminal.prototype.keyHandler = function(e){
	console.log('key handler called.');
	e = e || window.event;
	console.log('got event '+e);
	console.log('THIS REFERS TO: '+this);
	if(e.keyCode == 13){
		this.lineHistory.push(this.currentLine);
		this.currentLine = '';
		console.log('enter pressed. Line history: '+this.lineHistory);
		rtnStatus = this.evalCmd(this.lineHistory[this.lineHistory.length-1]);
		this.lineHistory.push(rtnStatus);
		
		hislen = this.lineHistory.length;
		lineDiff = hislen - this.maxHist
		if(lineDiff > 0){
			this.lineHistory = this.lineHistory.slice(lineDiff, hislen);
		}
	}else if(e.keyCode != 8 && e.keyCode != 32) {
		console.log('enter not pressed, adding key '+e.charCode+'to keyboard.');
		this.currentLine += String.fromCharCode(e.keyCode || e.charCode);
		console.log('current line: '+this.currentLine);
	}
}

Terminal.prototype.backspaceHandler = function(e){
	console.log('keydown found');
	console.log('got event '+e);
	console.log('THIS REFERS TO: '+this);
	if(e.keyCode == 8){
		console.log('backspace!');
		this.currentLine = this.currentLine.substring(0, this.currentLine.length-1); //thisthisthis
	}else if(e.keyCode == 32){
		this.currentLine += String.fromCharCode(e.keyCode || e.charCode);
		console.log('current line: '+this.currentLine);
	}
}

//COMMANDS
Terminal.prototype.evalCmd = function(cmdstr){
	cmdstr = cmdstr.split(' ');
	cmd = cmdstr[0]
	str = cmdstr.slice(1, cmdstr.length);
	status = '**CMDFAIL**';
	switch(cmd){
		case 'find':
			srch = str.toString().replace(/\,/g, ' ');
			window.open(this.searchEng+srch);
			status = '**FNDEXEC**';
			break;
		case 'youtube':
			srch = str.toString().replace(/\,/g, ' ');
			srch = srch? 'results?search_query='+srch : '';
			window.open('http://www.youtube.com/'+srch);
			status = '**YTBEXEC**';
			break;
        case 'reddit':
			brd = str.toString().replace(/\,/g, '');
			window.open('http://boards.4chan.org/'+brd);
			status = '**LDTEXEC**';
		case 'clear':
			this.lineHistory = [];
			status = '**CLREXEC**';
			break;
		case 'help':
			this.lineHistory = this.lineHistory.concat(this.help);
			status = '**HLPEXEC**';
            break;
	}
	return status;
}

Terminal.prototype.getLineHistory = function() {
	return this.lineHistory;
}
Terminal.prototype.getCurrentLine = function() {
	return this.currentLine;
}
Terminal.prototype.getMaxHist = function() {
	return this.maxHist;
}
