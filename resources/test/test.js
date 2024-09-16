const mongoose = require("mongoose")
const Product = require("../../backend/models/ProductCard")

const pdt = "redmi note 10 pro" 
const key = "AIzaSyARj3WZVsYwxmVkXhJUwSBkIam-CrcgTL4"
const cx = "31e5ee6051dd446c5"
const run = async () => {
const res = await fetch(`https://customsearch.googleapis.com/customsearch/v1?key=${key}&cx=${cx}&q=${pdt}`)
const js = await res.json()
const urls = []
// console.log(js)
for(const item of js.items){
    // if(item.displayLink.includes("flipkart")&&item.link.includes("/p/")){
    //     urls.push({domain:item.displayLink,link:item.link})
    // }else 
    if(item.displayLink.includes("amazon")&&item.link.includes("/dp/")){
        urls.push({domain:item.displayLink,link:item.link})
    }
}
for (const url of urls){
    const res = await fetch("http://127.0.0.1:5000/scrape",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({url:url.link})
    })
    const data = await res.json()
    console.log(data)
}
}

// run()
// const str = "https://m.media-amazon.com/images/I/61-TYuZIx8L._SY606_.jpg\":[606,397],\"https://m.media-amazon.com/images/I/61-TYuZIx8L._SY679_.jpg\":[679,445],\"https://m.media-amazon.com/images/I/61-TYuZIx8L._SY550_.jpg\":[550,360],\"https://m.media-amazon.com/images/I/61-TYuZIx8L._SY741_.jpg\":[741,485],\"https://m.media-amazon.com/images/I/61-TYuZIx8L._SY879_.jpg\":[879,576],\"https://m.media-amazon.com/images/I/61-TYuZIx8L._SY445_.jpg\":[445,291],\"https://m.media-amazon.com/images/I/61-TYuZIx8L._SY500_.jpg\":[500,328]}"
// const obj = str.split("\"")
// console.log(obj)
function getRandomDate(startDate, endDate) {
    const startTimestamp = startDate.getTime();
    const endTimestamp = endDate.getTime();
    
    // Generate a random timestamp between start and end dates
    const randomTimestamp = startTimestamp + Math.random() * (endTimestamp - startTimestamp);
    
    // Create a new Date object using the random timestamp
    const randomDate = new Date(randomTimestamp);
  
    return randomDate;
  }
  const connectToMongo = async () => {
    try {
        const mongoURI = "mongodb+srv://varad:l3275wVCvTbgJl1Y@cluster0.6hf4iqs.mongodb.net/";
        const con = await mongoose.connect(mongoURI);
        console.log("Mongo connected");
        return true
    }
    catch (error) {
        console.log(error);
        process.exit();
        return false
    }
}
const f2 = async () => {
    const r = await connectToMongo()
    const pdts = []
    const pdtsFreq = {}
    const startDate = new Date('2020-01-01'); // replace with your start date
    const endDate = new Date('2023-12-31'); 
    const json = require("./dummy.json")
    let ctr=0;
    if(r){
    for(const item of json){
        const randomDate = getRandomDate(startDate, endDate);
        const name = item.product_name
        const link = item.product_url
        const createdAt = randomDate
        const category = item.category
        const price = item.retail_price
        const description = item.description
        const brand = "www.flipkart.com"
        const images = [item.image]
        const storedPrice = await Product.create({name, price, createdAt, description, brand, link, images, category})
        console.log(storedPrice)
        console.log(ctr++)
    }
}
    console.log("success")
}

// f2()

const data =  {
    some : "dta",
    price : "US $100"
}

let temp = data.price.replace("US $","")
temp = (parseFloat(temp)*83.12).toString()
data.price = temp

console.log(data)