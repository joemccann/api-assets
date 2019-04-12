const test = require('tape')
const { 'api-assets': assets } = require('.')

//
// Create a stubbed response object
//
const res = {
  send: (body) => {
    return body
  }
}

const { error } = console

test('sanity', t => {
  t.ok(true)
  t.end()
})

test('pass - fetch Binance assets', async t => {
  const req = {
    body: {
      exchange: 'Binance'
    }
  }

  const { err, data } = await assets(req, res)

  if (err) {
    error(err)
    return t.end()
  }

  t.ok(!err)
  t.ok(data)
  t.true(Array.isArray(data))

  const testItem = data.pop()
  const {
    base,
    original,
    pair,
    quote
  } = testItem

  t.ok(testItem)
  t.ok(base)
  t.ok(original)
  t.ok(pair)
  t.ok(quote)
  t.end()
})

test('pass - fetch Coinbase assets', async t => {
  const req = {
    body: {
      exchange: 'Coinbase'
    }
  }

  const { err, data } = await assets(req, res)

  if (err) {
    error(err)
    return t.end()
  }

  t.ok(!err)
  t.ok(data)
  t.true(Array.isArray(data))

  const testItem = data.pop()
  const {
    base,
    original,
    pair,
    quote
  } = testItem

  t.ok(testItem)
  t.ok(base)
  t.ok(original)
  t.ok(pair)
  t.ok(quote)
  t.end()
})

test('fail - fetch XXX assets ', async t => {
  const req = {
    body: {
      exchange: 'XXX'
    }
  }
  const { err, data } = await assets(req, res)
  t.ok(!data)
  t.ok(err)
  t.equals(err, 'Exchange, XXX, is not supported.')
  t.end()
})
