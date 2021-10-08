import * as figTypes from './types/cheat';

export async function parseCommands(input: string[], figResponse: figResponse): Promise<parseTypes> {
  // create response Object
  var params = {
    input: {
      name: figResponse.name,
      description: figResponse.description,
    },
    options: [],
    subcommand: [],
    argument: [],
  } as parseTypes;

  // input is already tokenized, so we iterate through it
  for (const [index, value] of input.entries()) {
    // checkNextElement returns either the next element or null.
    // Helps with error checking
    const next = checkNextElement(input, index);

    // if there is a -, we can assume it's a flag
    // checkForOptions also has this check, but we s

    const res = checkForOptions(value, figResponse.options);
    if (res) {
      var renderOptions = {
        figArg: res,
        arguments: { figArg: {} },
      } as renderOptions;
      if (next) {
        var nextRes = checkForOptions(next, figResponse.options);
        if (!nextRes) {
          var argument = addArgument(next, res.args ?? {});
          renderOptions.arguments!.figArg = argument.figArg;
        }
      }
      params.options?.push(renderOptions);

      // if it doesn't have a flag, let's check on the subcommands!
    } else if (next) {
      var subCommand = checkSubcommands(value, input, figResponse.subcommands, index);
      if (subCommand) {
        params.subcommand?.push(subCommand);
        input.splice(index, index + 1);
      } else {
        var argument = addArgument(value, figResponse.args);
        // If it is not a flag, or subcommand, it is an argument!
        if (argument) {
          params.argument?.push(argument);
        }
      }
    } else if (value) {
      var argument = addArgument(value, figResponse.args);
      // If it is not a flag, or subcommand, it is an argument!
      if (argument) {
        params.argument?.push(argument);
      }
    }
  }
  return params;
}
export function checkNextElement(array: string[], currentIndex: number) {
  var t = array[currentIndex + 1] ?? null;
  if (t) return t;
  if (!t) return null;
}

export type SingleOrArray<T> = T | T[];

export function addArgument(value: string, figArgs: SingleOrArray<figTypes.Arg>): renderArg {
  var argument = {
    figArg: figArgs,
    value: value,
  } as renderArg;
  return argument;
}

export function checkSubcommands(
  value: string,
  nextInput: string[],
  subCommandList: figTypes.Subcommand[],
  currentIndex: number,
) {
  var optionChecked = false;
  var sub: figTypes.Subcommand = subCommandList?.filter(x => x.name == value)[0];
  // if our next token is an argument
  if (sub) {
    var subCommand = {
      subcommand: { name: '' },
      children: { options: [], argument: [] },
    } as renderSubcommand;
    subCommand.subcommand = sub;
    if (Array.isArray(sub.args)) {
      let tempNumber = currentIndex;
      for (const arg of sub.args) {
        if (arg) {
          tempNumber++;
          var argumentTemp = addArgument(nextInput[tempNumber], arg);
          subCommand.children.argument?.push(argumentTemp);
        }
      }
      sub.options;
      nextInput.splice(currentIndex++, tempNumber);
      var tempNext = checkNextElement(nextInput, currentIndex - 1);
      if (tempNext && sub.options) {
        const tempOptions = checkForOptions(tempNext, sub.options);
        var renderOptions = {
          figArg: tempOptions,
          arguments: { figArg: {} },
        } as renderOptions;
        subCommand.children.options?.push(renderOptions);
        optionChecked = true;
      }
    }
    if (sub.options?.length) {
      var checkNext = checkNextElement(nextInput, currentIndex);
      if (checkNext) {
        const subFlags = checkForOptions(nextInput[currentIndex + 1], sub.options);
        // if not undefined we need to append to our root subcommand and remove the next element from the token array as weel
        if (subFlags && !optionChecked) {
          var renderOptions = {
            figArg: {},
            arguments: { figArg: {} },
          } as renderOptions;
          var argument = addArgument(nextInput[currentIndex + 1], subFlags.args || {});
          renderOptions!.figArg = subFlags;

          if (nextInput[currentIndex + 2]) {
            renderOptions.arguments!.value = nextInput[currentIndex + 2];
            renderOptions.arguments!.figArg = subFlags.args;
            subCommand.children.options?.push(renderOptions);
          }
        } else {
          var argument2 = addArgument(nextInput[currentIndex + 1], sub.args || {});
          subCommand.children.argument?.push(argument2);
        }
      }
    }
    return subCommand;
  }
}

// I can't think of reason why I would need both of these, but
// I feel like I do
export function checkForOptions(value: string, flags: figTypes.Option[]): figTypes.Option | void {
  if (value.includes('-' || '--')) {
    var res = flags.filter(flag => {
      var bool = false;
      if (isString(flag.name) && flag.name == value) {
        bool = true;
      } else {
        for (const name of flag.name) {
          if (name == value) {
            bool = true;
          }
        }
      }
      return bool;
    });
    return res[0];
  }
}

export function isString(value: any) {
  return typeof value === 'string' || value instanceof String;
}

// This is what our parseCommands function will return
// commandInfo includes the command (i.e. git in git push)
// and the url
export interface parseTypes {
  input?: figResponseInfo;
  options?: renderOptions[];
  subcommand?: renderSubcommand[];
  argument?: renderArg[];
}
export interface figResponseInfo {
  description: string;
  name: string;
}
export interface commandInfo {
  url?: string;
  bashCommand?: string;
}
export interface renderOptions {
  figArg?: figTypes.Option;
  arguments?: renderArg;
}
export interface renderArg {
  figArg?: SingleOrArray<figTypes.Arg>;
  value?: string;
}
export interface renderSubcommand {
  subcommand: figTypes.Subcommand;
  children: parseTypes;
}
export interface args {
  options?: string;
  arguments?: string;
}
export interface figResponse {
  description: string;
  name: string;
  options: figTypes.Option[];
  subcommands: figTypes.Subcommand[];
  args: figTypes.Arg;
  additionalSuggestions?: figTypes.Suggestion[] | string[];
}

export interface defaultRes {
  default: figResponse;
}

export default parseCommands;
