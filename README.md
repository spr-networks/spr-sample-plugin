# SPR custom plugin ui

The ui for custom plugins use create-react-app & glustack, see deps.
Check Dockerfile if you want to dev in docker.

```sh
PORT=8080 npm start
```

Read more in the [API documentation](https://www.supernetworks.org/pages/api/0).

**NOTE** need to pass a token if you want to talk to the spr api, add a token in the spr ui under _System -> Auth_.

## dev mode

```sh
export REACT_APP_TOKEN="SPR-TOKEN-HERE"
PORT=8080 npm start
```

## dev mode with spr on localhost:

```sh
export REACT_APP_API="http://localhost:3000"
export REACT_APP_TOKEN="SPR-TOKEN-HERE"
PORT=8080 npm start
```

## build

```sh
npm run build
```

when everything is done & working you can build & push it to spr

# Examples

How to get a list of all devices from ui in my plugin?

```js
import { api } from './API'
//...
let devices = await api.get('/devices')
console.log('devices=', devices)
```

See example in [src/examples](src/examples/)
