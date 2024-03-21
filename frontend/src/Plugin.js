import React, { forwardRef, useImperativeHandle, useState } from 'react'

import { View, VStack } from '@gluestack-ui/themed'

import Status from './examples/Status'
import Devices from './examples/Devices'
import Test from './examples/Test'
//import DebugEvent from './DebugEvent'

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
        <Test />
        <Status />
        <Devices />
        {/*<DebugEvent message={message} />*/}
      </VStack>
    </View>
  )
})

export default Plugin
