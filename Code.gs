function doGet() {
  return HtmlService.createTemplateFromFile('Index').evaluate();
}
 
//GET DATA FROM GOOGLE SHEET
function getData(){
  var spreadSheetId='1fsyu8Ftk2PPuLUo5n1ACDIU8kcdioZFtimOzL_M00_k';
  var ss = SpreadsheetApp.openById(spreadSheetId);
  var sheet = ss.getSheetByName("GET_Method");
  var json_data = sheet.getRange(2,1,sheet.getLastRow()-1, sheet.getLastColumn()).getValues();
   var data_arr = [];
   //array format we can push
  for (i in json_data) {
    var row = json_data[i];
    var Name = row[1];
    var Email = row[2];
    var arr_data = {
      Name,
      Email
    }
    data_arr.push(arr_data);
  } 

  //Logger.log(data_arr);
  return data_arr;
}

//INCLUDE JAVASCRIPT
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}