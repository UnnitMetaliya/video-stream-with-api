function getVideo() {
  //defining API endpoint

  let baseUrl = "https://www.cbc.ca/bistro/order?mediaId=";
  let videoID = document.getElementById("video-id").value;
  let seedUrl = baseUrl + videoID;

  //fetching the JSON data
  fetch(seedUrl)
    .then(function(response) {
      if (!response.ok) {
        alert(
          "Wrong Video ID! Hint: If you don't know correct ID, use from suggestions!"
        );
        window.location.href = "index.html";
      }
      return response.json();
    })
    .then(function(json) {
      //getting the element where children need to be appended
      var videos = document.getElementsByClassName("web-player")[0];

      //parsing the data
      var items = json.items;

      for (var i = 0; i < items.length; i++) {
        //helper function to set multiple attributes at once as plain javascript don't have this feature.
        function setAttributes(el, attrs) {
          for (var key in attrs) {
            el.setAttribute(key, attrs[key]);
          }
        }

        //creating first video element with controls enabled
        // #web-player > video
        var video = document.createElement("video");

        var posterSource = items[i].thumbnail;
        setAttributes(video, {
          width: "720",
          height: "480",
          poster: posterSource,
          controls: "true"
        });
        videos.appendChild(video);

        // #web-player > video > source
        var source = document.createElement("source");
        video.appendChild(source);

        //extracting and setting video data in DOM

        // #web-player > video > source(video link, type)
        var videoSource = items[i].assetDescriptors[1].key;
        setAttributes(source, { src: videoSource, type: "video/mp4" });

        // #web-player > video > h2(video title)
        var h2 = document.createElement("h2");
        h2.innerHTML = items[i].title;
        videos.appendChild(h2);

        // #web-player > video > hr(separator)
        var hr = document.createElement("hr");
        videos.appendChild(hr);

        // #web-player > video > p(video description)
        var p = document.createElement("p");
        setAttributes(p, { id: "description" });
        p.innerHTML = items[i].description;
        videos.appendChild(p);
      }
    })
    .catch(function(error) {
      console.log(error);
    });

  // hiding the search bar for good user experience
  let toBeHidden = document.getElementById("search-bar");
  toBeHidden.style.display = "none";
}
