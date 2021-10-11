/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import { parseCommands } from '../parse';
import { defaultRes, parseTypes, propParse } from "../parseTypes";
import { ArgumentInfo, OptionsInfo, SubCommandInfo } from '../components/ArgumentInfo';
import { InputInfo } from '../components/InputInfo';
import React from 'react';
import { Button } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import { ErrorInfo } from '../components/ErrorInfo';
import { CommandErrorInfo } from '../components/CommandErrorInfo';
import { errorMessage } from '../types/errorMessage';


const Home = () => {
  // Get all of our stylings and state ready
  const classes = useStyles();
  const { handleSubmit, control } = useForm();
  const [input, setInput] = useState('');
  const [inputError, setError] = useState<errorMessage>({ command: '', error: '' });
  var command = '';
  const [commandParams, setCommandParams] = useState<propParse>({
    prop: { input: { name: '', description: '' }, errors: '' } as parseTypes,
    type: '',
  });

  // If we find an error in the bash command, we need to clear the results
  function setErrorandClear(error: any, command: string) {
    setError({ command: command, error: error.toString() });
    setCommandParams({
      prop: { input: { name: '', description: '' } } as parseTypes,
      type: '',
    });
  }

  // This command handles parsing, at a high level, of the entered bash command
  // 
  const onEnter = async () => {
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
            const url = `https://cdn.skypack.dev/@withfig/autocomplete/build/${command.toLowerCase()}.js`;
            //TODO: error handle
            git = await import(/* webpackIgnore: true */ url)
              .then(git => {
                setError({ error: '', command: '' });
                return git;
              })
              .catch(err => setErrorandClear(err, command));
          }
          commandArray.shift();
          // grab all other info out of command
          if (input.includes(`"`)) {
            // handle the edge case of "hello"
            checkQuoteArray(commandArray);
          }
          if (git.default) {
            const parseResponse = await parseCommands(commandArray, git.default);
            console.log(parseResponse);
            ;
            setCommandParams({ prop: parseResponse, type: 'command' });

            if (parseResponse.errors && parseResponse.errors != "") {

              setError({ command: "", error: parseResponse.errors })
            }
          }
        }
      }
    } catch (err) { }
  };

  return (
    <div className="p-8 justify-center items-center h-screen flex flex-col ">
      <h1
        className="font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-purple-800 to-blue-600"
      >
        Bashable
      </h1>
      {inputError.command != '' && <ErrorInfo {...inputError}></ErrorInfo> || <CommandErrorInfo {...inputError}></CommandErrorInfo>}

      <form className={classes.root} onSubmit={handleSubmit(onEnter)}>
        <Controller
          name="command"
          control={control}
          defaultValue="123"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <CssTextField
              fullWidth
              label="Enter Your Command"
              id="custom-css-outlined-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              error={!!error}
              helperText={error ? error.message : null}
            />
          )}
          rules={{ required: 'A command is required' }}
        />

        <div>
          <Button type="submit" variant="contained" color="primary">
            Explain
          </Button>
        </div>
      </form>
      <div className="space-y-6 mt-4">
        <InputInfo {...commandParams}></InputInfo>
        {commandParams.prop.subcommand &&
          commandParams.prop.subcommand?.map(obj => (
            // eslint-disable-next-line react/jsx-key
            <SubCommandInfo {...obj}></SubCommandInfo>
          ))}
        {commandParams.prop.options &&
          commandParams.prop.options?.map(obj => (
            // eslint-disable-next-line react/jsx-key
            <OptionsInfo {...obj}></OptionsInfo>
          ))}

        {commandParams.prop.argument &&
          commandParams.prop.argument?.map(obj => (
            // eslint-disable-next-line react/jsx-key
            <ArgumentInfo {...obj}></ArgumentInfo>
          ))}
      </div>
    </div>
  );
};

export default Home;



const CssTextField = styled(TextField)({
  width: '100vw',
  '& label.Mui-focused': {
    color: '#1E40AF',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#3B82F6',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#3B82F6',
    },
    '&:hover fieldset': {
      borderColor: '#1D4ED8',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#1E40AF',
    },
  },
});


const useStyles = makeStyles({
  root: {
    width: '100vw',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',

    '& .MuiTextField-root': {
      margin: '10px',
      'min-width': '300px',
      'max-width': '1000px',
    },
    '& .MuiButtonBase-root': {
      margin: '5px',
    },
  },
});

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
