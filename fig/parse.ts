import { figResponse, parseTypes, renderOptions, renderArg, renderSubcommand } from './parseTypes';
import * as figTypes from './types/cheat';

export async function parseCommands(input: string[], figResponse: figResponse): Promise<parseTypes> {
  // create response Object
  var params = {
    input: {
      name: figResponse.name,
      description: figResponse.description,
    },
    errors: '',
    options: [],
    subcommand: [],
    argument: [],
  } as parseTypes;

  // input is already tokenized, so we iterate through it
  for (const [index, value] of input.entries()) {
    ;
    if (params.errors != "") {

      return params
    }
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
        addSubCommand(next, index);
      }
      else {
            
        params.errors = "Mhmmmm... Something doesn't seem right, can you check your command?"
      }
    } else if (value) {
      ;
      var subCommand = checkSubcommands(value, input, figResponse.subcommands, index);
        if (subCommand) { addSubCommand(next, index);}
        else {
          if (figResponse.args) {
            var argument = addArgument(value, figResponse.args);
            // If it is not a flag, or subcommand, it is an argument!
  
            if (argument) {
              params.argument?.push(argument);
            }
          }
          else {
            
            params.errors = "Mhmmmm... Something doesn't seem right, can you check your command?"
          }
        }
      }
    
    } 
  return params;

  function addSubCommand(next: string, index: number) {
    params.subcommand?.push(subCommand);
    if (subCommand.subcommand.options && next) {
      const subCommandOption = checkForOptions(next, subCommand.subcommand.options);

      if (subCommandOption && params.subcommand) {

        params.subcommand[0].children.options?.push({
          figArg: subCommandOption,
          arguments: { figArg: {} },
        } as renderOptions);
        input.splice(index, index + 3);

      }
    } else {
      input.splice(index, index + 2);

    }
  }
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
  ;
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
        nextInput.splice(currentIndex, tempNumber + 2)
        optionChecked = true;
      }
    } else if (sub.args && sub.args.name != "") {
      let tempNumber = currentIndex;
      
    }
    if (sub.options?.length) {
      ;
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
          if(argument2)
          subCommand.children.argument?.push(argument2);
      nextInput.splice(currentIndex + 1, currentIndex + 2);

        }
      }
    }
    return subCommand;
  }
  return;
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

export default parseCommands;
