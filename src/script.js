const getData = fetch('http://localhost:8080/api/entry/get')
  .then(function(response) {
    return response.json();
  }).then(function(data) {
    console.log(data);
    console.log(data.success);
    console.log(data.info);
    console.log(data.payload[0].id);
    console.log(document.getElementById('testing'));
    document.getElementById('testing').innerHTML = data.info;
  });
  
