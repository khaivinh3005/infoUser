var elementListProducts = document.querySelector('#list-products');
var elementName = document.querySelector('#name');
var elementSubmit = document.querySelector('#btnAdd');
var btnSearch = document.querySelector('#btnSearch');
var elementValueSearch = document.querySelector('#nameSearch');
var elementIdSearch = document.querySelector('#idSearch');
var btnSearchValue = document.querySelector('#btnSearchValue');

axios({
  method: 'get',
  url: 'https://637385570bb6b698b60e587c.mockapi.io/Products',
})
  .then(function (response) {
    var list = response.data;
    localStorage.setItem('listDS', JSON.stringify(list));
    showListProducts(list);
  })
  .catch(function (error) {
    console.log('error : ', error);
  });

function showListProducts(list) {
  var str = '';
  list.forEach((item, index) => {
    str += `
    <div class="col-4">
    <div class="card" style="width: 18rem">
      <img
        src=${item.avatar}
        class="card-img-top"
        alt="..."
      />
      <div class="card-body">
        <h5 class="card-title">${item.name}</h5>
        <p class="card-text">
          Some quick example text to build on the card title and make up
          the bulk of the card's content.
        </p>
        <a href="detail.html?thongTin=${item.id}" class="btn btn-primary">Chi tiet</a>
      </div>
    </div>
  </div>
    `;
  });

  elementListProducts.innerHTML = str;
}

elementSubmit.addEventListener('click', function () {
  var name = elementName.value;
  var randomNumber = Math.random();

  if (/\d/.test(name) || !name) {
    alert('Value phải là chữ không bao gồm số');
  } else {
    var newItem = {
      name: name,
      avatar: `https://picsum.photos/200/300?random=${randomNumber}`,
    };
    if (name) {
      axios({
        method: 'POST',
        url: `https://637385570bb6b698b60e587c.mockapi.io/Products`,
        data: newItem,
      }).then(function () {
        location.reload();
      });
    }
  }
});

btnSearch.addEventListener('click', function () {
  var valueSearch = elementIdSearch.value;
  if (valueSearch) {
    axios({
      method: 'get',
      url: `https://637385570bb6b698b60e587c.mockapi.io/Products/${valueSearch}`,
    })
      .then(function (response) {
        var newArr = [];
        newArr.push(response.data);
        showListProducts(newArr);
      })
      .catch(function (error) {
        alert('ID không tồn tại');
        elementIdSearch.value = '';
      });
  }
});

btnSearchValue.addEventListener('click', searchValue);
elementValueSearch.addEventListener('keyup', searchValue);

function searchValue() {
  if (localStorage.getItem('listDS')) {
    var listDS = JSON.parse(localStorage.getItem('listDS'));
  }
  var nameSearch = elementValueSearch.value.toLowerCase().replace(/\s/g, '');
  var listNewArr = [];
  var indexValue = listDS.findIndex((item, index) => {
    var newValue = item.name
      .toLowerCase()
      .replace(/\s/g, '')
      .includes(nameSearch);
    if (newValue) {
      listNewArr.push(listDS[index]);
    }
  });

  showListProducts(listNewArr);
}
