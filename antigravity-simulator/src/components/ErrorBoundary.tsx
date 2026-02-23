import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(error: Error): State {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="error-container">
                    <div className="error-card">
                        <h2>System Failure</h2>
                        <p>The antigravity physics module encountered a critical error.</p>
                        <p className="error-message">{this.state.error?.message}</p>
                        <button onClick={() => globalThis.location.reload()} className="btn btn-primary">
                            Reboot System
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
