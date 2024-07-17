const pdt = "redmi note 10 pro";
const key = "AIzaSyARj3WZVsYwxmVkXhJUwSBkIam-CrcgTL4";
const cx = "31e5ee6051dd446c5";
const run = async () => {
  const res = await fetch(
    `https://customsearch.googleapis.com/customsearch/v1?key=${key}&cx=${cx}&q=${pdt}`
  );
  const js = await res.json();
  const urls = [];
  // console.log(js)
  for (const item of js.items) {
    // if(item.displayLink.includes("flipkart")&&item.link.includes("/p/")){
    //     urls.push({domain:item.displayLink,link:item.link})
    // }else
    if (item.displayLink.includes("amazon") && item.link.includes("/dp/")) {
      urls.push({ domain: item.displayLink, link: item.link });
    }
  }
  for (const url of urls) {
    const res = await fetch("https://insightify-py.onrender.com/scrape", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: url.link }),
    });
    const data = await res.json();
    console.log(data);
  }
};

// run()
const str =
  'https://m.media-amazon.com/images/I/61-TYuZIx8L._SY606_.jpg":[606,397],"https://m.media-amazon.com/images/I/61-TYuZIx8L._SY679_.jpg":[679,445],"https://m.media-amazon.com/images/I/61-TYuZIx8L._SY550_.jpg":[550,360],"https://m.media-amazon.com/images/I/61-TYuZIx8L._SY741_.jpg":[741,485],"https://m.media-amazon.com/images/I/61-TYuZIx8L._SY879_.jpg":[879,576],"https://m.media-amazon.com/images/I/61-TYuZIx8L._SY445_.jpg":[445,291],"https://m.media-amazon.com/images/I/61-TYuZIx8L._SY500_.jpg":[500,328]}';
const obj = str.split('"');
console.log(obj);
