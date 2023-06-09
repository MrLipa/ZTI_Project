import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  ReactNode,
} from "react";
import { Toast } from "primereact/toast";

type ToastSeverity = 'success' | 'info' | 'warn' | 'error';

type ToastContextType = {
  showToast: (severity: ToastSeverity, summary: string, detail: string) => void;
};

const ToastContext = createContext<ToastContextType>({ showToast: () => {} });

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FunctionComponent<ToastProviderProps> = ({
  children,
}: ToastProviderProps) => {
  const toast = useRef<Toast>(null);

  const showToast = useCallback(
    (severity: ToastSeverity, summary: string, detail: string) => {
      toast.current?.show({ severity, summary, detail });
    },
    []
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast ref={toast} />
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => useContext(ToastContext);
