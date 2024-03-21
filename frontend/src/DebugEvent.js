import React from 'react'
import { Text, VStack } from '@gluestack-ui/themed'

const DebugEvent = ({ message, ...props }) => {
  return message ? (
    <VStack
      space="md"
      p="$4"
      bg="$backgroundCardLight"
      sx={{ _dark: { bg: '$backgroundCardDark' } }}
    >
      <Text bold>Events</Text>
      <Text size="xs" whiteSpace="pre-wrap">
        Main event = {JSON.stringify(message, null, 2)}
      </Text>
    </VStack>
  ) : null
}

export default DebugEvent
