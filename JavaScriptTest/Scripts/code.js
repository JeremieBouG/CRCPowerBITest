
function getPowerBICallback(error, token){
  console.log("error: " + error );
  console.log("token: " + token);

  if(token != null){
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


function getPowerBI()
{
  var app = angular.module('demoApp', ['ngRoute', 'AdalAngular'])

  // using '!' as the hashPrefix but can be a character of your choosing
   app.config(['$locationProvider', function($locationProvider) {
       $locationProvider.html5Mode(true).hashPrefix('!');
   }]);


    var config ={
      tennant : "powerbiUser@crcpb.onmicrosoft.com",
      clientId : "d389ac00-f00d-45d1-bf50-befa84eb805b",
      redirectUri : "file:///C:/Users/CRC/Desktop/JavaScriptTest/index.html",
      instance : "https://login.microsoftonline.com/f78105d2-b96b-4be9-bda6-06d8a6444a25"
    };

    var user = {
      userName: "powerbiUser",
      profil: null
    }




  var authContext = new AuthenticationContext(config);

  authContext.login();
  authContext.acquireToken ("https://analysis.windows.net/powerbi/api", getPowerBICallback);
  console.log("got here");



}
