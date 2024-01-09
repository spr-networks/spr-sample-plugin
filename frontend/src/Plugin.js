import React, { forwardRef, useImperativeHandle, useState } from 'react'

import { Text, View, VStack } from '@gluestack-ui/themed'

import Status from './examples/Status'
import Devices from './examples/Devices'

const Plugin = forwardRef((props, ref) => {
  const [message, setMessage] = useState(null)

  useImperativeHandle(ref, () => ({
    onMessage: (event) => {
      setMessage(event.data)
    }
  }))

  return (
    <View
      h="$full"
      bg="$backgroundContentLight"
      sx={{ _dark: { bg: '$backgroundContentDark' } }}
    >
      <VStack space="lg">
        {message ? (
          <VStack
            space="md"
            p="$4"
            bg="$backgroundCardLight"
            sx={{ _dark: { bg: '$backgroundCardDark' } }}
          >
            <Text>Main event = {message}</Text>
          </VStack>
        ) : null}
        <Status />
        <Devices />
      </VStack>
    </View>
  )
})

export default Plugin
