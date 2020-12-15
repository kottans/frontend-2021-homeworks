[![MIT Licensed][icon-mit]][license]
[![Kottans-Frontend][icon-kottans]][kottans-frontend]
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
[![Telegram][icon-chat]][chat]

# Frontend 2021 course homeworks

This repo was created for students to submit their homeworks for review.

Please follow the instructions below to submit your code for review.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [A. Setup the fork and local clone](#a-setup-the-fork-and-local-clone)
- [B. Brief workflow description](#b-brief-workflow-description)
- [C. Complete workflow in details](#c-complete-workflow-in-details)
  - [C1. Submitting new task](#c1-submitting-new-task)
  - [C2. When any changes are required](#c2-when-any-changes-are-required)
  - [C3. When all of your PRs are finally merged](#c3-when-all-of-your-prs-are-finally-merged)
- [D. Reference materials and troubleshooting](#d-reference-materials-and-troubleshooting)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- *generated with [DocToc](https://github.com/thlorenz/doctoc)* -->

## A. Setup the fork and local clone

You need to do this only once.

1. Fork this repository via GitHub interface
1. Clone your fork to your local machine:
   - `git clone https://github.com/YOUR_USERNAME/frontend-2021-homeworks.git`
1. Add this repository as an upstream:
   - `git remote add upstream https://github.com/kottans/frontend-2021-homeworks.git`
1. In your local repository, add a folder with your github name under `submissions`

You will add code from your every task in its individual directory under
your named directory. So, the file structure will be similar to the following
(in this example `amashoshyna` is a username and `js-dom` is a task name)

![File structure example](img/file-structure.png)

## B. Brief workflow description

Below is the brief workflow description.
Go through the [complete workflow](#c-complete-workflow-in-details)
when submitting for the first time and refer to it whenever
you are in doubt.

- Have an app developed by yourself to complete a task
  in its own project/repository and have it published 
- In your fork of this homeworks repository
  have a dedicated branch (`<task-branch-name>`) and
  a dedicated directory (`./submissions/YOUR_USER_NAME/TASK_NAME`)
  for every of your task submissions
- Add only files required and sufficient to conduct code review
  (those that you have created; exclude any images, IDE specific files, and `.git` directory
  as these are not reviewable and hence not required for a code review)
- Open a pull request and let others know of it in
  [FE Questionarium chat](https://t.me/joinchat/DmX0JAl-mh5W0jrWli8Ycw)
- Whenever you are requested to make changes in your submission:
  - update your app project/repository
  - copy changed files over to your fork under your task branch
  - update the PR and re-request review

## C. Complete workflow in details

### C1. Submitting new task

C11. Make sure that the app you develop to complete the task:

- has its own dedicated project/repository (task repo)
- lis [published on GitHub pages](./publish-your-app.md)

C12. In your local clone of this repo do the following:

C121. Sync up your local and fork's (origin) `main` with upstream's `main`:
  - `git checkout main`
  - `git pull upstream main`
  - `git push origin main`
  
> At that moment you may already have some code under a task branch
> and it may seem to be gone. Don't worry, it is still available under
> its own branch. No need to merge that branch to the `main`
> and do not merge it as this will most likely entail code conflicts.  

C122. Create a branch for your new task while on the `main`:
  - `git checkout main`
  - `git branch <task-branch-name>` (`<task-branch-name>` can be e.g. `dom-api-task`)
   
C123. Prepare required files
 - `git checkout <task-branch-name>`
 - create a directory for your task under `./submissions/YOUR_USERNAME` so
   that path to your task would be `./submissions/YOUR_USERNAME/TASK_NAME`
   (see the screenshot above for an example of the structure you are expected to have)
 - copy files from your app project, those and only those that are required for the review
   (see an important note below)
 - commit changes
 
> IMPORTANT! Put only code required to conduct review, i.e. `html`, `css`, `js` files and such.
> Images, icons, IDE directories like `.idea`, `.vscode` etc are not required for code review.
> Never have `.git` directory in your task submissions.

C124. Open a Pull Request (PR)
 - push to your fork: `git push --set-upstream origin <task-branch-name>`
 - navigate to your fork on GitHub
 - GitHub will offer to open a Pull Request from your new branch; Just do it
 - you will have a PR template message with instructions; read and complete them;
   make sure your PR title contains the task name
 - once PR is open, navigate to it and check **Files changed** to see what's being submitted
   
> Make sure your PR doesn't contain any unrelated files or commits from any other tasks,
> and no files from other your tasks are being deleted

C125. Ask for a review
 - post a link to your subtask PR in the
   [FE Questionarium chat](https://t.me/joinchat/DmX0JAl-mh5W0jrWli8Ycw)
   and ask mentors and peers for a code review
 - Monitor your pull request for possible change requests
 
When your submission gets finally merged, put your reflections on the task
and your code review experience to your student's diary (your `kottans-frontend` repo):
 - _what was new to you_
 - _what surprised you_
 - _what you intend to use in future_

### C2. When any changes are required

Whenever you want or are requested to make any changes do the following:

C21. Update your app project
 - implement changes
 - make sure your app publication got updated

C22. Update your submission. In your local homeworks repo
 - `git checkout <task-branch-name>`
 - copy changed files to your task directory
 - commit and push

Your PR will get updated automagically.

C23. Check your PR and summon a mentor
 - navigate to your PR
 - check your submitted files under **Files changed**;
   you will want to see your latest changes in the files
 - click **Re-request review** icon in the list of your PR reviewers
   to draw mentors' attention, so that they know you changed
   your code and they can review the changes

### C3. When all of your PRs are finally merged

Update your local clone and your fork to have all of your code
under the `main` branch:
- `git checkout main`
- `git pull upstream main`
- `git push origin main` 

## D. Reference materials and troubleshooting

1. [These slides](https://docs.google.com/presentation/d/13dati5gvA5f_hQFgxJPhPicjF5CRKu1e75RSsahmEaU/edit#slide=id.g58afea5148_0_0)
   visualize the contribution workflow above
1. [Contribution guide for beginners](https://gist.github.com/OleksiyRudenko/236c3046fbba028e0555fa847dae7001)
1. Refer to [this troubleshooting guide](https://gist.github.com/OleksiyRudenko/8b3ddb664308de0634b53c525e551d8b)
   whenever you face any conflicts when updating `main` from the upstream (original repo)
   or have unrelated files or commits in your pull requests
1. Any issues? Ask community. Many others had similar issues, the community will help you out

[icon-mit]: https://img.shields.io/badge/license-MIT-blue.svg
[license]: https://github.com/OleksiyRudenko/a-tiny-JS-world/blob/master/LICENSE.md
[icon-chat]: https://img.shields.io/badge/chat-on%20telegram-blue.svg
[icon-kottans]: https://img.shields.io/badge/%3D(%5E.%5E)%3D-frontend-yellow.svg
[kottans-frontend]: https://github.com/kottans/frontend
[chat]: https://t.me/joinchat/DmX0JAl-mh5W0jrWli8Ycw
