import {writeFileSync as wf} from "fs";
import fetch from "node-fetch";

const timeName = "10 Zdjec";

console.time(timeName);

function toBuffer(ab) {
    var buf = Buffer.alloc(ab.byteLength);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buf.length; ++i) {
        buf[i] = view[i];
    }
    return buf;
}

let los = async(x,p)=>{
let bits  = await fetch("https://thispersondoesnotexist.com/image").then(r=>r.arrayBuffer());
if(bits.byteLength !== p){
	wf(`./o/${x}.png`, toBuffer(bits));
	return bits;
}
else{
	console.log("Duplicate");
	return null;
}
};

const sleep = ms => new Promise( res => setTimeout(res, ms));

let p = null;
let r = async (n,t)=>{
let x = 0;
let pause = 0;
do {	
	console.log("Zdjecie #", x);
	let z = null;
	do{
		z = await los(x, p);
		console.log("Spanie ", t, "ms");
		await sleep(t);
	}while(!z);
	console.log("========");
	x++;
} while(x < n)
return;
};

r(5000,0).then(_=>console.timeEnd(timeName));
