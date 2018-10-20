var canvas = document.getElementById("cnvs_out");
var ctx = canvas.getContext("2d");
var p_coords = document.getElementById("p_coords");
var p_count = document.getElementById("p_count");
var x = canvas.width/2,y = canvas.height/2;
var vertices = [];
var num;

function showCoords(event)	{
	var rect = canvas.getBoundingClientRect();
	var currX = Math.floor(event.clientX - rect.left);
	var currY = Math.floor(event.clientY - rect.top);
	if (currX>=0 && currX<=canvas.width && currY>=0 && currY<=canvas.height)
		p_coords.innerText = "(" + currX + "," + currY + ")";
	else
		p_coords.innerText = "";
 }

function getCoordinates()	{
	num = parseInt(document.getElementById("input_num").value);
	document.getElementById("p_msg").innerText = "Cool! Now Select " + num + " coordinates for each vertex";
} 
 
function getVertices(event)	{
	var rect = canvas.getBoundingClientRect();
	x = Math.floor(event.clientX - rect.left);
	y = Math.floor(event.clientY - rect.top);
	if (num>0)	{
		ctx.fillRect(x,y,2,2);
		vertices.push([x,y]);
		num--;
		if (num==0)
			document.getElementById("p_msg").innerText = "Now select the starting coordinate!";
		else
			document.getElementById("p_msg").innerText = "Great! " + num + " vertices to go";
	}
	else	{
		document.getElementById("p_msg").innerText = "Hit the start button to see the magic!";
		ctx.fillRect(x,y,2,2);
	}
}

function start()	{
	var count = 0;
	var factor;
	switch (vertices.length)	{
			case 3:
				factor = 1/2;
				break;
			case 4 :
				factor = 1/2;
				break;
			case 5 :
				factor = 3/8;
				break;
			case 6 :
				factor = 1/3;
				break;
	}
	var temp = setInterval(function()	{
		if (count >10000)
			clearInterval(temp);
		count++;
		p_count.innerText = "Dots : " + count;
		var randomVertex = Math.floor((Math.random()*vertices.length)+1);
		x = x + (vertices[randomVertex - 1][0]-x)*factor;
		y = y + (vertices[randomVertex - 1][1]-y)*factor;
		ctx.fillRect(x,y,2,2);
	},1);
}