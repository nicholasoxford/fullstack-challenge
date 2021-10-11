import { FC } from 'react';
import { propParse } from "../parseTypes";

export const InputInfo: FC<propParse> = props => {
  const title = props.type;
  const name = props.prop.input?.name;
  debugger;
  const description = props.prop.input?.description;
  return (
    // {
    //   Objects.map(obj => (
    //   ))}
    <div>
      {props.prop.input?.name != '' && (
        <div className="max-w-2xl  mx-auto px-4">
          <div className="relative m-0 shadow-lg flex bg-white">
            <div className="flex-no-shrink m-h-full flex m-auto item-center">
              <h1 className="p-2 font-extrabold text-transparent w-max text-2xl bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600">
                {title}
              </h1>
            </div>
            <div className="flex-1 card-block relative">
              <div className="p-2">
                <h4 className="font-medium text-2xl mb-3">{name}</h4>
                <p className="leading-normal">{description}</p>
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
};
