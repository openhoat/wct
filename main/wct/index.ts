import { toPascalCase } from '@/utils/helper'
import {
  BaseWebComponent,
  DefaultWebComponentTemplate,
  type WebComponent,
  type WebComponentRegisterOptions,
  type WebComponentSpec,
  webComponentLogTag,
} from './base'

export const defineWebComponent = <T extends WebComponent = WebComponent>(
  spec: WebComponentSpec<T['state']> & Pick<WebComponentRegisterOptions, 'log'>,
): void => {
  const {
    css,
    initialState,
    log,
    tagName,
    template = DefaultWebComponentTemplate,
  } = spec
  const webComponentClassName = toPascalCase(tagName)
  if (log) {
    console.log(`Registering ${webComponentLogTag(webComponentClassName)}…`)
  }
  const { [webComponentClassName]: webComponentClass } = {
    [webComponentClassName]: class extends BaseWebComponent {
      constructor() {
        super()
        if (log !== undefined) {
          this.log = log
        }
        this.css = css
        this.componentClassName = webComponentClassName
        this.template = template
        if (initialState !== undefined) {
          for (const [name, value] of Object.entries(initialState)) {
            this.setState(name, value, { render: false })
          }
        }
        this.render()
      }
    },
  }
  customElements.define(tagName, webComponentClass)
  if (log) {
    console.log(`${webComponentLogTag(webComponentClassName)} registered.`)
  }
}

export const getWebComponent = <T extends WebComponent = WebComponent>(
  selector: string,
  root?: string,
): T | undefined =>
  (root !== undefined
    ? document.querySelector(root)?.shadowRoot?.querySelector<T>(selector)
    : document.querySelector<T>(selector)) ?? undefined

export const registerComponentSpec = <T extends WebComponent = WebComponent>(
  spec: WebComponentSpec<T['state']>,
  options?: WebComponentRegisterOptions,
) => {
  return defineWebComponent<T>({
    ...options,
    ...spec,
  })
}

export const registerComponentSpecs = <T extends WebComponent = WebComponent>(
  specs: WebComponentSpec<T['state']>[],
  options?: WebComponentRegisterOptions,
) => {
  for (const spec of specs) {
    registerComponentSpec(spec, options)
  }
}
