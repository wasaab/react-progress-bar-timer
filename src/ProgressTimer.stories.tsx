import { Meta, Story } from '@storybook/react';
import { Button, ButtonGroup } from '@mui/material';
import { useRef } from 'react';
import ProgressTimer, { Direction, ProgressTimerHandle, ProgressTimerProps, Variant } from '.';

const meta: Meta<ProgressTimerProps> = {
  title: 'Progress Timer',
  component: ProgressTimer
};

export default meta;

const Template: Story<ProgressTimerProps> = (args) => <ProgressTimer {...args} />;

export const Default = Template.bind({});

Default.args = {};

export const Custom = Template.bind({});

Custom.args = {
  direction: Direction.Right,
  variant: Variant.Fill,
  color: '#1976d2',
  fontColor: 'rgba(255, 255, 255, 0.85)',
  duration: 5,
  label: 'Label',
  buttonText: '',
  fontSize: '1em',
  showDuration: false,
  rootRounded: true,
  barRounded: false,
  started: undefined
};

const startedArgType = {
  started: {
    options: [true, false, undefined, null],
    control: { type: 'radio' },
  }
};

Custom.argTypes = {
  ...startedArgType,
  variant: {
    options: Variant,
    control: { type: 'radio' },
  },
  direction: {
    options: Direction,
    control: { type: 'radio' },
  },
};

const RefControlTemplate: Story<ProgressTimerProps> = (args) => {
  const ref = useRef<ProgressTimerHandle>(null);

  return (
    <>
      <ButtonGroup sx={{ marginBottom: 2 }}>
        <Button title="start a stopped timer" onClick={() => ref.current?.start()}>
          Start
        </Button>
        <Button title="stop a running timer" onClick={() => ref.current?.stop()}>
          Stop
        </Button>
        <Button title="restart a running or finished timer" onClick={() => ref.current?.restart()}>
          Restart
        </Button>
      </ButtonGroup>

      <ProgressTimer ref={ref} {...args} />
    </>
  );
};

export const RefControl = RefControlTemplate.bind({});

RefControl.args = {
  label: 'Label',
  duration: 8
};

const disabledArg = {
  table: {
    disable: true
  }
};

RefControl.argTypes = {
  started: disabledArg,
  direction: disabledArg,
  variant: disabledArg,
  color: disabledArg,
  fontColor: disabledArg,
  duration: disabledArg,
  label: disabledArg,
  buttonText: disabledArg,
  classes: disabledArg,
  fontSize: disabledArg,
  showDuration: disabledArg,
  rootRounded: disabledArg,
  barRounded: disabledArg
};

export const PropControl = Template.bind({});

PropControl.args = {
  started: null,
  ...RefControl.args
};

PropControl.argTypes = {
  ...RefControl.argTypes,
  ...startedArgType
};
