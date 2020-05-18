const http = require('http');
const hostname = 'localhost';
const port = 3000;
const ProgressBar = require('progress')

//console.debug(process);

//const args= process.argv.slice(2)
//const args = require('minimist')(process.argv.slice(2))

const array={1:"alex", 2:"test", 3:"car"};
console.log('My %s has %d years', 'cat', 2)


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

//const interval=setInterval(getPlayers(0),10000);


/*

const https = require('https')
const options = {
  hostname: 'www.balldontlie.io',
  path: '/api/v1/players',
  method: 'GET'
}
data=""
const req = https.request(options, res => {
  //console.log(`statusCode: ${res.statusCode}`)
  let temp;
  res.on('data', d => {
	//process.stdout.write("!!!: "+d) 
	temp.concat(temp,d);
  })
  //const test=JSON.parse(d);
  console.debug(temp);
  
})

req.on('error', error => {
  console.error(error)
})

req.end()

*/
//console.debug(data);
/*objects.forEach(record=>{

	console.log('******START*********');
	console.log(record);
	console.log('******END*********');

})*/



/*const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  jsonOutput=JSON.stringify(array);
  //console.debug(jsonOutput);
  res.end(jsonOutput);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);

});*/