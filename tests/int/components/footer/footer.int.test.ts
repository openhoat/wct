import { getWebComponent, registerComponentSpec } from '@/wct'
import type { WebComponent, WebComponentSpec } from '@/wct/base'
import { html } from 'common-tags'

describe('Footer Component', () => {
  type FooterState = { loggedIn: boolean }

  interface Footer extends WebComponent {
    state: FooterState
  }

  const footerSpec: WebComponentSpec<FooterState> = {
    initialState: { loggedIn: false },
    tagName: 'h-footer',
    template() {
      const footerText = this.getState('loggedIn')
        ? 'Contact | Map | Log out'
        : 'Contact | Map | Log in'
      return html`
            <div id="footer">
                <h3>Need help?</h3>
                <p>${footerText}</p>
            </div>
      `
    },
  }
  beforeAll(() => {
    document.body.innerHTML = html`<h-footer></h-footer>`
    registerComponentSpec(footerSpec)
  })
  it('should render footer component given user is NOT logged in', () => {
    // Given
    const component = getWebComponent('h-footer')
    // When
    const result = component?.shadowRoot?.innerHTML
    // Then
    expect(result).toMatchSnapshot()
  })
  it('should render footer component given user is logged in', () => {
    // Given
    const component = getWebComponent<Footer>('h-footer')
    if (component) {
      component.setState('loggedIn', true)
    }
    // When
    const result = component?.shadowRoot?.innerHTML
    // Then
    expect(result).toMatchSnapshot()
  })
})
