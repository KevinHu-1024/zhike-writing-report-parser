interface CompressOption {
  enable: boolean,
  needToCompressIdentifier: string[],
}

interface LogsOption {
  enable: boolean,
}

interface LoaderOption {

}

interface Options {
  errorPrefix?: string,
  idPrefix?: string,
  compress?: CompressOption,
  logs?: LogsOption,
  loaders?: LoaderOption[],
}

export default Options;
