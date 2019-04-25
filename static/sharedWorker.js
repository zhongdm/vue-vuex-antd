onconnect = function(event) {
  let port = event.ports[0]
  
  port.onmessage = (e) => {
    port.postMessage(+e.data[0] + +e.data[1])
  }
}
