import { Box, Button, Image, Text, TextField } from '@skynexui/components';
import { useRouter } from 'next/router';
import { useState } from 'react';
import appConfig from '../config.json';

function Title({ title, tag }) {
  const Tag = tag;
  return (
    <>
      <Tag>{title}</Tag>

      <style jsx>{`
        ${Tag} {
          color: ${appConfig.theme.colors.neutrals['000']};
          font-size: 24px;
          font-weight: 600;
        }
  `}</style>
    </>
  );
}

// export default function HomePage() {
//   return (
//     <div>
//       <GlobalStyle />
//       <Button />
//       <Title tag="h6" title={"Boa noite Campo Mourão"} />
//       <h2>Discord - papait-cord</h2>
//     </div>
//   );
// }

export default function PaginaInicial() {
  const [username, setUsername] = useState('');
  const router = useRouter();

  function handleChangeUsername(e) {
    setUsername(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    router.push('/chat');
  }

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary['100'],
          backgroundImage: 'url(https://thelordoftherings.com.br/wp-content/uploads/2020/12/Lord-of-the-Rings-Brasil-Senhor-dos-Aneis-em-4K-trailers.jpg)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '700px',
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals[700],
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={handleSubmit}
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            <Title tag="h2" title="Boas vindas de volta!" />
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
              {appConfig.name}
            </Text>
            <TextField
              fullWidth
              value={username}
              onChange={handleChangeUsername}
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
            />
            <Button
              type='submit'
              label='Entrar'
              disabled={username.length < 2}
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
          </Box>
          {/* Formulário */}


          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: '1px solid',
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',
            }}
          >
            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
              }}
              src={username.length >= 2 ? `https://github.com/${username}.png` : null}
            />
            {
              username.length >= 2 &&
              <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals[200],
                  backgroundColor: appConfig.theme.colors.neutrals[900],
                  padding: '3px 10px',
                  borderRadius: '1000px'
                }}
              >
                {username}
              </Text>
            }

          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}