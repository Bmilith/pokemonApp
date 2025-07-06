import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from './Modal';

describe('Modal component', () => {
  const onCloseMock = jest.fn();

  beforeEach(() => {
    onCloseMock.mockClear();
  });

  test('does not render when isOpen is false', () => {
    const { container } = render(
      <Modal isOpen={false} onClose={onCloseMock}>
        <div>Modal Content</div>
      </Modal>
    );

    expect(container.firstChild).toBeNull();
  });

  test('renders modal content when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={onCloseMock}>
        <div>Modal Content</div>
      </Modal>
    );

    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  test('clicking close button calls onClose', () => {
    render(
      <Modal isOpen={true} onClose={onCloseMock}>
        <div>Modal Content</div>
      </Modal>
    );

    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test('clicking inside modal content does NOT call onClose', () => {
    render(
      <Modal isOpen={true} onClose={onCloseMock}>
        <div data-testid="modal-content">Modal Content</div>
      </Modal>
    );

    const content = screen.getByTestId('modal-content');
    fireEvent.click(content);

    expect(onCloseMock).not.toHaveBeenCalled();
  });
});
