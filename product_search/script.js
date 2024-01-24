'use strict'

// * fetch practicing

// fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
//   .then((response) => {
//     if (!response.ok) throw new Error('Could not fetch resource')
//     return response.json()
//   })
//   .then((data) => console.log(data.id))
//   .catch((error) => console.error(error))

const cardRow = document.querySelector('[data-row]')
const searchInput = document.querySelector('[data-search]')
const submitBtn = document.querySelector('[data-submitBtn]')

// fetch('https://dummyjson.com/products')
//   .then((res) => res.json())

//   .then((data) => {})

const deleteProduct = function (arr, id) {
  arr.filter((item) => item.id !== id)
}

const loopFunc = function (param) {
  param.forEach(
    (product) =>
      (cardRow.innerHTML += `
          <div class="col-md-4">
            <div class="card">
              <img src="${product.thumbnail}" class="card-img-top" alt="${product.brand}" />
              <div class="card-body">
                <h5 class="card-title">${product.title}</h5>
                <p class="card-text">${product.description}</p>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">$${product.price}</li>
                <li class="list-group-item">${product.stock} in stock</li>
                <li class="list-group-item">⭐${product.rating}</li>
              </ul>
              <button class="btn btn-primary" onclick="deleteProduct(${param}, ${product.id})">Delete item</button>
            </div>
          </div>
                          
    `)
  )
}

const fetchProducts = async function () {
  try {
    const response = await fetch('https://dummyjson.com/products')
    if (!response.ok) {
      throw new Error('Could not fetch resource')
    }
    const data = await response.json()
    return data.products
  } catch (err) {
    console.log(err)
  }
}

fetchProducts().then((data) => {
  loopFunc(data)

  submitBtn.addEventListener('click', () => {
    cardRow.innerHTML = ''
    let filteredData = data.filter((item) =>
      item.title.toLowerCase().includes(searchInput.value.toLowerCase())
    )
    filteredData.length ? loopFunc(filteredData) : (cardRow.innerHTML = 'Empty')
  })
})
