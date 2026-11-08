import type { ModuleFederationRuntimePlugin } from '@module-federation/enhanced/runtime'

interface RewriteRemoteEntryOptions {
  fromHost: string
  toHost: string
}

export default function rewriteRemoteEntryPlugin(
  options: RewriteRemoteEntryOptions,
): ModuleFederationRuntimePlugin {
  return {
    name: 'rewrite-remote-entry',
    apply(instance) {
      return {
        async afterResolve(args) {
          const entry = args.remoteInfo?.entry
          if (!entry) {
            return args
          }

          try {
            const currentUrl = new URL(entry)
            if (currentUrl.hostname !== options.fromHost) {
              return args
            }

            const nextUrl = new URL(entry)
            nextUrl.hostname = options.toHost
            args.remoteInfo.entry = nextUrl.toString()
          } catch {
            // Ignore non-URL entries and keep the original resolution.
          }

          return args
        },
      }
    },
  }
}
