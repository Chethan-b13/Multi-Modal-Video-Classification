const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "83c507a6c5mshff8ae5f4dfa54ddp18a8dejsn22e07c04efc1",
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

const fetchFromApi = (url) => {
  fetch(`https://youtube-v31.p.rapidapi.com/${url}`, options).then((res) => {
    return res.json().catch((err) => {
      console.log("error");
    });
  });
};

// fetch(
//   "https://youtube-v31.p.rapidapi.com/search?relatedToVideoId=7ghhRHRP6t4&part=id%2Csnippet&type=video&maxResults=50",
//   options
// )
