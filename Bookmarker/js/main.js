//listen to submit
document.getElementById('myForm').addEventListener('submit',saveBookmark);

function saveBookmark(e){
  //get form values
  var siteName=document.getElementById('siteName').value;
  var siteURL=document.getElementById('siteURL').value;
  //console.log(siteName);

  if(!validateForm(siteName,siteURL)){
    return false;
  }
  var bookmark={
    name:siteName,
    url:siteURL
  }
  //console.log(bookmark);

  //Local Storage stylesheet
  /*
        localStorage.setItem('test','HelloWOrld');
        console.log(localStorage.getItem('test'));
        localStorage.removeItem('test');
        console.log(localStorage.getItem('test'));
  */
  //test if bookmarks is null
  if(localStorage.getItem('bookmarks')===null)
  {
    //initialize a array
    var bookmarks=[];
    //add to array
    bookmarks.push(bookmark);
    //set to local local
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
  }
  else {
    var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));  //string
    //add bookmark to array
    bookmarks.push(bookmark);
    //re-set back to local Storage;
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
  }
  //re fetch bookmarks
  fetchBookmarks();
  //to prevent flashing/or prevent from submitting
  e.preventDefault();
}
//deleteBookmark function
function deleteBookmark(url) {
  //get bookmarks from localStorage
  var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
  //loop through bookmarks
  for(var i=0;i<bookmarks.length;i++)
  {
    if(bookmarks[i].url==url){
      bookmarks.splice(i,1);
    }
  }
  //reset back to localStorage
  localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

  //re fetch bookmarks
  fetchBookmarks();
}
function fetchBookmarks(){
  var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
  //get output id
  var bookmarksResults=document.getElementById('bookmarksResults');
  //build output
  bookmarksResults.innerHTML='';

  for(var i=0;i<bookmarks.length;i++){
    var name=bookmarks[i].name;
    var url=bookmarks[i].url;
    bookmarksResults.innerHTML+= '<div class="well">' +
                                  '<h3>'+name+
                                  '<a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>'+
                                  '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger"  href="#">Delete</a>'+
                                  '</h3>' +
                                  '</div>';
  }
  //console.log('bookmarks');
}
function validateForm(siteName,siteURL){
  if(!siteName||!siteURL)
  {
    alert("Please Fill in the box");
    return false;
  }
  //to check for https
  var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);
  if(!siteURL.match(regex)){
    alert('Please Use Valid https url');
    return false;
  }
  return true;
}
