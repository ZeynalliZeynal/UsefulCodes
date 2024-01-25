'use strict'
const data = [
  { name: 'Bitcoin', ticker: 'BTC', value: '9685', change: '2.83%' },
  { name: 'Ethereum', ticker: 'ETH', value: '210.5', change: '6.17%' },
  { name: 'Ripple', ticker: 'XRP', value: '0.2812', change: '2.47%' },
  { name: 'Bitcoin Cash', ticker: 'BCH', value: '441.4', change: '5.01%' },
  { name: 'Bitcoin SV', ticker: 'BSV', value: '303.17', change: '5.53%' },
  { name: 'Litecoin', ticker: 'LTC', value: '74.935', change: '4.25%' },
  { name: 'Tether', ticker: 'USDT', value: '0.9994', change: '-1.7%' },
  { name: 'EOS', ticker: 'EOS', value: '4.6161', change: '3.15%' },
  { name: 'Binance Coin', ticker: 'BNB', value: '19.824', change: '-3.82%' },
  { name: 'Cardano', ticker: 'ADA', value: '0.060389', change: '2.93%' },
  { name: 'Tezos', ticker: 'XTZ', value: '2.1247', change: '6.12%' },
  {
    name: 'Ethereum Classic',
    ticker: 'ETC',
    value: '12.5988',
    change: '4.09%',
  },
  { name: 'Stellar', ticker: 'XLM', value: '0.07034', change: '-4.10%' },
  { name: 'Monero', ticker: 'XMR', value: '79.523', change: '3.45%' },
  { name: 'TRON', ticker: 'TRX', value: '0.020881', change: '5.21%' },
]

const headRow = document.querySelector('.head-row')
const tableRow = document.querySelector('.table-body')
const searchInput = document.querySelector('.search-bar input')
const btnImg = document.querySelector('.btn--secondary img')

Object.keys(data[0]).forEach(
  (key) =>
    (headRow.innerHTML += `
                  <button class="head-column">
                    <span class="heading">${key.toUpperCase()}</span>
                    <span class="sort-icon">
                      <img src="./app/assets/icons/column-sorting.svg" alt=""/>
                    </span>
                  </button>
`)
)

// * rendering data
loopData(data)

// * Search bar typing event
searchInput.addEventListener('keyup', () => {
  tableRow.innerHTML = ''
  let filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      item.ticker.toLowerCase().includes(searchInput.value.toLowerCase())
  )

  if (filteredData.length) {
    loopData(filteredData)
  } else {
    tableRow.innerHTML += `<img width="200" height="200" src="./app/assets/image/2748558.png" alt="not found" />`
  }
})

// ! PROBLEM YARANDI!!!
const checkboxList = document.querySelectorAll('.checkbox input')
checkboxList.forEach((checkbox) => {
  checkbox.addEventListener('change', (e) => {
    if (e.target.checked) btnImg.src = './app/assets/icons/trash-filled.svg'
    else btnImg.src = './app/assets/icons/filter.svg'
  })
})

// ! BUNA DA BAXILMALIDI
const headColumnList = document.querySelectorAll('.head-column')
headColumnList.forEach((headColumn) => {
  headColumn.addEventListener('click', (e) => {
    if (!e.target.classList.contains('heading')) return
    data.sort((a, b) => a.name.localeCompare(b.name))
  })
})

function loopData(param) {
  param.forEach((item) => {
    tableRow.innerHTML += `
    <div class="body-row">
      <div class="body-column">
        <span class="checkbox">
          <input type="checkbox" />
        </span>
      </div>
      <div class="body-column">${item.name}</div>
      <div class="body-column">${item.ticker}</div>
      <div class="body-column">${item.value}</div>
      <div class="body-column ${
        +item.change.slice(0, item.change.length - 1) >= 0
          ? 'green-txt'
          : 'red-txt'
      }">${item.change}</div>
    </div>
  `
  })
}
