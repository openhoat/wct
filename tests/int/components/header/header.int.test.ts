import { getWebComponent, registerComponentSpec } from '@/wct'
import type { WebComponentSpec } from '@/wct/base'
import { html } from 'common-tags'

describe('Header Component', () => {
  const spec: WebComponentSpec = {
    tagName: 'h-header',
    template: () => html`
          <div id="header">
              <h3>Web Component Sandbox</h3>
          </div>
        `,
  }
  beforeAll(() => {
    document.body.innerHTML = html`<h-header></h-header>`
    registerComponentSpec(spec)
  })
  it('should render header component', () => {
    // Given
    const component = getWebComponent('h-header')
    // When
    const result = component?.shadowRoot?.innerHTML
    // Then
    expect(result).toMatchSnapshot()
  })
})
