import * as ReactDOM from 'react-dom';
import { Default, Custom } from './ProgressTimer.stories';

describe('ProgressTimer', () => {
  it.each([Default, Custom])('renders without crashing', (ProgressTimer) => {
    const div = document.createElement('div');
    ReactDOM.render(<ProgressTimer />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
