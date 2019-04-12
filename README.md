# SYNOPSIS

🗃 An opinionated, standardized approach to obtaining assets from any cryptocurrency exchange from one REST-ful API.

## REQUIREMENTS

1. A Google Cloud Account.
2. Billing Enabled.
3. API Access Enabled.
4. `gcloud` CLI installed and in your `$PATH`.
5. A preferred configuration created ( `gcloud init` ).

## USAGE

```sh
curl https://${DEFAULT_REGION}-${PROJECT}.cloudfunctions.net/api-assets?exchange=Binance
```

Or, if you prefer a `POST`:

```sh
curl https://${DEFAULT_REGION}-${PROJECT}.cloudfunctions.net/api-assets --data '{"exchange": "Binance"}' -H "Content-Type: application/json"
```

The expected response:

```js
{
  "data":
  [
    {
      "base": 'ETH',
      "original": 'ETHBTC',
      "pair": 'BTC-ETH',
      "quote": 'BTC'
    },
   ...
  ]
}
```

Or in the case there is a failure:

```js
{
  "err": "Exchange, XXX, is not supported."
}
```

## API

```sh
curl https://${DEFAULT_REGION}-${PROJECT}.cloudfunctions.net/api-assets?exchange=Binance
curl https://${DEFAULT_REGION}-${PROJECT}.cloudfunctions.net/api-assets?exchange=Coinbase
```

## DEPLOY

First, fork or clone this repo, then:

```sh
npm i
```

Now, deploy it GCP, run the following command in the root of this repository:

```sh
gcloud functions deploy api-assets --runtime nodejs10 --trigger-http --memory 128MB
```

You should receive a YAML like response in your terminal including the URL for the Cloud Function.

## MOTIVATION

In the cryptocurrency space, there are little to no standards for APIs or nomenclature.  Each exchange supports a different set of assets and the naming conventions are different across exchanges.

For example, Binance's API returns an asset pair like this:

```sh
'ZRXUSDT'
```

 And Coinbase's API returns an asset pair like this:

 ```sh
'ZRX-USD'
 ```

`api-assets` is opinionated and returns a JSON object in the format of:

```js
{
  base,
  original,
  pair,
  quote
}
```

So when you query `api-assets` for Binance you receive the following:

```sh
{ base: 'ZRX',
  original: 'ZRXUSDT',
  pair: 'USDT-ZRX',
  quote: 'USDT' }
```

So when you query `api-assets` for Coinbase you receive the following:

```sh
{ base: 'ZRX',
  original: 'ZRX-USD',
  pair: 'USD-ZRX',
  quote: 'USD' }
```

The goal here is to have consistency across the name of asset pairs. I've chosen `quote-base` where `base` is the asset you are looking to buy or sell (e.g. ZRX) and `quote` is the asset that the `base` is being quoted or priced in.

If you want to buy 10 ZRX tokens in USD you would be looking for the asset pair `USD-ZRX`.

## SUPPORTED EXCHANGES

- ✅ Binance
- ✅ Coinbase

> Pull requests accepted by following the pattern in the `index.js` and passing tests in the `test.js` file.

## TESTS

```sh
npm i -D
npm test
```

## AUTHORS

- [Joe McCann](https://twitter.com/joemccann)

## LICENSE

MIT