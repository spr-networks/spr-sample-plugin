import React, { forwardRef, useImperativeHandle, useState } from 'react'

import { View, VStack } from '@gluestack-ui/themed'

import Settings from './Settings.js'
import Status from './examples/Status.js'
import Devices from './examples/Devices.js'
import Test from './examples/Test.js'
//import DebugEvent from './DebugEvent.js'

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
        <Settings />
        <Test />
        <Status />
        <Devices />
        {/*<DebugEvent message={message} />*/}
      </VStack>
    </View>
  )
})

export default Plugin
