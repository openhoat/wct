import { getWebComponent, registerComponentSpec } from '@/wct'
import type { WebComponentSpec } from '@/wct/base'
import { html } from 'common-tags'

describe('App Component', () => {
  const spec: WebComponentSpec = {
    tagName: 'h-app',
    template: () => html`
          <h-header></h-header>
          <h-todo-list></h-todo-list>
          <h-footer id="footer"></h-footer>
        `,
  }
  beforeAll(() => {
    document.body.innerHTML = html`<h-app></h-app>`
    registerComponentSpec(spec)
  })
  it('should render app component', () => {
    // Given
    const component = getWebComponent('h-app')
    // When
    const result = component?.shadowRoot?.innerHTML
    // Then
    expect(result).toMatchSnapshot()
  })
})
