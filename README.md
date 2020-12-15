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

- [General guides for you as a contributor](#general-guides-for-you-as-a-contributor)
- [Glossary](#glossary)
- [Contribution stage A. Setup the fork and local clone](#contribution-stage-a-setup-the-fork-and-local-clone)
- [Contribution stage B. Adding new code and updating submissions](#contribution-stage-b-adding-new-code-and-updating-submissions)
  - [B1. Submitting new task (app) code base](#b1-submitting-new-task-app-code-base)
  - [B2. When any changes are required](#b2-when-any-changes-are-required)
  - [B3. When all of your PRs are finally merged](#b3-when-all-of-your-prs-are-finally-merged)
- [Reference materials and troubleshooting](#reference-materials-and-troubleshooting)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- *generated with [DocToc](https://github.com/thlorenz/doctoc)* -->

## General guides for you as a contributor

Now you are a contributor to an educational open source project.

[These slides](https://docs.google.com/presentation/d/13dati5gvA5f_hQFgxJPhPicjF5CRKu1e75RSsahmEaU/edit#slide=id.g58afea5148_0_0)
visualize the contribution workflow.

The instructions below will lead you through the contribution workflow
as you will submit your tasks code base.

## Glossary

Term | Definition
---  | ---
repo                   | short for 'repository'
_homeworks main repo_  | Kottans FE course homeworks repository: https://github.com/kottans/frontend-2021-homeworks
_homeworks fork_       | your own fork of homeworks main repo
_homeworks local repo_ | your local clone of your homeworks fork
app                    | an application (or web page) you develop to fulfil a specific task in the course
_app repo_             | a repository that contains your application code

## Contribution stage A. Setup the fork and local clone

You need to do this only once.

A1. Fork _homeworks main repo_ via GitHub web interface
A2. Clone _homeworks fork_ on your local machine:
   - `git clone https://github.com/YOUR_USERNAME/frontend-2021-homeworks.git`

> Make sure you are inside the homeworks local repo directory before any further operations  

A3. Add _homeworks main repo_ as an upstream:
   - `git remote add upstream https://github.com/kottans/frontend-2021-homeworks.git`
A4. In _homeworks local repo_, add a folder with your github username under `submissions` directory

You will add code from your every task (app) in its individual directory under
your named directory. So, the file structure will be similar to the following
(in this example `amashoshyna` is a username and `js-dom` is a task name)

![File structure example](img/file-structure.png)

## Contribution stage B. Adding new code and updating submissions 

### B1. Submitting new task (app) code base

B11. Make sure that the app you develop to complete the task:

(a) has its own dedicated project/repository on GitHub (_app repo_)

(b) is [published on GitHub pages](./publish-your-app.md)

B12. In your _homeworks local repo_ do the following:

B121. Sync up `main` branch of your _homeworks local repo_ and _homeworks fork_ (origin)
with the `main` branch of _homeworks main repo_ (upstream)
 - `git checkout main`
 - `git pull upstream main`
 - `git push origin main`
  
> At that moment you may already have some code under some other task branch
> and it may seem to be gone. Don't worry, it is still available under
> its own task branch. No need to merge that branch into the `main`,
> and do not merge it into the `main` as this will most likely entail code conflicts.  

B122. Create a dedicated branch for your new task (app) code base while on the `main`:
  - `git checkout main`
  - `git branch <task-branch-name>` (`<task-branch-name>` can be e.g. `dom-api-task`)
   
B123. Add required files
 - `git checkout <task-branch-name>`
 - create a directory for your task (app) code base under `./submissions/YOUR_USERNAME` so
   that the path to your task is `./submissions/YOUR_USERNAME/TASK_NAME`
   (see the screenshot above for an example of the structure you are expected to have)
 - copy files from your _app repo_, those and only those that are required for the review

> **IMPORTANT!** Put only files/code required to conduct review, i.e. `html`, `css`, `js` files and such.
> Images, icons, IDE directories like `.idea`, `.vscode` etc **are not required** for code review.
> **Never** have `.git` directory in your task submissions.
> Copy required files **one by one**. **Never copy the directories** in bulk as this may entail
> copying unwanted files and **hidden directories**.

 - stage files with `git add` command and commit changes

B124. Open a Pull Request (PR)
 - push to _homeworks fork_: `git push --set-upstream origin <task-branch-name>`
 - navigate to your _homeworks fork_ on GitHub
 - GitHub will offer to open a Pull Request from your new task branch; Just do it
 - you will be offered a PR template message with instructions; read them and fulfil as prescribed
 - once PR is open, check **Files changed** to see what's being submitted
   
> Make sure your PR **doesn't contain any unrelated files or commits** from any other tasks,
> and no files from other your tasks or from other authors are being deleted

B125. Ask for a review
 - post a link to your PR in the
   [FE Questionarium chat](https://t.me/joinchat/DmX0JAl-mh5W0jrWli8Ycw)
   and ask mentors and peers for a code review
 - monitor your pull request for possible change requests
 
### B2. When any changes are required

Whenever you want or are requested to make any changes do the following:

B21. Update your app (in the relevant _app repo_)
 - implement changes
 - make sure your app publication is updated

B22. Update your submission PR - in your _homeworks local repo_:
 - `git checkout <task-branch-name>`
 - copy changed files (one by one) to your task directory from the _app repo_
 - stage, commit and push

Your PR will be updated automagically.

B23. Check your PR and summon a mentor
 - navigate to your PR
 - check your submitted files under **Files changed**;
   you will want to see your latest changes in the files
 - click **Re-request review** icon in the list of your PR reviewers
   to draw mentors' attention, so that they know you changed
   your code and there is something new to see

> When your submission gets finally merged, put your reflections on the task
> and your code review experience to your student's diary (your `kottans-frontend` repo):
>  - _what was new to you_
>  - _what surprised you_
>  - _what you intend to use in future_

### B3. When all of your PRs are finally merged

Update _homeworks local clone_ and your _homeworks fork_ to have all of your code
under the `main` branch:
 - `git checkout main`
 - `git pull upstream main`
 - `git push origin main` 

## Reference materials and troubleshooting

1. [Contribution guide for beginners](https://gist.github.com/OleksiyRudenko/236c3046fbba028e0555fa847dae7001).
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
