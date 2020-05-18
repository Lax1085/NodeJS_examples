const http = require('http');
const hostname = 'localhost';
const port = 3000;
const ProgressBar = require('progress')
var tools = require('./getPlayers');

const request = require('request');

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'dev',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})


const getTeams =  (pageCount)=>{
		console.log('https://www.balldontlie.io/api/v1/teams?page='+pageCount);
		request('https://www.balldontlie.io/api/v1/teams?page='+pageCount, { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }
	  console.debug(body.meta);
	  let teams=body.data

	  teams.forEach(team=>{	   	
	  		let query="INSERT INTO teams VALUES ("
	  			+"'"+team.id+"'"+","
	  			+"'"+team.abbreviation+"'"+","
	  			+"'"+team.city+"'"+","
	  			+"'"+team.full_name+"'"+","
	  			+"'"+team.name+"'"+","
	  			+"'"+team.conference+"'"+","
	  			+"'"+team.division+"'"
	  			+");";	 

	  		//console.log(query); 	
		    pool.query(query, 
			(error, results) => {
		    if (error) {		    	
				console.log("Error! "+"ID:"+team.id+"\nQuery:"+query);		     				
		    }
		    else{
				//console.log('Succesfully Inserted:'+team.full_name+' '+team.city)
		    }
		    //onsole.log(results.rows);
		  })	
	  })
	  if(body.meta.next_page>0){
	  //setTimeout(getPlayers,1500,body.meta.next_page);
	  }

	})
}
const getPlayers =  (pageCount)=>{
		console.log('https://www.balldontlie.io/api/v1/players?page='+pageCount);
		request('https://www.balldontlie.io/api/v1/players?page='+pageCount, { json: true }, (err, res, body) => {
	  if (err) { return console.log(err); }
	  console.debug(body.meta);
	  let players=body.data

	  players.forEach(player=>{	  
	  		if(player.height_feet==null)
	  			player.height_feet=0;
	  		if(player.weight_pounds==null)
	  			player.weight_pounds=0;	 
	  		player.height_feet=parseInt(player.height_feet);
	  		player.weight_pounds=parseInt(player.weight_pounds)		  		
	  		let height=(player.height_feet*12)+player.height_inches; 		
	  		let query="INSERT INTO players VALUES ("
	  			+"'"+player.first_name.replace(/'/g, '\'\'')+"'"+","
	  			+"'"+player.last_name.replace(/'/g, '\'\'')+"'"+","
	  			+"'"+player.id+"'"+","
	  			+"'"+height+"'"+","
	  			+"'"+parseInt(player.weight_pounds)+"'"+","
	  			+"'"+player.position+"'"+","
	  			+"'"+player.team.id+"'"
	  			+");";	 

	  		//console.log(query); 	
		    pool.query(query, 
			(error, results) => {
		    if (error) {
				console.log("Error! "+"ID:"+player.id+"\n Query:"+query);		     
		    }
		    else{
				//console.log('Succesfully Inserted:'+player.first_name+' '+player.last_name)
		    }
		    //onsole.log(results.rows);
		  })	
	  })
	  if(body.meta.next_page>0){
	  	setTimeout(getPlayers,1500,body.meta.next_page);
	  }

	})
}
getTeams(0);
getPlayers(0);


