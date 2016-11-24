# digdug-null-sauce-labs-tunnel

## About ##

Sauce Labs Tunnel with fixed proxy behind authentication. 

Unfortunately official intern Sauce Labs tunnel does not work nice when computer is behind proxy with authentication - this tunnel can be used as a workaround. See also below intern bugs:

  * [https://github.com/theintern/digdug/issues/17](https://github.com/theintern/digdug/issues/17)
  * [https://github.com/theintern/intern/issues/509](https://github.com/theintern/intern/issues/509)

## Usage ##

1. Install as npm dependency:

```
npm install digdug-null-sauce-labs-tunnel --save
```

2. Use custom tunnel in intern config as below:

```json
{
	"tunnel": "dojo/node!digdug-null-sauce-labs-tunnel/lib/NullSauceLabsTunnel"
}
```

## Compatibility with intern ##

Confirmed to be compatible with intern 3.4.1