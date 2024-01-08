import { ReactNode } from 'react';

export interface IModalBasicProps {
  open?: boolean;
  children?: ReactNode;
  onClose: () => void;
}
