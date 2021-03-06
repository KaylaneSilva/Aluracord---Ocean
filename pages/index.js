import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import { useRouter } from 'next/router';
import appConfig from '../config.json';
import Head from 'next/head';

function Title({ children, tag }) {
  const Tag = tag || "h1";
  return (
    <>
      <Tag>{children}</Tag>
      <style jsx>{`
        ${Tag} {
          color: ${appConfig.theme.colors.neutrals['000']};
                font-size: 24px;
                font-weight: 600;
        }
      `}</style>
    </>
  )
}

export default function PaginaInicial() {
  const [username, setUsername] = React.useState('');
  const [info, setInfo] = React.useState({});
  const route = useRouter();
  const [image, setImage] = React.useState('')
  const url = `https://api.github.com/users/${username}`;

  React.useEffect(() => {
    fetch(url).then((response) => response.json())
      .then((data) => console.log(data))
  }, [])

  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <link rel="icon" type='imagem/png' href="https://cdn.discordapp.com/attachments/935207613543624835/942544590077046814/3533679-200.png" />
        <link rel="apple-touch-icon" href="https://cdn.discordapp.com/attachments/935207613543624835/942544590077046814/3533679-200.png" />
        <title>
          AluraCord - Ocean
        </title>
      </Head>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary[500],
          backgroundImage: 'url(https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max.jpg)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          as='div'
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
            backgroundColor: 'rgb(21, 21, 21, 0.50)',
          }}
          className='glass'
        >
          {/* Formul??rio */}
          <Box
            as="form"
            onSubmit={function (event) {
              event.preventDefault();
              route.push(`/chat?username=${username}`);
            }}
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            <Title tag="h2">Boas vindas de volta!</Title>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
              {appConfig.name}
            </Text>

            <Box
              styleSheet={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: {
                  xs: 'column',
                  sm: 'row',
                },
                width: '110%', maxWidth: '900px',
                borderRadius: '5px', padding: '32px', margin: '16px',
              }}
            >
              <TextField
                fullWidth
                placeholder='User do Github aqui'
                textFieldColors={{
                  neutral: {
                    textColor: appConfig.theme.colors.neutrals[200],
                    mainColor: appConfig.theme.colors.neutrals[900],
                    mainColorHighlight: appConfig.theme.colors.primary[500],
                    backgroundColor: appConfig.theme.colors.neutrals[800],
                  },
                }}
                value={username}
                onChange={function ({ target }) {
                  const value = target.value;
                  setUsername(value);
                }}
              />
              <Button
                type='button'
                label='Search'
                disabled={username.length < 2}
                width='fit-content'
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals["000"],
                  mainColor: appConfig.theme.colors.primary[500],
                  mainColorLight: appConfig.theme.colors.primary[400],
                  mainColorStrong: appConfig.theme.colors.primary[600],
                }}
                styleSheet={{
                  marginLeft: '2vw',
                  marginTop: '-1.3vh'
                }}
                onClick={function () {
                  fetch(url, {
                    headers: {
                      'Accept': 'application/vnd.github.v3+json'
                    }
                  })
                    .then(response => response.json()) //Converting the response to a JSON object
                    .then(data => {
                      setInfo({ followers: data.followers, following: data.following, location: data.location })
                    })
                    .catch(error => console.error(error));
                  setImage(`https://github.com/${username}.png`)
                }}
              />
            </Box>
            <Button
              type='submit'
              label='Entrar'
              disabled={!image}
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
          </Box>
          {/* Formul??rio */}


          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '250px',
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
              src={image}
            />
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
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: '3px 10px',
                borderRadius: '1000px',
                marginTop: '2vh'
              }}
            >
              Followers: {info.followers} Following: {info.following}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}
