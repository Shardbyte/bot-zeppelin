import * as t from "io-ts";
import { automodTrigger } from "../helpers";

// tslint:disable-next-line:no-empty-interface
interface WarnTriggerResultType {}

export const WarnTrigger = automodTrigger<WarnTriggerResultType>()({
  configType: t.type({
    manual: t.boolean,
    automatic: t.boolean,
  }),

  defaultConfig: {
    manual: true,
    automatic: true,
  },

  async match({ context, triggerConfig }) {
    if (context.modAction?.type !== "warn") {
      return;
    }
    // If automatic && automatic turned off -> return
    if (context.modAction.isAutomodAction && !triggerConfig.automatic) return;
    // If manual && manual turned off -> return
    if (!context.modAction.isAutomodAction && !triggerConfig.manual) return;

    return {
      extra: {},
    };
  },

  renderMatchInformation() {
    return `User was warned`;
  },
});
