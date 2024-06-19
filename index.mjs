import { setFailed } from '@actions/core'
import github from '@actions/github'
import { Aria } from '@igor.dvlpr/aria/dist/lib/compiler/Aria.mjs'
import { readFileSync } from 'fs'

async function action() {
  try {
    const aria = new Aria({
      shouldLog: false,
      versioning: 'auto',
    })

    const token = process.env.GITHUB_TOKEN || ''
    const octokit = github.getOctokit(token)
    const context = github.context

    let files

    const commit = context.payload.head_commit.id
    const { data } = await octokit.rest.repos.getCommit({
      owner: context.repo.owner,
      repo: context.repo.repo,
      ref: commit,
    })

    files = data.files?.map((file) => file.filename)

    if (!files || files.length === 0) {
      setFailed('No changed files found.')
      return
    }
    files.forEach((adbt) => {
      const contents = readFileSync(adbt, 'utf-8')
      console.log(aria.parse(contents).nodes)
    })
  } catch (error) {
    setFailed(error.message)
  }
}

action()
