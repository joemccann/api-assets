const Binance = require('binance-api-node')
const binance = Binance.default()
const { PublicClient: Coinbase } = require('gdax')
const coinbase = new Coinbase()

const ERR_NO_EXCHANGE = `An exchange is required: 'binance' || 'coinbase'.`

const fetchAssets = async (exchange) => {
  let exchangeAssets = null

  if (exchange === 'BINANCE') {
    try {
      const { symbols } = await binance.exchangeInfo()
      exchangeAssets = symbols
    } catch (err) {
      if (err) return { err }
    }

    const data = exchangeAssets
      .filter(item => item.status === 'TRADING')
      .map(item => ({
        base: item.baseAsset,
        original: item.symbol,
        pair: [item.quoteAsset, item.baseAsset].join('-'),
        quote: item.quoteAsset
      }))

    return { data }
  }
  if (exchange === 'COINBASE') {
    try {
      exchangeAssets = await coinbase.getProducts()
    } catch (err) {
      return { err }
    }

    const data = exchangeAssets.map(item => ({
      base: item.base_currency,
      original: item.id,
      pair: [item.quote_currency, item.base_currency].join('-'),
      quote: item.quote_currency
    }))

    return { data }
  } else return { err: `Exchange, ${exchange}, is not supported.` }
}

exports['api-assets'] = async (req, res) => {
  const {
    body,
    query
  } = req

  let exchange = body.exchange || query.exchange

  if (!exchange) return res.send({ err: ERR_NO_EXCHANGE })

  exchange = exchange.toUpperCase()

  const { err, data } = await fetchAssets(exchange)
  if (err) return res.send({ err })
  return res.send({ data })
}
