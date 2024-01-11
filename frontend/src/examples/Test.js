import React, { useState } from 'react'

import {
  Button,
  ButtonText,
  HStack,
  Heading,
  Text,
  VStack
} from '@gluestack-ui/themed'
import { api } from '../API'

// api @ /plugins/spr-sample-plugin
// ui  @ /plugins/spr-sample-plugin/ui

const Test = () => {
  const [result, setResult] = useState(null)
  const baseURL = '/plugins/user/spr-sample-plugin'

  const onPress = () => {
    api
      .get(`${baseURL}/test`)
      .then((res) => {
        setResult(res)
      })
      .catch((err) => console.error(`error: ${err}`))
  }

  return (
    <VStack
      p="$4"
      space="md"
      bg="$backgroundCardLight"
      sx={{ _dark: { bg: '$backgroundCardDark' } }}
    >
      <Heading size="sm">SPR Custom API</Heading>
      <Button onPress={onPress}>
        <ButtonText>Get Result</ButtonText>
      </Button>
      <VStack space="sm" maxWidth={300}>
        <Text>{result ? JSON.stringify(result) : null}</Text>
      </VStack>
    </VStack>
  )
}

export default Test
