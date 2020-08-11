import { addDecorator, addParameters, configure } from '@storybook/html';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';

// Option defaults:
addParameters({
  options: {
    isFullScreen: false,
    showNav: true,
    showPanel: true,
    panelPosition: 'right',
    sortStoriesByKind: true,
    hierarchySeparator: /\/|\./,
    hierarchyRootSeparator: /\|/,
    sidebarAnimations: true,
    enableShortcuts: true,
    // theme: undefined,
  },
});

// addDecorator(withInfo({ inline: true, source: false }));
addDecorator(withKnobs);

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

function loadStories() {
  return requireAll(require.context('../stories', true,/\.stories\.ts$/));
}

configure(loadStories, module);

