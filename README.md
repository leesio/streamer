# Streamer (Demo)
> Streams of reasonably interesting data published reasonably stochastically

Turns pull based data into streams of data pushed to the client via web sockets every 3-5 seconds. Each data source is identified by a channel name and will return a payload with a consistent shape. This is meant for testing interfaces that rely on data streams rather than polling.

Publishes *one* of the random data sources to the corresponding pusher channel periodically.

# Channels

Below are a list of data streams by channel name. Some of them return generated mock data and others rely on live data points from open source or publicly available APIs.

## Random Data

| Channel | Description |
| --- | --- |
| fact  | A random fact string from a large list of facts. |
| name  | A random name string form a large list of names.  |
| color  | A randomly generated hex value like `#00ffcc`. |
| percent  | A random number from `1-100` useful for graphs and dials. |
| card  | An object containing data that represents a random card being drawn from a deck. |

## Live Data

| Channel | Description |
| --- | --- |
| time  | A human readable time string in GMT like `16:35:00 GMT`. |
| date  | A date string based on a the number of milliseconds since 1 January 1970 UTC. |
| count  | The value of a counter that gets incremented every publish. |
| bitcoin  | The current price of bitcoin in US dollars. |
