import * as figTypes from './types/cheat';
import { SingleOrArray } from './parse';

// This is what our parseCommands function will return
// commandInfo includes the command (i.e. git in git push)
// and the url

export interface parseTypes {
  input?: figResponseInfo;
  options?: renderOptions[];
  subcommand?: renderSubcommand[];
  argument?: renderArg[];
  errors: string;
}
export interface propParse {
  prop: parseTypes;
  type: string;
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
