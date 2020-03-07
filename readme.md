# isprime, only _it's an API_

Sure you could install an NPM package and call it a day, but a true 10x developer knows 
that packages are wack, and that you should be using all the APIs™.

## The API
Use the free API in your app. Why? Because you're a goddamn 10x developer. That's why.

### Making a Request
Make a `GET` request to `https://spaceburrito.xyz/isthisprime/{number}`
```js
fetch('https://api.spaceburrito.xyz/isthisprime/69').then(function(res) {
    console.log(res.numberType);
    // odd
});
```

### Responses
#### 200 - OK
Make your 10x dreams come true.
```json
{
    "status": 400,
    "message": "no number was supplied"
}
```

```json
{
    "status": 400,
    "message": "You can only check if an integer is even or odd"
}
```

#### 413 - Request too large
That number is either outside the JS min/max safe integer size, or you've just entered too many numbers.
```json
{
    "status": 413,
    "message": "You've entered /way/ too many numbers"
}
```

```json
{
    "status": 413,
    "message": "Integers shouldn't be smaller than the MIN_SAFE_INTEGER"
}
```

```json
{
    "status": 413,
    "message": "Integers shouldn't be larger than the MAX_SAFE_INTEGER"
}
```

#### 429 - Rate Limit Exceeded
10x developer does not mean 10x my bandwidth costs. You can make up to 1000 requests inside a 15 minute window.
```json
{
    "status": 429,
    "message": "Maybe calm down there with the requests there you big shot 10x-er"
}
```

### Frequently Asked Questions
#### Why can't I access the API or docs?
Probably because you've been marked as suspicious and have been blocked by the Cloudflare firewall.

#### Is this API supposed to be some kind of joke
I am a serious developer and this is serious work. It definitely was not developed for a nullposting meme.