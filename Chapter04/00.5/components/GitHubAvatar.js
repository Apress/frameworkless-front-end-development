const ERROR_IMAGE = 'https://files-82ee7vgzc.now.sh'
const LOADING_IMAGE = 'https://files-8bga2nnt0.now.sh'
const AVATAR_LOAD_COMPLETE = 'AVATAR_LOAD_COMPLETE'
const AVATAR_LOAD_ERROR = 'AVATAR_LOAD_ERROR'

export const EVENTS = {
  AVATAR_LOAD_COMPLETE,
  AVATAR_LOAD_ERROR
}

const getGitHubAvatarUrl = async user => {
  if (!user) {
    return
  }

  const url = `https://api.github.com/users/${user}`

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  const data = await response.json()
  return data.avatar_url
}

export default class GitHubAvatar extends HTMLElement {
  constructor () {
    super()
    this.url = LOADING_IMAGE
  }

  get user () {
    return this.getAttribute('user')
  }

  set user (value) {
    this.setAttribute('user', value)
  }

  render () {
    window.requestAnimationFrame(() => {
      this.innerHTML = ''
      const img = document.createElement('img')
      img.src = this.url
      this.appendChild(img)
    })
  }

  onLoadAvatarComplete () {
    const event = new CustomEvent(AVATAR_LOAD_COMPLETE, {
      detail: {
        avatar: this.url
      }
    })

    this.dispatchEvent(event)
  }

  onLoadAvatarError (error) {
    const event = new CustomEvent(AVATAR_LOAD_ERROR, {
      detail: {
        error
      }
    })

    this.dispatchEvent(event)
  }

  async loadNewAvatar () {
    const { user } = this
    if (!user) {
      return
    }
    try {
      this.url = await getGitHubAvatarUrl(user)
      this.onLoadAvatarComplete()
    } catch (e) {
      this.url = ERROR_IMAGE
      this.onLoadAvatarError(e)
    }

    this.render()
  }

  connectedCallback () {
    this.render()
    this.loadNewAvatar()
  }
}
