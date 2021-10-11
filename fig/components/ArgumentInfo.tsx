import { FC } from 'react';
import { figResponse, parseTypes, renderOptions, renderArg, renderSubcommand } from '../parseTypes';

import * as figTypes from '../types/cheat';

export const OptionsInfo: FC<renderOptions> = props => {
  let name = '';
  return (
    <div className="space-y-6 mt-4">
      {props.figArg?.name != '' && (
        <div className="max-w-2xl  mx-auto px-4">
          <div className="relative m-0 shadow-lg flex bg-white">
            <div className="flex-no-shrink m-h-full flex m-auto item-center">
              <h1 className="max-w-sm text-2xl p-2 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600">
                Options
              </h1>
            </div>
            <div className="flex-1 card-block relative">
              <div className="p-2">
                <h4 className="font-medium text-2xl mb-3">{props.figArg?.name}</h4>
                <p className="leading-normal">Type: {props.figArg?.description}</p>
                <p className="text-sm text-grey block mt-6">More Info..</p>
                <a
                  className="-m-4 w-12 h-12 bg-blue-dark flex items-center justify-center text-center no-underline rounded-full text-white hover:bg-blue-darker absolute pin-t pin-r"
                  href="#"
                >
                  <i className="text-xl fa fa-plus"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      {props.arguments?.value && <ArgumentInfo {...props.arguments}></ArgumentInfo>}
    </div>
  );
};

export const SubCommandInfo: FC<renderSubcommand> = props => {
  let name = '';

  return (
    <div className="space-y-6 mt-4">
      {props.subcommand?.name != '' && (
        <div className="max-w-2xl  mx-auto px-4">
          <div className="relative m-0 shadow-lg flex bg-white">
            <div className="flex-no-shrink m-h-full flex m-auto item-center">
              <h1 className="p-2 max-w-sm text-2xl font-extrabold text-transparent text-2xl bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600">
                Subcommand
              </h1>
            </div>
            <div className="flex-1 card-block relative">
              <div className="p-2">
                <h4 className="font-medium text-2xl mb-3">{props.subcommand.name}</h4>
                <p className="leading-normal">Type: {props.subcommand?.description}</p>
                <p className="text-sm text-grey block mt-6">More Info..</p>
                <a
                  className="-m-4 w-12 h-12 bg-blue-dark flex items-center justify-center text-center no-underline rounded-full text-white hover:bg-blue-darker absolute pin-t pin-r"
                  href="#"
                >
                  <i className="text-xl fa fa-plus"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      {props.children.argument && props.children.argument?.map(obj => (
        // eslint-disable-next-line react/jsx-key
        <ArgumentInfo {...obj}></ArgumentInfo>
      ))}
      {props.children.options &&
        props.children.options?.map(obj => (
          // eslint-disable-next-line react/jsx-key
          <OptionsInfo {...obj}></OptionsInfo>
        ))}
    </div>
  );
};

export const ArgumentInfo: FC<renderArg> = props => {
  let name = '';
  ;
  if (props.figArg) {
    console.log("yeet", props.figArg)
    if (checkIfSingleReturnName(props.figArg!)) {
      ;
      name = props.figArg.name || 'This value could be something like `NPM Run Dev` where the argument is decided by a packagelock.json';
    }
    else { name = 'This value could be something like `NPM Run Dev` where the argument is decided by a package-lock.json' }
  }
  if (props) {
    return (
      <div>
        {props.value != '' && (
          <div className="max-w-2xl  mx-auto px-4">
            <div className="relative m-0 shadow-lg flex bg-white">
              <div className="flex-no-shrink m-h-full flex m-auto item-center">
                <h1 className="p-2 w-40 font-extrabold text-transparent text-2xl bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600">
                  Argument
                </h1>
              </div>
              <div className="flex-1 card-block relative">
                <div className="p-2">
                  <h4 className="font-medium text-2xl mb-3">{props.value}</h4>
                  <p className="leading-normal">Type: {name}</p>
                  <p className="text-sm text-grey block mt-6">More Info..</p>
                  <a
                    className="-m-4 w-12 h-12 bg-blue-dark flex items-center justify-center text-center no-underline rounded-full text-white hover:bg-blue-darker absolute pin-t pin-r"
                    href="#"
                  >
                    <i className="text-xl fa fa-plus"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } else return <div></div>;
};
export function checkIfSingleReturnName(object: figTypes.SingleOrArray<figTypes.Arg>): object is figTypes.Arg {

  return 'name' in object;
}
