const core = require('@actions/core')
const github = require('@actions/github')

try {
  console.log('Wow')
} catch (error) {
  core.setFailed(error.message)
}
