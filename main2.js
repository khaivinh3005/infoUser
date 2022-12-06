var elementDetailUser = document.querySelector('#detailUser');
var queryString = window.location.search;
// c1
var indexFrom = queryString.indexOf('=');
var pathNameUrlID = queryString.slice(indexFrom + 1);

// c2
var urlParams = new URLSearchParams(queryString);
var info = urlParams.get('thongTin');
console.log(info);

function callAPI() {
  axios({
    method: 'get',
    url: `https://637385570bb6b698b60e587c.mockapi.io/Products/${pathNameUrlID}`,
  })
    .then(function (response) {
      var userData = [response.data];
      showUserData(userData);
    })
    .catch(function (error) {
      console.log('error : ', error);
    });
}

callAPI();

function showUserData(data) {
  var str = '';
  data.map((element, index) => {
    str += `
        <div class="col-5">
          <img src=${element.avatar} alt="" />
        </div>
        <div class="col-7">
          <div class="card text-black mb-3" style="max-width: 18rem">
            <div class="card-header">Name: ${element.name}</div>
          </div>
        </div>
        `;
  });

  elementDetailUser.innerHTML = str;
}
