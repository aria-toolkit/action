import { setFailed } from '@actions/core'
import github from '@actions/github'
import { Aria } from '@igor.dvlpr/aria/dist/lib/compiler/Aria.mjs'

try {
  console.log('Wow')
  const aria = new Aria({
    shouldLog: false,
    versioning: 'auto',
  })
  console.log(aria)

  const token = process.env.GITHUB_TOKEN
  const octokit = github.getOctokit(token)
  const context = github.context

  console.log('HUH')
  console.log({ context })

  let files

  if (context.eventName === 'push') {
    const commit = context.payload.head_commit.id
    const { data } = await octokit.rest.repos.getCommit({
      owner: context.repo.owner,
      repo: context.repo.repo,
      ref: commit,
    })
    files = data.files.map((file) => file.filename)
  } else if (context.eventName === 'pull_request') {
    const { data } = await octokit.rest.pulls.listFiles({
      owner: context.repo.owner,
      repo: context.repo.repo,
      pull_number: context.payload.number,
    })
    files = data.map((file) => file.filename)

    console.log({ files })
  }
} catch (error) {
  setFailed(error.message)
}
