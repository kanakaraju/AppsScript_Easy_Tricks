//folder id's
var folderID = "1jWhMHFzAxrnKk4k22uP5xfrhOqoKqkCv"; 
var folderIDMedia = "1-FosdlZ2YEmqcPTFFgtr2Myq5nTX6jDb"; 
var sheetName = "Data"; 

function doGet() {
  return HtmlService.createTemplateFromFile('Index').evaluate();
}

/* @Include JavaScript and CSS Files */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

function uploadFiles(formObject) {
  try {
    //documents upload url and name
    var folder = DriveApp.getFolderById(folderID);
    var sheet = SpreadsheetApp.getActive().getSheetByName(sheetName);
    var fileUrl = "";
    var fileName = "";

    //images and videos upload url and names
    var folderMedia = DriveApp.getFolderById(folderIDMedia);
    var sheet = SpreadsheetApp.getActive().getSheetByName(sheetName);
    var fileUrlMedia = "";
    var fileNameMedia = "";

    //Upload file if exists and update the file url
    if (formObject.myFile.length > 0) {
      var blob = formObject.myFile;
      var file = folder.createFile(blob);
      file.setDescription("Uploaded by " + formObject.name);
      fileUrl = file.getUrl();
      fileName = file.getName();
    } else{
      fileUrl = "Record saved without a file";
    }

    if (formObject.myFileMedia.length > 0) {
      var blob = formObject.myFileMedia;
      var fileMedia = folderMedia.createFile(blob);
      fileMedia.setDescription("Uploaded by " + formObject.name);
      fileUrlMedia = fileMedia.getUrl();
      fileNameMedia = fileMedia.getName();
    } else{
      fileUrlMedia = "Record saved without a file";
    }

    //Saving records to Google Sheet
    sheet.appendRow([
      formObject.name,
      formObject.email,
      formObject.profession,
      formObject.subject,
      formObject.message,
      fileName,
      fileUrl,
      fileNameMedia,
      fileUrlMedia,
      Utilities.formatDate(new Date(), "GMT+5:30", "yyyy-MM-dd'T'HH:mm:ss'Z'")]);
    
    // Return the URL of the saved file
    return fileUrl;
    
  } catch (error) {
    return error.toString();
  }
}