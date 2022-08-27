export function httpRequest() {
  const defaultFetch = (url, options) => {
    options.headers = options.headers
      ? { Accept: 'application / json', ...options.headers }
      : { Accept: 'application / json' };
    options.method = options.method || "GET";
    options.body = JSON.stringify(options.body) || false;
    if (!options.body) delete options.body;
    const controller = new AbortController();
    options.signal = controller.signal;
    setTimeout(() => controller.abort(), 3000);
    return fetch(url, options).then((res) =>
      res.ok
        ? res.json()
        : Promise.reject({
            error: true,
            status: res.status || 0,
            statusText: res.statusText || "Ocurrio un error",
          }).catch(error=>error)
    );
  };
  const get = async (url,options) => defaultFetch(url,options={});
  const post = (url, options={}) => {
    options.method='POST';
    return defaultFetch(url,options);
  };
  const put = (url,options={}) => {
    options.method='PUT';
    defaultFetch(url,options);
  };
  const del = (url,options={}) => {
    options.method='DELETE';
    defaultFetch(url,options);
  };
  return { get, post, put, del };
}
