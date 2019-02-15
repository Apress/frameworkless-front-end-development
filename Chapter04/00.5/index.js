import GitHubAvatar, { EVENTS } from './components/GitHubAvatar.js'

window.customElements.define('github-avatar', GitHubAvatar)

document
  .querySelectorAll('github-avatar')
  .forEach(avatar => {
    avatar
      .addEventListener(
        EVENTS.AVATAR_LOAD_COMPLETE,
        e => {
          console.log(
            'Avatar Loaded',
            e.detail.avatar
          )
        })

    avatar
      .addEventListener(
        EVENTS.AVATAR_LOAD_ERROR,
        e => {
          console.log(
            'Avatar Loading error',
            e.detail.error
          )
        })
  })
