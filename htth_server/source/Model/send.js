module.exports = function(io){

	io.InZone = function(data,me) {
	

		this.clients.forEach(function(client){
			if (client.map == me.pos.map && client.zone == me.pos.zone) {
				client.since04(data);
			}
		});

	}
	
	io.Zone = function(data,me) {

		this.clients.forEach(function(client){
			if (client.map == me.pos.map && client.zone == me.pos.zone && client.id != me.id) {
				client.since04(data);
			}
		});

	}

	// Phát sóng tới tất cả người dùng và khách
	io.all = function(data, noBroadcast = null){
		this.clients.forEach(function(client){
			if (client.admin == false && noBroadcast !== client) {
				client.dn(data);
			}
		}); 
	};

	io.to = function(data,uid)
	{
		this.clients.forEach(function(client){
			if (+client.id == +uid) {
				client.dn(data);
			}
		});
	}

	io.admin = function(data,noBroadcast = null)
	{
		this.clients.forEach(function(client){
			if (client.admin == true && noBroadcast !== client) {
				client.dn(data);
			}
		});
	}

	io.chuyentien = function(data,uid)
	{
		this.clients.forEach(function(client)
		{
			if(+client.id == +uid)
			{
				client.dn(data);
			}
		});
	}
	
};
 