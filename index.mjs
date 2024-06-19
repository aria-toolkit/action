import { setFailed } from '@actions/core'
import github from '@actions/github'
import { Aria } from '@igor.dvlpr/aria/dist/lib/compiler/Aria.mjs'
import { readFileSync } from 'fs'

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

  let files

  const commit = context.payload.head_commit.id
  const { data } = await octokit.rest.repos.getCommit({
    owner: context.repo.owner,
    repo: context.repo.repo,
    ref: commit,
  })

  console.log(data)

  files = data.files.map((file) => file.filename)
  // } else if (context.eventName === 'pull_request') {
  //   const { data } = await octokit.rest.pulls.listFiles({
  //     owner: context.repo.owner,
  //     repo: context.repo.repo,
  //     pull_number: context.payload.number,
  //   })
  //   files = data.map((file) => file.filename)

  files.forEach((adbt) => {
    const contents = readFileSync(adbt)
    console.log(contents.toString())
    // aria.parseFile(adbt)
  })
} catch (error) {
  setFailed(error.message)
}
