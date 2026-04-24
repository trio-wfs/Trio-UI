import figma from '@figma/code-connect';
import { Footer } from './Footer';

figma.connect(Footer, 'https://www.figma.com/design/PjAYuPDr8IA1ccwiAjFkSD?node-id=5662-9435', {
  props: {},
  example: () => (
    <Footer
      copyrightText="\u00A9 2017-2025 American Health Technology Group, LLC: Trio/Insight"
      links={[
        { label: 'Terms of Use', href: '/terms' },
        { label: 'Privacy Policy', href: '/privacy' },
      ]}
    />
  ),
});
