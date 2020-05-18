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