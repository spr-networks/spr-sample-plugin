import React, { useEffect, useState } from 'react'

import {
  Button,
  ButtonText,
  HStack,
  Input,
  InputField,
  Text
} from '@gluestack-ui/themed'

const Settings = (props) => {
  const isDev = process.env?.NODE_ENV === 'development'

  const [apiUrl, setApiUrl] = useState('')
  const [apiToken, setApiToken] = useState('')
  const [showForm, setShowForm] = useState(true)

  useEffect(() => {
    if (process.env.REACT_APP_API) {
      setApiUrl(process.env.REACT_APP_API)
    }

    if (process.env.REACT_APP_TOKEN) {
      setApiToken(process.env.REACT_APP_TOKEN)
    }
  }, [])

  const onSubmit = () => {
    window.SPR_API_URL = apiUrl
    window.SPR_API_TOKEN = apiToken
  }

  const isOK = apiUrl && apiToken

  if (!isDev && window.SPR_API_URL) {
    return <></>
  }

  return (
    <HStack
      w="$full"
      justifyContent="flex-end"
      space="xl"
      p="$4"
      bg="$backgroundCardLight"
    >
      <HStack
        space="md"
        alignItems="center"
        display={showForm ? 'flex' : 'none'}
      >
        <Text size="sm" display={isOK ? 'none' : 'flex'} color="$warning500">
          Running in dev mode without token
        </Text>
        <Input size="sm">
          <InputField
            value={apiUrl}
            placeholder="API URL"
            onChangeText={setApiUrl}
            onSubmitEditing={onSubmit}
          />
        </Input>
        <Input size="sm">
          <InputField
            value={apiToken}
            placeholder="API Token"
            onChangeText={setApiToken}
            onSubmitEditing={onSubmit}
          />
        </Input>
        <Button size="sm" action="success" onPress={onSubmit}>
          <ButtonText>Save</ButtonText>
        </Button>
      </HStack>
      <Button
        size="sm"
        action={isOK ? 'positive' : 'negative'}
        variant="outline"
        onPress={() => setShowForm(!showForm)}
      >
        <ButtonText>Auth Token</ButtonText>
      </Button>
    </HStack>
  )
}

export default Settings
