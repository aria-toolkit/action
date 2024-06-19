import { setFailed } from '@actions/core'
import github from '@actions/github'
import { Aria } from '@igor.dvlpr/aria/dist/lib/compiler/Aria.mjs'

try {
  console.log('Wow')
  const aria = new Aria()
  console.log(aria)
} catch (error) {
  setFailed(error.message)
}
