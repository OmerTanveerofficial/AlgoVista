import { Component } from 'react'

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    if (import.meta.env.DEV) {
      console.error('[ErrorBoundary]', error, info)
    }
  }

  reset = () => this.setState({ error: null })

  render() {
    if (this.state.error) {
      return (
        <div className="max-w-xl mx-auto my-16 p-6 rounded-2xl border border-white/10 bg-white/[0.03]">
          <p className="text-xs uppercase tracking-wider text-white/40 mb-2">Error</p>
          <h2 className="text-lg font-semibold text-white mb-1">
            Something broke rendering this view.
          </h2>
          <p className="text-white/60 text-sm mb-4 break-words">
            {this.state.error.message || String(this.state.error)}
          </p>
          <button
            onClick={this.reset}
            className="px-3 py-1.5 rounded-md text-sm border border-white/15 text-white/80 hover:text-white hover:border-white/30 transition-colors"
          >
            Try again
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
