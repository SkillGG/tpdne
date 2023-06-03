import { writeFileSync } from "fs";
import fetch from "node-fetch";

function toBuffer(ab: ArrayBuffer) {
    var buf = Buffer.alloc(ab.byteLength);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buf.length; ++i) {
        buf[i] = view[i];
    }
    return buf;
}

const writePictureToFile = (id: number, data: ArrayBuffer) => {
    writeFileSync(`./o/${id}.png`, toBuffer(data));
};

let getPicture = async (id, previous) => {
    let bits = await fetch("https://thispersondoesnotexist.com/image").then(
        (response) => response.arrayBuffer()
    );
    if (bits.byteLength !== previous) {
        writePictureToFile(id, bits);
        return bits;
    } else {
        console.log("Duplicate");
        return null;
    }
};

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

let prevoius = 0;
const getPictures = async (amount: number, sleep_time: number) => {
    let img_num = 0;
    do {
        console.log("Zdjecie #", img_num);
        let img_bits: ArrayBuffer | null = null;
        do {
            img_bits = await getPicture(img_num, prevoius);
            prevoius = img_bits?.byteLength || -1;
            console.log("Wait ", sleep_time, "ms");
            await sleep(sleep_time);
        } while (!img_bits);
        console.log("========");
        img_num++;
    } while (img_num < amount);
    return;
};

getPictures(100, 0);
