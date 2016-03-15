var redirectUri = "http://crcpowerbitest.azurewebsites.net/javaScriptTest/";

function getPowerBICallback(error, token){
  console.log("error: " + error );
  console.log("token: " + token);
}


function getPowerBI()
{
  var app = angular.module('demoApp', ['ngRoute', 'AdalAngular'])

  var url = window.location.href
  console.log(url);
  console.log(url.length);
  if(url.length != redirectUri.length){
    var token = getQueryVariable("id_token");
    callPowerBIRest(token);
  }

    var config ={
      tennant : "d1d9a26e-4032-4531-bb5c-0f49ab4a616c",//"powerbiUser@crcpb.onmicrosoft.com",
      clientId : "d389ac00-f00d-45d1-bf50-befa84eb805b",
      redirectUri : redirectUri,
      //instance : "https://login.microsoftonline.com/",
      endpoints: {
          "https://api.powerbi.com": "https://analysis.windows.net/powerbi/api",
        },
      requireADLogin: true,
    };


    var authContext = new AuthenticationContext(config);

    authContext.login();
    token = authContext.acquireToken ("https://analysis.windows.net/powerbi/api", getPowerBICallback);
    token2 = authContext.getCachedToken("https://analysis.windows.net/powerbi/api");


    console.log("t2: " + token2);
    console.log("t1: " + token);
    console.log("got here");

}

function getQueryVariable(variable) {
    var query = window.location.hash.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
}

function callPowerBIRest(token){
    if(token == null){
        console.log("The token is null");
        return;
    }
    else{
      var request = new XMLHttpRequest();

      request.open('GET', 'https://api.powerbi.com/v1.0/myorg/datasets');
      request.setRequestHeader("Authorization", "Bearer " + token);

      request.onreadystatechange = function () {
        if (this.readyState === 4) {
          console.log('Status:', this.status);
          console.log('Headers:', this.getAllResponseHeaders());
          console.log('Body:', this.responseText);
        }
      };

      request.send();
    }
}
