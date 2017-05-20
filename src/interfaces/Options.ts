import Loader from "./Loader";
interface CompressOption {
  enable: boolean,
  needToCompressIdentifier: string[],
}

interface LogsOption {
  enable: boolean,
}

interface LoaderOption {
  enable: boolean,
  loaders: Loader[] | null
}

interface Options {
  errorPrefix?: string,
  idPrefix?: string,
  compress?: CompressOption,
  logs?: LogsOption,
  customLoaders?: LoaderOption,
  presetLoaders?: LoaderOption,
}

export default Options;
