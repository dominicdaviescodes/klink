var request = new XMLHttpRequest();
request.open('GET', 'json/images.json', true);

request.onload = function () {
  if (request.status >= 200 && request.status < 400) {
    // file is found and loaded
    var data = JSON.parse(request.responseText);
    console.log(data);
  } else {
    var lMessage = request.status + ' File not found!';
    alert(lMessage);
  }
}

request.send();