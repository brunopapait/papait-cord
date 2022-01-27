import { Box, Button, Image, Text, TextField } from '@skynexui/components';
import React, { useEffect, useRef, useState } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import appConfig from '../config.json';


export default function ChatPage() {
  const [message, setMessage] = useState('');
  const [listMessage, setListMessage] = useState([]);

  function handleNewMessage() {
    const customMessage = {
      id: listMessage.length,
      from: 'brunopapait',
      contentMessage: message,
      date: new Date().toLocaleString()
    }

    setListMessage(prevState => [customMessage, ...prevState]);
    setMessage('');
  }

  function handleChangeMessage(e) {
    setMessage(e.target.value);
  }

  function handleKeyPressMessage(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      message.length > 0 &&
        handleNewMessage();
    }
  }

  function handleSendMessage() {
    handleNewMessage();
  }

  function handleRemoveMessage(messageId) {
    setListMessage(prevState => prevState.filter(item => item.id !== messageId))
  }

  return (
    <Box
      styleSheet={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: appConfig.theme.colors.primary[200],
        backgroundImage: 'url(https://thelordoftherings.com.br/wp-content/uploads/2020/12/Lord-of-the-Rings-Brasil-Senhor-dos-Aneis-em-4K-trailers.jpg)',
        backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        color: appConfig.theme.colors.neutrals['000']
      }}
    >
      <Box
        styleSheet={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
          borderRadius: '5px',
          backgroundColor: appConfig.theme.colors.neutrals[700],
          height: '100%',
          maxWidth: '95%',
          maxHeight: '95vh',
          padding: '32px',
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: 'relative',
            display: 'flex',
            flex: 1,
            height: '80%',
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: 'column',
            borderRadius: '5px',
            padding: '16px',
          }}
        >

          <MessageList mensagens={listMessage} handleRemoveMessage={handleRemoveMessage} />
          <Box
            as="form"
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <TextField
              placeholder="Insira sua menssagem aqui..."
              value={message}
              onChange={handleChangeMessage}
              onKeyPress={handleKeyPressMessage}
              type="textarea"
              styleSheet={{
                width: '100%',
                border: '0',
                resize: 'none',
                borderRadius: '5px',
                padding: '6px 8px',
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: '12px',
                color: appConfig.theme.colors.neutrals[200],
              }}
            />
            <Button
              disabled={!message.length}
              iconName="FaTelegramPlane"
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
              styleSheet={{ fontSize: '25px' }}
              onClick={handleSendMessage}>
              Enviar
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

function Header() {
  return (
    <>
      <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
        <Text variant='heading5'>
          Chat
        </Text>
        <Button
          variant='tertiary'
          colorVariant='neutral'
          label='Logout'
          href="/"
        />
      </Box>
    </>
  )
}

function MessageList({ mensagens, handleRemoveMessage }) {
  const listRef = useRef();

  useEffect(() => {
    listRef?.current?.contentEl?.scrollIntoView({ block: "end", inline: "nearest", behavior: 'smooth' });
  });

  return (
    <SimpleBar ref={listRef} style={{ height: '90%' }}>
      <Box
        tag="ul"
        styleSheet={{
          display: 'flex',
          flexDirection: 'column-reverse',
          flex: 1,
          color: appConfig.theme.colors.neutrals["000"],
          marginBottom: '16px',
        }}
      >
        {
          mensagens.map(item => (
            <Text
              key={item?.id}
              tag="li"
              styleSheet={{
                borderRadius: '5px',
                padding: '6px',
                marginBottom: '12px',
                hover: {
                  backgroundColor: appConfig.theme.colors.neutrals[700],
                }
              }}
            >

              <Box
                styleSheet={{
                  marginBottom: '8px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Image
                      styleSheet={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        display: 'inline-block',
                        marginRight: '8px',
                      }}
                      src={`https://github.com/${item.from}.png`}
                    />

                    <Text tag="strong">
                      {item?.from}
                    </Text>
                    <Text
                      styleSheet={{
                        fontSize: '10px',
                        marginLeft: '8px',
                        color: appConfig.theme.colors.neutrals[300],
                      }}
                      tag="span"
                    >
                      {item?.date}
                    </Text>
                  </div>
                  <button
                    onClick={() => handleRemoveMessage(item.id)}
                    style={{
                      cursor: 'pointer',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      display: 'inline-block',
                      marginRight: '8px',
                      background: appConfig.theme.colors.neutrals[300],
                      border: 'none',
                    }}>
                    X
                  </button>
                </div>
              </Box>
              {item?.contentMessage}
            </Text>

          ))

        }
      </Box>
    </SimpleBar>
  )
}