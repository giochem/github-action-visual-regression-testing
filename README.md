# Github Action Visual Regression Testing

Can we build a visual regression tool using only GitHub Actions?

## General idea

- Use GitHub reactions on a comment to approve or deny the image diffs
- Allow for any testing tool to be used
  - Preferably one that has a nice test report like Playwright or Web Test Runner
- Optionally push the test report to a service where it can be deployed for easier viewing, rather than pulling down the GitHub asset directly and running it locally

## Rough outline

- Setup a GitHub Action that will do the following:
  - Pull down `main`
  - Establish a baseline of images by running the test command
  - Stash changes (somehow), either as an asset, or using git so that we can use it as our baseline in our target branch
  - Pull down the _actual_ ("target") branch the user just put up
  - Apply the images from the `main` step above, so that a baseline now exists in the target branch
  - Run the test command
    - Any image diffs that don't meet the threshold should fail
  - Generate a test report
    - Publish it as an asset on the GitHub Action as well, for good measure
- After above, it'd be great to then do the following:
  - (Optional) Grab the test report asset and deploy it somewhere that can be easily viewed by a URL
    - Cloudflare, GitHub pages, Vercel, Netlify - whatever
    - Using Playwright, it generates everything you need in their report to deploy it, so this should be pretty easy
  - Post a comment on the PR with the URL from above (or a link to the GitHub Asset) so that folks can review it
    - It'd be nice to make this pretty snazzy so that it calls out what the comment is for, how to interact with it, etc. - Changesets' comments are a great example
  - We need to let CI hang at this point or be "denied" so that it can block PR merges, as we want humans to review the visual changes
    - If there are no visual changes as part of the PR, then make the build green
- Users then use the 👍 or 👎 reaction emojis on the comment to approve/deny the visual regression tests
  - Users should be able to configure how many 👍s are required to make CI go green. This can be done via `actions/github-script` and `on: issue_comment:`
- (Optional) Whenever a rebase or additional commits get added, delete the previous comment and restart the process

## Advantages

- Everything is handled via a GitHub Action
- No need to run VRT tests locally, except to troubleshoot things
  - This is similar to what a service like Percy does, putting all of the work on CI rather than locally
- No need for a third-party service
- Works with any testing framework
- No need to check 1000+ images into source control, since everything is handled by CI
- No need for docker locally or in CI
  - It gets around the headless Chrome / Linux issue with Playwright, where things may pass locally if you're on a Mac, but as soon as you push it to CI which runs on Linux, tests immediately fail
  - The recommended approach for this is to use docker
  - Adding docker is another dependency that may or may not be approved for use at different organizations

## Tradeoffs/Drawbacks

- Troubleshooting locally _could_ be a pain
  - By not checking the images into source control, it could be a bit annoying to troubleshoot an issue
- CI time will increase by having to first pull `main` and establish a baseline
  - Could rely on a cache, but you know what they say about caching issues...
- Could be a bit confusing to first time users
  - Documentation / a good comment from the process would be key

## Future thoughts

- Comments on the PR can trigger commands, similar to dependabot
