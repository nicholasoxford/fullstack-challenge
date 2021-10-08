import { useState, Component, FC, ReactElement, useEffect } from 'react';
import { parseCommands, figResponse, defaultRes, parseTypes } from '../parse';
import { Card } from '../components/input';
class TopLevelDetail extends Component<{}, parseTypes> {
  render() {
    return <h1>{this.props.input?.name}</h1>;
  }
}

const Home = () => {
  const [input, setInput] = useState('');

  const MyFunctionnalComponent: FC<parseTypes> = props => {
    // const [title, setTitle] = useState(props.input?.name);
    // useEffect(() => {
    //   if (props.input?.name) debugger;
    //   // Create an scoped async function in the hook
    //   function anyNameFunction() {
    //     if (props.input?.name) setTitle(props.input?.name);
    //   }
    //   // Execute the created function directly
    //   anyNameFunction();
    // }, []);
    return <div>{props.input?.name}</div>;
  };

  var figSpec = {};
  var command = '';
  var commandParams = { input: { name: 'hello' } } as parseTypes;
  commandParams.input!.name = 'blah';
  const subscribe = async (e: { preventDefault: () => void }) => {
    e.preventDefault(); // prevents page reload

    var git = {} as defaultRes;
    try {
      //check if non-empty string
      if (input != '') {
        var commandArray = input.split(' ');
        //check if command has changed
        // if it has changed, grabbed Fig's spec
        if (commandArray.length) {
          // set command to compare
          var tempCommand = commandArray[0].trim();
          if (tempCommand != command) {
            command = tempCommand;
            const url = `https://cdn.skypack.dev/@withfig/autocomplete/build/${command}.js`;
            //TODO: error handle
            git = await import(/* webpackIgnore: true */ url);
          }
          commandArray.shift();
          // grab all other info out of command
          if (input.includes(`"`)) {
            // handle the edge case of "hello"
            checkQuoteArray(commandArray);
          }

          commandParams = await parseCommands(commandArray, git.default);

          console.log(commandParams);
          debugger;
          MyFunctionnalComponent(commandParams);
        }
      }
    } catch (err) {}
  };

  return (
    <div className="p-8 justify-center items-center h-screen flex ">
      <form className="flex justify-items-center w-6/12">
        <input
          className="bg-gray-200 shadow-inner rounded-full p-2 h-16 flex-1 "
          id="command"
          type="text"
          aria-label="bash command"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Enter your bash command"
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 rounded-l ml-2 h-12 duration-300 text-white shadow p-2 "
          type="submit"
          onClick={subscribe}
        >
          Enter
        </button>
        <MyFunctionnalComponent {...commandParams}></MyFunctionnalComponent>
      </form>
    </div>
  );
};

export default Home;
function checkQuoteArray(commandArray: string[]) {
  var quoteElements = commandArray.filter(x => x.includes(`"`));
  var indexStart: number = -100;
  var indexEnd: number = -100;
  for (const words of quoteElements) {
    if (indexStart <= -1) {
      indexStart = commandArray.indexOf(words);
    } else if (indexEnd <= -1) {
      indexEnd = commandArray.indexOf(words);
    }
  }
  var quoteToken = '';

  for (const [index, value] of commandArray.entries()) {
    if (index >= indexStart && index <= indexEnd) {
      quoteToken += ' ' + value.replace(/^"|"$/g, '');
    }
  }
  console.log('quote', quoteToken);
  commandArray.splice(indexStart, indexEnd + 1, quoteToken.trim());
}
