const http = require('http');
const hostname = 'localhost';
const port = 3000;
const ProgressBar = require('progress')

const request = require('request');

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'dev',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})


const getPlayers =  (pageCount)=>{
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
				//console.log('Succesfully Inserted:'+player.first_name+' '+player.last_name)
		    }
		    //onsole.log(results.rows);
		  })	
	  })
	  if(body.meta.next_page>0){
	  //setTimeout(getPlayers,1500,body.meta.next_page);
	  }

	})
}

getPlayers(0)

