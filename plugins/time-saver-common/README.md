# Time Saver - common

This plugin provides an implementation of charts and statistics related to your time savings that are coming from usage of your templates. Plugins is built from frontend and backend part. Backend plugin is responsible for scheduled stats parsing process and data storage.

## Dependencies

- [time-saver](https://github.com/tduniec/backstage-timesaver-plugin/tree/main/plugins/time-saver)
- [time-saver-backend](https://github.com/tduniec/backstage-timesaver-plugin/tree/main/plugins/time-saver-backend)

## Code

https://github.com/tduniec/backstage-timesaver-plugin.git

## Installation

1. Install the plugin package in your Backstage app:

```sh
# From your Backstage root directory
yarn add --cwd packages/backend @tduniec/backstage-plugin-time-saver-common
```

or

```sh
# From your Backstage root directory
yarn add --cwd packages/app @tduniec/backstage-plugin-time-saver-common
```

2. Wire up the API implementation to your `packages/app/src/App.tsx`:

```tsx
import { timeSaverPermission } from '@tduniec/backstage-plugin-time-saver-common';

...

    <Route
      path="/time-saver"
      element={
        <RequirePermission permission={timeSaverPermission}>
          <TimeSaverPage />
        </RequirePermission>
      }
    />

```

2. Wire up in the navigation pane the in `packages/app/src/component/Root/Root.tsx`:

```tsx

import { timeSaverPermission } from '@tduniec/backstage-plugin-time-saver-common';

...

        <RequirePermission
          permission={timeSaverPermission}
          errorPage={<></>}
        >
          <SidebarItem
            icon={Timelapse}
            to="time-saver"
            text="TimeSaver"
          />
        </RequirePermission>
```

3. Wire up in the permissions backend in `packages/backend/src/plugins/permission.ts`:

```ts
...
import { timeSaverPermission } from '@tduniec/backstage-plugin-time-saver-common';
...

    if (isPermission(request.permission, timeSaverPermission)) {
      if (isAdmin) { //example condition
        return {
          result: AuthorizeResult.ALLOW,
        };
      }
      return {
        result: AuthorizeResult.DENY,
      };
    }

```
