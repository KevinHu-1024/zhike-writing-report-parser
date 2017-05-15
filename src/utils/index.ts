import Options from '../interfaces/Options';

export function mergeOptions(from: Options, to: Options
): Options {
  return Object.assign({}, from, to);
}
