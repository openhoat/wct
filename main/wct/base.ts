import { html } from 'common-tags'

export { html }

export type WebComponentState = Record<string, unknown>

export type WebComponentTemplate = <T extends WebComponent = WebComponent>(
  this: T,
) => string

export type WebComponentSpec<
  T extends WebComponentState | undefined = undefined,
> = {
  css?: string
  initialState?: T
  tagName: string
  template?: WebComponentTemplate
}

export const DefaultWebComponentTemplate = function <
  T extends WebComponent = WebComponent,
>(this: T) {
  return html`<pre title="Not yet implemented!">${webComponentLogTag(this.componentClassName)}</pre>`
}

export type WebComponentRegisterOptions = {
  log?: boolean
}

export const webComponentLogTag = (webComponentClassName: string) =>
  `[${webComponentClassName}]`

export interface WebComponent<T extends WebComponentState = WebComponentState>
  extends HTMLElement {
  readonly componentClassName: string
  readonly state: Partial<T> | undefined
  getState(name: string): unknown
  render(): void
  setState(name: string, value: unknown): void
}

export class BaseWebComponent<T extends WebComponentState = WebComponentState>
  extends HTMLElement
  implements WebComponent<T>
{
  _state?: Partial<T>
  css?: string
  componentClassName: string = BaseWebComponent.name
  log = false

  get logTag() {
    return webComponentLogTag(this.componentClassName)
  }

  get state(): Partial<T> | undefined {
    return this._state
  }

  constructor() {
    super()
    if (this.log) {
      console.log(`Building ${this.logTag}…`)
    }
    const template = document.createElement('template')
    this.attachShadow({ mode: 'open' }).appendChild(
      template.content.cloneNode(true),
    )
    if (this.log) {
      console.log(`${this.logTag} built.`)
    }
  }

  template?(context: { state?: Partial<T> }): string

  getState(name: string) {
    return this._state ? this._state[name] : undefined
  }

  removeState(name: string, options?: { render?: boolean }) {
    if (this.state === undefined) {
      return false
    }
    if (this.getState(name) === undefined) {
      return false
    }
    const { [name]: __, ...newState } = this.state
    this._state = newState as Partial<T>
    const { render = true } = options || {}
    if (render) {
      this.render()
    }
    return true
  }
  setState(name: string, value: unknown, options?: { render?: boolean }) {
    if (this.getState(name) === value) {
      return false
    }
    const newState = { ...this.state, [name]: value } as Partial<T>
    if (this.log) {
      console.log(`New state for ${this.logTag}.`)
    }
    this._state = newState
    const { render = true } = options || {}
    if (render) {
      this.render()
    }
    return true
  }

  render(): void {
    if (this.log) {
      console.log(`Rendering ${this.logTag}…`)
    }
    if (!this.shadowRoot) {
      return
    }
    if (this.log) {
      console.log(`Building ${this.logTag} template…`)
    }
    const context = { state: this._state }
    const css = this.css
    const htmlContent = this.template
      ? css
        ? html`
              <style>${css}</style>
              ${this.template(context)}
            `
        : this.template(context)
      : ''
    if (this.log) {
      console.log(`${this.logTag} template: "${htmlContent}".`)
    }
    this.shadowRoot.innerHTML = htmlContent
    if (this.log) {
      console.log(`${this.logTag} rendered.`)
    }
  }
}
